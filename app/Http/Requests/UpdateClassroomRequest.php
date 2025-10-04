<?php

namespace App\Http\Requests;

use App\Models\Classroom;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClassroomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'url' => 'nullable|string|max:255',
            'code' => 'nullable|string|max:6|unique:classrooms,code,' . $this->classroom->id,
            'user_id' => 'nullable',
            'description' => 'nullable|string',
            'visibility' => 'nullable|in:' . implode(',', Classroom::$enumVisibility),
        ];
    }
}
