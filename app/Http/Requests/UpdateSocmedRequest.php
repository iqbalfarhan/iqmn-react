<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSocmedRequest extends FormRequest
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
            'github' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'youtube' => 'nullable|url',
            'instagram' => 'nullable|url',
        ];
    }

    public function messages()
    {
        return [
            'github.url' => 'Format url tidak valid',
            'linkedin.url' => 'Format url tidak valid',
            'youtube.url' => 'Format url tidak valid',
            'instagram.url' => 'Format url tidak valid',
        ];
    }
}
