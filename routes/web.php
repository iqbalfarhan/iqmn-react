<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\MaterialController;



Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/about', [WelcomeController::class, 'about'])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('documentation', [DashboardController::class, 'documentation'])->name('documentation');

    Route::put('user/bulk', [UserController::class, 'bulkUpdate'])->name('user.bulk.update');
    Route::delete('user/bulk', [UserController::class, 'bulkDelete'])->name('user.bulk.destroy');
    Route::get('user/archived', [UserController::class, 'archived'])->name('user.archived');
    Route::put('user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::apiResource('user', UserController::class);

    Route::apiResource('role', RoleController::class);
    Route::post('permission/resync', [PermissionController::class, 'resync'])->name('permission.resync');
    Route::apiResource('permission', PermissionController::class);
    Route::apiResource('doc', MediaController::class);

    Route::get('classroom/{classroom}/overview', [ClassroomController::class, 'show'])->name('classroom.overview');
    Route::get('classroom/{classroom}/materials', [MaterialController::class, 'index'])->name('classroom.materials');
    Route::get('classroom/{classroom}/assignments', [ClassroomController::class, 'show'])->name('classroom.assignments');
    Route::get('classroom/{classroom}/scores', [ClassroomController::class, 'show'])->name('classroom.scores');
    Route::get('classroom/{classroom}/members', [ClassroomController::class, 'show'])->name('classroom.members');
    Route::put('classroom/bulk', [ClassroomController::class, 'bulkUpdate'])->name('classroom.bulk.update');
    Route::delete('classroom/bulk', [ClassroomController::class, 'bulkDelete'])->name('classroom.bulk.destroy');
    Route::resource('classroom', ClassroomController::class);
    
    Route::put('material/bulk', [MaterialController::class, 'bulkUpdate'])->name('material.bulk.update');
    Route::delete('material/bulk', [MaterialController::class, 'bulkDelete'])->name('material.bulk.destroy');
    Route::post('material/{material}/upload-media', [MaterialController::class, 'uploadMedia'])->name('material.upload-media');
    Route::apiResource('material', MaterialController::class)->except('index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
