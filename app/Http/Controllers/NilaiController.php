<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJawabanRequest;
use App\Http\Requests\StoreNilaiRequest;
use App\Http\Requests\UpdateNilaiRequest;
use App\Http\Requests\UploadLampiranRequest;
use App\Models\Nilai;
use Illuminate\Support\Facades\Auth;

class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreNilaiRequest $request)
    {
        $user = Auth::user();
        if(!$user->can('input nilai')){
            abort(403);
        }

        $data = $request->validated();

        Nilai::updateOrCreate([
            'tugas_id' => $data['tugas_id'],
            'user_id' => $data['user_id'],
        ], [
            'nilai' => $data['nilai']
        ]);

        // if ($data['nilai'] === 0) {
        //     $nilai->delete();
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(Nilai $nilai)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Nilai $nilai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNilaiRequest $request, Nilai $nilai)
    {
        $data = $request->validated();
        $nilai->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nilai $nilai)
    {
        $nilai->delete();
    }

    public function storeJawaban(StoreJawabanRequest $request)
    {
        $data = $request->validated();

        $nilai = Nilai::updateOrCreate([
            'tugas_id' => $data['tugas_id'],
            'user_id' => auth()->id(),
        ], [
            'jawaban' => $data['jawaban']
        ]);

        if (isset($data['lampiran'])) {
            $nilai->addMedia($data['lampiran'])->toMediaLibrary();
        }
    }

    public function uploadLampiran(UploadLampiranRequest $request, Nilai $nilai)
    {
        $data = $request->validated();
        $nilai->addMedia($data['file'])->toMediaLibrary();
    }
}
