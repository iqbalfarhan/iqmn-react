<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Group;
use App\Models\Material;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $statuses = [
            [
                "number" => User::role('pelajar')->count(),
                "label" => 'Member kece',
                "description" => 'Temen2 yang aktif dan saling support!',
            ],
            [
                "number" => Group::count(),
                "label" => 'Kelas seru',
                "description" => 'Belajar gak harus boring, kan?',
            ],
            [
                "number" => User::role('pengajar')->count(),
                "label" => 'Pengajar keren',
                "description" => 'Mentor yang siap bantu lo leveling up!',
            ],
            [
                "number" => Material::count(),
                "label" => 'Materi',
                "description" => 'Dari basic sampe advanced, semua ada!',
            ],
        ];
        return Inertia::render('welcome/index', [
            "reviews" => Review::with('user')->latest()->limit(3)->get(),
            'statuses' => $statuses,
        ]);
    }
}
