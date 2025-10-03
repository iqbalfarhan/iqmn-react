<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateClassroomRequest extends FormRequest
{
    /**
     * Determine if the classroom is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'classroom_ids' => 'required|array',
            'classroom_ids.*' => 'exists:classrooms,id',
        ];
    }
}
