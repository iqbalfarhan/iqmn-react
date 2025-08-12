<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSocmedRequest;
use App\Http\Requests\UpdateSocmedRequest;
use App\Models\Socmed;
use Inertia\Inertia;

class SocmedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('settings/social-media', [
            'socmed' => auth()->user()->socmed
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSocmedRequest $request)
    {
        $data = $request->validated();
        
        Socmed::updateOrCreate([
            'user_id' => auth()->id()
        ], $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Socmed $socmed)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSocmedRequest $request, Socmed $socmed)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Socmed $socmed)
    {
        //
    }
}
