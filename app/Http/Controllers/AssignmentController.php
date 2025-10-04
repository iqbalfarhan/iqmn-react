<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Requests\BulkUpdateAssignmentRequest;
use App\Http\Requests\BulkDeleteAssignmentRequest;
use App\Models\Assignment;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\UploadAssignmentMediaRequest;


class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Classroom $classroom)
    {
        $this->pass("index assignment");
        
        $data = Assignment::query()
            ->with(['media', 'classroom'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('assignment/index', [
            'assignments' => $data->get(),
            'query' => $request->input(),
            'classroom' => $classroom,
            'permissions' => [
                'canAdd' => $this->user->can("create assignment"),
                'canShow' => $this->user->can("show assignment"),
                'canUpdate' => $this->user->can("update assignment"),
                'canDelete' => $this->user->can("delete assignment"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentRequest $request)
    {
        $this->pass("create assignment");

        $data = $request->validated();
        Assignment::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Assignment $assignment)
    {
        $this->pass("show assignment");

        return Inertia::render('assignment/show', [
            'assignment' => $assignment,
            'classroom' => $assignment->classroom,
            'permissions' => [
                'canUpdate' => $this->user->can("update assignment"),
                'canDelete' => $this->user->can("delete assignment"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $this->pass("update assignment");

        $data = $request->validated();
        $assignment->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignment $assignment)
    {
        $this->pass("delete assignment");

        $assignment->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAssignmentRequest $request)
    {
        $this->pass("update assignment");

        $data = $request->validated();
        $ids = $data['assignment_ids'];
        unset($data['assignment_ids']);

        Assignment::whereIn('id', $ids)->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAssignmentRequest $request)
    {
        $this->pass("delete assignment");

        $data = $request->validated();
        Assignment::whereIn('id', $data['assignment_ids'])->delete();
    }

    
    
    /**
     * Register media conversions.
     */
    public function uploadMedia(UploadAssignmentMediaRequest $request, Assignment $assignment)
    {
        $this->pass("update assignment");

        $data = $request->validated();
        $assignment->addMedia($data['file'])->toMediaCollection();
    }
}
