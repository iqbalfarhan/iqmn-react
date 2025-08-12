<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePembayaranRequest;
use App\Http\Requests\UpdatePembayaranRequest;
use App\Http\Requests\UploadBuktiRequest;
use App\Models\Notifikasi;
use App\Models\Pembayaran;
use App\Notifications\InvoicePaid;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return Inertia::render('pembayaran/index', [
            'pembayarans' => Pembayaran::with('user', 'group')->get(),
            'canApprove' => $user->can('approve pembayaran')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePembayaranRequest $request)
    {
        $data = $request->validated();
        Pembayaran::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembayaran $pembayaran)
    {
        return Inertia::render('pembayaran/show', [
            'pembayaran' => $pembayaran->load('group', 'user'),
            'canApprovePembayaran' => auth()->user()->can('approve pembayaran')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePembayaranRequest $request, Pembayaran $pembayaran)
    {
        $data = $request->validated();
        $pembayaran->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembayaran $pembayaran)
    {
        $pembayaran->delete();
    }

    public function uploadBukti(UploadBuktiRequest $request, Pembayaran $pembayaran)
    {
        $data = $request->validated();
        $data['bukti_bayar'] = $request->file('bukti')->store('bukti-pembayaran');

        $pembayaran->update($data);

        Notifikasi::create([
            'user_id' => $pembayaran->group->user_id,
            'title' => 'Upload bukti pembayaran',
            'link' => route('pembayaran.show', $pembayaran->id),
            "content" => "{$pembayaran->user->name} telah upload bukti pembayaran untuk group {$pembayaran->group->name}."
        ]);
    }

    public function approvePayment(Pembayaran $pembayaran)
    {
        if (!auth()->user()->can('approve pembayaran')) {
            abort(403);
        }

        try {
            DB::transaction(function () use ($pembayaran) {
                // Update status pembayaran
                $pembayaran->update(['paid' => true]);

                $user = $pembayaran->user;
                $groupId = $pembayaran->group_id;

                // Cek apakah user udah ada di pivot
                $isMember = $user->members()
                    ->where('group_id', $groupId)
                    ->exists();

                if ($isMember) {
                    // Kalau udah ada → update pivot
                    $user->members()->updateExistingPivot($groupId, [
                        'paid' => true
                    ]);
                } else {
                    // Kalau belum ada → attach + set paid = true
                    $user->members()->attach($groupId, [
                        'paid' => true
                    ]);
                }
            
                Notifikasi::create([
                    'user_id' => $user->id,
                    'title' => 'Yeey! Berhasil join group!',
                    'link' => route('group.show', $pembayaran->group->id),
                    "content" => "Pembayaran untuk join group {$pembayaran->group->name} telah diterima dan Anda telah bergabung di grup ini."
                ]);

                $user->notify(new InvoicePaid($pembayaran));

            });
        } catch (\Throwable $th) {
            // Lempar ulang exception atau buat pesan custom
            // throw new \Exception("Gagal approve pembayaran, coba lagi nanti!");
            return back()->withErrors($th->getMessage());
        }
    }
}
