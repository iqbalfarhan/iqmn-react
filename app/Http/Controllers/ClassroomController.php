<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Requests\BulkUpdateClassroomRequest;
use App\Http\Requests\BulkDeleteClassroomRequest;
use App\Models\Classroom;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->pass("index classroom");
        
        $data = Classroom::query()
            ->with(['user'])
            ->when($request->name, function($q, $v){
                $q->where('name', $v);
            });

        return Inertia::render('classroom/index', [
            'classrooms' => $data->get(),
            'query' => $request->input(),
            'users' => User::role(['pengajar'])->get(),
            'permissions' => [
                'canAdd' => $this->user->can("create classroom"),
                'canShow' => $this->user->can("show classroom"),
                'canUpdate' => $this->user->can("update classroom"),
                'canDelete' => $this->user->can("delete classroom"),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassroomRequest $request)
    {
        $this->pass("create classroom");

        $data = $request->validated();
        Classroom::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classroom $classroom)
    {
        $this->pass("show classroom");

        return Inertia::render('classroom/show', [
            'classroom' => $classroom,
            'permissions' => [
                'canUpdate' => $this->user->can("update classroom"),
                'canDelete' => $this->user->can("delete classroom"),
            ]
        ]);
    }

    public function edit(Classroom $classroom)
    {
        $this->pass("edit classroom");

        return Inertia::render('classroom/edit', [
            'classroom' => $classroom,
            'permissions' => [
                'canUpdate' => $this->user->can("update classroom"),
                'canDelete' => $this->user->can("delete classroom"),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassroomRequest $request, Classroom $classroom)
    {
        $this->pass("update classroom");

        $data = $request->validated();
        $classroom->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)
    {
        $this->pass("delete classroom");

        $classroom->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateClassroomRequest $request)
    {
        $this->pass("update classroom");

        $data = $request->validated();
        $ids = $data['classroom_ids'];
        unset($data['classroom_ids']);

        Classroom::whereIn('id', $ids)->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteClassroomRequest $request)
    {
        $this->pass("delete classroom");

        $data = $request->validated();
        Classroom::whereIn('id', $data['classroom_ids'])->delete();
    }

    
    
    
}
