<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'code' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'The name field must be a string.',
            'name.max' => 'The name field must be less than 255 characters.',
            'description.string' => 'The description field must be a string.',
            'description.max' => 'The description field must be less than 255 characters.',
            'code.string' => 'The code field must be a string.',
            'code.max' => 'The code field must be less than 255 characters.',
            'price.numeric' => 'The code field must be a number.',
        ];
    }
}
