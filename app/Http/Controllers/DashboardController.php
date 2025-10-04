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
            'classrooms' => Classroom::with(['user', 'materials'])->mine()->get(),
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
