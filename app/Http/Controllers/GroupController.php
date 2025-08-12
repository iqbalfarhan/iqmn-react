<?php

namespace App\Http\Controllers;

use App\Http\Requests\JoinGroupRequest;
use App\Http\Requests\StoreAddMemberRequest;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use App\Models\Material;
use App\Models\Nilai;
use App\Models\Notifikasi;
use App\Models\Pembayaran;
use App\Models\Tugas;
use App\Models\User;
use App\Notifications\JoinGroup;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user()->can('edit group')) {
            abort(403);
        }
        
        $groups = Group::with('user')->get();
        
        return Inertia::render('group/index', [
            'groups' => GroupResource::collection($groups),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGroupRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->user()->id;

        Group::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        $user = auth()->user();

        $enableToOpen = collect([
            auth()->user()->members()->where('group_id', $group->id)->exists(),
            // auth()->user()->hasRole('superadmin'),
            $group->user_id == $user->id
        ])->contains(true);

        if($enableToOpen) {
            return redirect()->route('group.material', $group);
        }

        return Inertia::render('group/detail', [
            'group' => new GroupResource($group),
            'materials' => Material::where('group_id', $group->id)->published()->get(),
            'alreadyJoined' => Pembayaran::where('group_id', $group->id)->where('user_id', $user->id)->exists() || auth()->user()->members()->where('group_id', $group->id)->exists()
        ]);
    }


    public function edit(Group $group)
    {
        if (!auth()->user()->can('edit group')) {
            return abort(403);
        }

        return Inertia::render('group/edit', [
            'group' => new GroupResource($group),
            'canEditGroup' => auth()->user()->can('edit group')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {
        $data = $request->validated();
        $group->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        $group->delete();
    }

    public function deleteToDashboard(Group $group)
    {
        $group->delete();
        return redirect()->route('dashboard');
    }

    public function material(Group $group)
    {
        return Inertia::render('group/tabs/material', [
            'group' => new GroupResource($group),
            'materials' => $group->materials->load('group.user', 'quizzes'),
            'canEditGroup' => auth()->user()->can('edit group')
        ]);
    }

    public function member(Group $group)
    {
        return Inertia::render('group/tabs/member', [
            'group' => new GroupResource($group),
            'members' => $group->members->load('socmed'),
            'canEditGroup' => auth()->user()->can('edit group')
        ]);
    }

    public function tugas(Group $group)
    {
        return Inertia::render('group/tabs/tugas', [
            'group' => new GroupResource($group),
            'tugases' => $group->tugases->load('nilais'),
            'canEditGroup' => auth()->user()->can('edit group')
        ]);
    }

    public function nilai(Group $group)
    {
        $enableToInput = auth()->user()->can('input nilai');
        $tugas_ids = $group->tugases->pluck('id');
        return Inertia::render('group/tabs/nilai', [
            'enableToInput' => $enableToInput,
            'canEditGroup' => auth()->user()->can('edit group'),
            'group' => new GroupResource($group),
            'tugases' => $group->tugases,
            'members' => $enableToInput ? $group->members->load('socmed') : [auth()->user()],
            'nilais' => Nilai::whereIn('tugas_id', $tugas_ids)->with('tugas', 'user')->get()
        ]);
    }

    public function video(Group $group)
    {
        return Inertia::render('group/tabs/video', [
            'group' => new GroupResource($group),
            'materials' => $group->materials()->whereNotNull("video_url")->get(),
            'canEditGroup' => auth()->user()->can('edit group')
        ]);
    }

    public function join(JoinGroupRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

        $group = Group::whereCode($data['code'])->firstOrFail();
        $alreadyJoined = $group->members()->where('user_id', $user->id)->exists();

        if ($alreadyJoined) {
            return back()->with('error', 'Anda sudah bergabung di grup ini!');
        }

        if ($group->isPremium) {
            DB::transaction(function () use ($group, $user) {
                Pembayaran::updateOrCreate([
                    "group_id" => $group->id,
                    "user_id" => $user->id,
                ],[
                    'amount' => $group->price,
                    'description' => "Pembayaran untuk group {$group->name}",
                    'paid' => false
                ]);
            });
        }
        else{
            $group->members()->attach($user->id, [
                "paid" => true
            ]);

            Notifikasi::create([
                'user_id' => $group->user->id,
                'title' => 'Yeey! Berhasil join group!',
                'link' => route('group.show', $group->id),
                "content" => "{$user->name} telah bergabung di group {$group->name}"
            ]);

            $user->notify(new JoinGroup($group));
        }

    }

    public function joinByUrl(string $code)
    {
        $userId = Auth::id();
        $group = Group::whereCode($code)->firstOrFail();
        $alreadyJoined = $group->members()->where('user_id', $userId)->exists();

        if ($alreadyJoined) {
            return back()->with('error', 'Anda sudah bergabung di grup ini!');
        }

        $group->members()->attach($userId, [
            "paid" => $group->isPremium ? true : false
        ]);

        return redirect()->route('dashboard');
    }

    public function leave(Group $group)
    {
        $id = Auth::id();
        $group->members()->detach($id);

        return redirect()->route('dashboard');
    }

    public function kickMember(Group $group, User $user)
    {
        $group->members()->detach($user->id);
    }

    public function addMember(StoreAddMemberRequest $request, Group $group)
    {
        $data = $request->validated();
        $user = User::whereEmail($data['email'])->first();

        // Cek kalau user gak ditemukan
        if (!$user) {
            throw new ModelNotFoundException("User tidak ditemukan");
        }

        // Cek kalau user udah jadi member
        $alreadyMember = $group->members()->where('user_id', $user->id)->exists();

        if ($alreadyMember) {
            throw ValidationException::withMessages([
                'email' => ['User sudah jadi member di grup ini.']
            ]);
        }

        // Tambah user ke group
        $group->members()->syncWithoutDetaching([$user->id]);
    }
}
