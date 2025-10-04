<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Http\Requests\BulkUpdateMaterialRequest;
use App\Http\Requests\BulkDeleteMaterialRequest;
use App\Models\Classroom;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadMaterialMediaRequest;


class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Classroom $classroom)
    {
        $this->pass("index material");
        
        $data = Material::query()
            ->with(['media', 'classroom'])
            ->where('classroom_id', $classroom->id)
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('material/index', [
            'classroom'=> $classroom,
            'materials' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can("create material"),
                'canShow' => $this->user->can("show material"),
                'canUpdate' => $this->user->can("update material"),
                'canDelete' => $this->user->can("delete material"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request)
    {
        $this->pass("create material");

        $data = $request->validated();
        Material::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        $this->pass("show material");

        return Inertia::render('material/show', [
            'material' => $material,
            'classroom' => $material->classroom,
            'permissions' => [
                'canUpdate' => $this->user->can("update material"),
                'canDelete' => $this->user->can("delete material"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        $this->pass("update material");

        $data = $request->validated();
        $material->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $this->pass("delete material");

        $material->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateMaterialRequest $request)
    {
        $this->pass("update material");

        $data = $request->validated();
        $ids = $data['material_ids'];
        unset($data['material_ids']);

        Material::whereIn('id', $ids)->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteMaterialRequest $request)
    {
        $this->pass("delete material");

        $data = $request->validated();
        Material::whereIn('id', $data['material_ids'])->delete();
    }

    
    
    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadMaterialMediaRequest $request, Material $material)
    {
        $this->pass("update material");

        $data = $request->validated();
        $material->addMedia($data['file'])->toMediaCollection();
    }
}
