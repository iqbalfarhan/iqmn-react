<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/index', [
            'classrooms' => Classroom::with(['media', 'user', 'materials'])->mine()->get(),
            'memberof' => $this->user->memberof->load(['media', 'user', 'materials'])
        ]);
    }

    public function documentation()
    {
        return Inertia::render('dashboard/documentation', [
            'title' => 'App documentation',
            'content' => file_get_contents(base_path('README.md')),
        ]);
    }
}
