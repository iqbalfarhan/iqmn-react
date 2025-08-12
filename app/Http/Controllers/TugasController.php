<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTugasRequest;
use App\Http\Requests\UpdateTugasRequest;
use App\Models\Tugas;
use Inertia\Inertia;

class TugasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user()->can('edit group')) {
            abort(403);
        }
        
        return Inertia::render('tugas/index', [
            "tugases" => Tugas::with('group')->orderBy('group_id')->get()
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function show(Tugas $tuga)
    {
        return Inertia::render('tugas/detail', [
            "group" => $tuga->group,
            "tugas" => $tuga,
            'nilais' => $tuga->nilais->load('user', 'user.socmed', 'tugas', 'media', 'tugas.group'),
            'canEdit' => auth()->user()->can("input nilai")
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTugasRequest $request)
    {
        $data = $request->validated();
        Tugas::create($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTugasRequest $request, Tugas $tuga)
    {
        if (!auth()->user()->can("edit group")) {
            abort(404);
        }
        
        $data = $request->validated();
        $tuga->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tugas $tuga)
    {
        $tuga->delete();
    }
}
