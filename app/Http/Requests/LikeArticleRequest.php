<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LikeArticleRequest extends FormRequest
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
            'like' => 'nullable|numeric',
            'dislike' => 'nullable|numeric',
        ];
    }

    public function messages()
    {
        return [
            'like.numeric' => 'harus berupa angka',
            'dislike.numeric' => 'harus berupa angka',
        ];
    }
}
