<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadBuktiRequest extends FormRequest
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
            'bukti' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'bukti.required' => 'Bukti pembayaran harus diunggah.',
            'bukti.image' => 'Bukti pembayaran harus berupa gambar.',
            'bukti.mimes' => 'Bukti pembayaran harus dalam format JPEG, PNG, JPG, atau GIF.',
            'bukti.max' => 'Bukti pembayaran tidak boleh lebih besar dari 2 MB.',
        ];
    }
}
