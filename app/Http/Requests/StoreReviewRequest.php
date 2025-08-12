<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
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
            'comment' => 'required|string',
            'rating' => 'required|numeric|min:0|max:5',
        ];
    }

    public function messages(): array
    {
        return [
            'comment.required' => 'Review is required',
            'rating.required' => 'Rating is required',
            'rating.numeric' => 'Rating must be a number',
            'rating.min' => 'Rating must be at least 0',
            'rating.max' => 'Rating must be at most 5',
        ];
    }
}
