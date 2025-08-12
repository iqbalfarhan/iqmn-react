<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNotifikasiRequest;
use App\Http\Requests\UpdateAllNotifikasiRequest;
use App\Http\Requests\UpdateNotifikasiRequest;
use App\Models\Notifikasi;
use App\Models\User;

class NotifikasiController extends Controller
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
    public function store(StoreNotifikasiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Notifikasi $notifikasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotifikasiRequest $request, Notifikasi $notifikasi)
    {
        $data = $request->validated();
        $notifikasi->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notifikasi $notifikasi)
    {
        //
    }

    public function destroyAll(User $user)
    {
        $user->notifikasis()->where('read', true)->delete();
    }

    public function updateAll(UpdateAllNotifikasiRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();
        $user->notifikasis()->update($data);
    }
}
