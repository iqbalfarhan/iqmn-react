<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'url' => 'required|string|max:255',
            'classroom_id' => 'nullable|exists:classrooms,id',
            'visible' => 'required|boolean',
        ];
    }
}
