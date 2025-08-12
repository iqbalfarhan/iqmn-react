<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupResource;
use App\Models\Article;
use App\Models\Group;
use App\Models\Material;
use App\Models\Nilai;
use App\Models\Tugas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        return Inertia::render('dashboard/index', [
            'groups' => GroupResource::collection($user->groups),
            'members' => GroupResource::collection($user->members),
            'canCreateGroup' => $user->can("create group")
        ]);
    }

    public function dokumentasi()
    {
        return Inertia::render('dashboard/dokumentasi');
    }

    public function daftarTugas()
    {
        $user = Auth::user();
        $group_ids = $user->members->pluck('id')->toArray();
        $tugas = Tugas::whereIn('group_id', $group_ids)->with('group')->orderByDesc('available')->get();
        $nilais = Nilai::with('media', 'tugas', 'tugas.group', 'user')->whereIn('tugas_id', $tugas->pluck('id'))->where('user_id', $user->id)->get();

        return Inertia::render('dashboard/daftar-tugas', [
            'tugases' => $tugas,
            'nilais' => $nilais
        ]);
    }

    public function review()
    {
        return Inertia::render('dashboard/review', [
            'review' => auth()->user()->review
        ]);
    }

    public function explore(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string',
            'premium' => 'nullable|string|in:free,premium,all',
        ]);

        $search  = $request->name;
        $premium = $request->premium;

        $groups = collect(); // default kosong

        // Jalankan query kalau salah satu parameter ada isinya
        if ($search || $premium) {
            $groups = Group::with('user')
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('code', $search);
                    });
                })
                ->when($premium, function ($query) use ($premium) {
                    if ($premium === 'free') {
                        $query->where('price', 0);
                    } elseif ($premium === 'premium') {
                        $query->where('price', '>', 0);
                    }
                })
                ->limit(8)
                ->get();
        }

        return Inertia::render('dashboard/explore', [
            'groups' => GroupResource::collection($groups),
            'query' => $request->all()
        ]);
    }

    public function pembayaran()
    {
        $user = auth()->user();
        return Inertia::render('dashboard/pembayaran', [
            'pembayarans' => $user->pembayarans->load('group', 'user'),
            'canApprove' => $user->can('approve pembayaran')
        ]);
    }
}
