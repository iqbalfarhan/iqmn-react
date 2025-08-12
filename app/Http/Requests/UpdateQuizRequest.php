<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuizRequest extends FormRequest
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
            'question' => 'nullable',
            'attachment' => 'nullable',
            'a' => 'nullable',
            'b' => 'nullable',
            'c' => 'nullable',
            'answer' => 'nullable|in:a,b,c',
        ];
    }

    public function messages()
    {
        return [
            'answer.in' => "Jawaban jarus pilih a|b|c",
        ];
    }
}
