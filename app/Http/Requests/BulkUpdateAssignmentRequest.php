<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateAssignmentRequest extends FormRequest
{
    /**
     * Determine if the assignment is authorized to make this request.
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
            'assignment_ids' => 'required|array',
            'assignment_ids.*' => 'exists:assignments,id',
        ];
    }
}
