<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Http\Requests\UploadMaterialThumbnailRequest;
use App\Models\Material;
use Inertia\Inertia;

class MaterialController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user()->can("edit group")) {
            abort(403);
        }

        return Inertia::render('material/index', [
            'materials' => Material::with('group.user', 'quizzes')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request)
    {
        if (!auth()->user()->can("edit group")) {
            abort(403);
        }

        Material::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        return Inertia::render('material/detail', [
            'material' => $material->load('group'),
            'canEditGroup' => auth()->user()->can("edit group"),
            'chats' => $material->chats->load('user')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit(Material $material)
    {
        if (!auth()->user()->can("edit group")) {
            abort(403);
        }

        return Inertia::render('material/edit', [
            'material' => $material->load('group'),
            'canEditGroup' => auth()->user()->can("edit group")
        ]);
    }

    public function update(UpdateMaterialRequest $request, Material $material)
    {
        if (!auth()->user()->can("edit group")) {
            abort(403);
        }

        $material->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        if (!auth()->user()->can("edit group")) {
            abort(403);
        }

        $material->delete();
    }

    public function uploadThumbnail(UploadMaterialThumbnailRequest $request, Material $material)
    {
        if (!auth()->user()->can("edit group")) {
            abort(403);
        }

        $data = $request->validated();
        if ($request->hasFile('file')) {
            $data['photo'] = $request->file('file')->store('thumbnails/materials', 'public');

            $material->update($data);
        }

    }
}
