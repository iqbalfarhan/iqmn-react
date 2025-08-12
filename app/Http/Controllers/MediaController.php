<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMediaRequest;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Media $medium)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Media $medium)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $medium)
    {
        $medium->delete();
    }
}
