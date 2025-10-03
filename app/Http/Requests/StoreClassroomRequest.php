<?php

namespace App\Http\Requests;

use App\Models\Classroom;
use Illuminate\Foundation\Http\FormRequest;

class StoreClassroomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'user_id' => 'nullable',
            'description' => 'required|string',
            'visibility' => 'required|in:' . implode(',', Classroom::$enumVisibility),
        ];
    }
}
