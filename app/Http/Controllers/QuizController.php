<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Models\Material;
use App\Models\Quiz;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Material $material)
    {
        return Inertia::render('material/quiz', [
            'group' => $material->group,
            'material' => $material,
            'quizzes' => $material->quizzes,
            'canEdit' => auth()->user()->can("edit group")
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizRequest $request)
    {
        $data = $request->validated();
        Quiz::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        return $quiz;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        $data = $request->validated();
        $quiz->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
    }
}
