<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\GroupResource;
use App\Http\Resources\UserResource;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct()
    {
        if (!auth()->user()->can('manage user')) {
            abort(403);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('user/index', [
            'users' => UserResource::collection(User::orderBy('name')->get()),
            'roles' => Role::pluck('name')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        $user->syncRoles($data['roles']);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $groupIds = $user->members->pluck('id');

        return Inertia::render('user/detail', [
            'user' => new UserResource($user),
            'groups' => GroupResource::collection(Group::whereIn('id', $groupIds)->get())
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);

        if ($data['roles']) {
            $user->syncRoles($data['roles']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->forceDelete();
    }

    public function loginAs(User $user)
    {
        Auth::login($user);
        return redirect()->route('dashboard');
    }
}
