<?php

namespace App\Http\Requests;

use App\Rules\UploadTugas;
use Illuminate\Foundation\Http\FormRequest;

class StoreJawabanRequest extends FormRequest
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
            "jawaban" => "required",
            'tugas_id' => ["required", new UploadTugas],
            "lampiran" => "nullable|file|mimes:jpg,jpeg,png,pdf,webp"
        ];
    }

    public function messages()
    {
        return [
            "jawaban.required" => "Jawaban harus diisi",
            "tugas_id.exists" => "Tugas tidak ditemukan",
            "lampiran.file" => "lampiran harus berupa file",
        ];
    }
}
