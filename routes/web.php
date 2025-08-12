<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SocmedController;
use App\Http\Controllers\TugasController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\GroupMemberOnlyMiddleware;
use App\Models\Pembayaran;
use App\Models\User;
use App\Notifications\InvoicePaid;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/daftar-tugas', [DashboardController::class, 'daftarTugas'])->name('dashboard.daftar-tugas');
    Route::get('/dashboard/explore', [DashboardController::class, 'explore'])->name('dashboard.explore');
    Route::get('/dashboard/pembayaran', [DashboardController::class, 'pembayaran'])->name('dashboard.pembayaran');
    Route::get('/review', [DashboardController::class, 'review'])->name('review');
    
    Route::get('/user/{user}/login-as', [UserController::class, 'loginAs'])->name('user.login-as');
    Route::resource('user', UserController::class);
    Route::resource('role', RoleController::class);
    Route::resource('permission', PermissionController::class);

    Route::get('group/{code}/join', [GroupController::class, 'joinByUrl'])->name('group.join-by-url');
    Route::post('group/{group}/add-member', [GroupController::class, 'addMember'])->name('group.add-member');
    Route::post('group/join', [GroupController::class, 'join'])->name('group.join');

    Route::middleware(GroupMemberOnlyMiddleware::class)->group(function () {
        Route::delete('group/{group}/leave', [GroupController::class, 'leave'])->name('group.leave');
        Route::get('group/{group}/material', [GroupController::class, 'material'])->name('group.material');
        Route::get('group/{group}/video', [GroupController::class, 'video'])->name('group.video');
        Route::get('group/{group}/tugas', [GroupController::class, 'tugas'])->name('group.tugas');
        Route::get('group/{group}/nilai', [GroupController::class, 'nilai'])->name('group.nilai');
        Route::get('group/{group}/member', [GroupController::class, 'member'])->name('group.member'); 
        Route::delete('group/{group}/kick-member/{user}', [GroupController::class, 'kickMember'])->name('group.kick-member'); 
    });
    Route::delete('group/{group}/delete-to-dashboard', [GroupController::class, 'deleteToDashboard'])->name('group.delete-to-dashboard'); 
    Route::resource('group', GroupController::class);

    Route::get('material/{material}/quizzes', [QuizController::class, 'index'])->name('material.quizzes');
    Route::post('material/{material}/thumbnail', [MaterialController::class, 'uploadThumbnail'])->name('material.upload-thumbnail');
    Route::resource('material', MaterialController::class);
    Route::apiResource('chat', ChatController::class);
    
    Route::apiResource('tugas', TugasController::class);

    Route::apiResource('media', MediaController::class);
    Route::apiResource('quiz', QuizController::class);

    Route::post('pembayaran/{pembayaran}/upload-bukti', [PembayaranController::class, 'uploadBukti'])->name('pembayaran.upload-bukti');
    Route::put('pembayaran/{pembayaran}/approve', [PembayaranController::class, 'approvePayment'])->name('pembayaran.approve');
    Route::apiResource('pembayaran', PembayaranController::class);

    Route::post('nilai/store-jawaban', [NilaiController::class, 'storeJawaban'])->name('nilai.store-jawaban');
    Route::post('nilai/{nilai}/upload-lampiran', [NilaiController::class, 'uploadLampiran'])->name('nilai.upload-lampiran');
    Route::apiResource('nilai', NilaiController::class);

    Route::delete('notifikasi/{user}', [NotifikasiController::class, 'destroyAll'])->name('notifikasi.destroy-all');
    Route::put('notifikasi/update-all', [NotifikasiController::class, 'updateAll'])->name('notifikasi.update-all');
    Route::apiResource('notifikasi', NotifikasiController::class);

    Route::resource('review', ReviewController::class)->only('store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
