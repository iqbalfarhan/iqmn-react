<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticleRequest extends FormRequest
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
            'title' => 'required',
            'publish' => 'required|boolean',
            'slug' => 'nullable',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Judul article harus diisi',
            'publish.required' => 'Publish harus diisi',
            'publish.boolean' => 'Publish harus boolean'
        ];
    }
}
