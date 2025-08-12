<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadLampiranRequest extends FormRequest
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
            'file' => 'required|file|mimetypes:image/svg+xml,image/png,image/jpeg,image/webp|max:2048'
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'File thumbnail wajib diunggah.',
            'file.mimes' => 'Format file harus berupa: jpg, jpeg, png, atau svg.',
            'file.file' => 'File harus berupa gambar',
            'file.max' => 'Ukuran file maksimal 2MB.',
        ];
    }
}
