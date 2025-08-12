<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePembayaranRequest extends FormRequest
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
            "group_id" => "required|exists:groups,id",
            "description" => "required|string",
        ];
    }

    public function messages(): array
    {
        return [
            "group_id.required" => "Group harus diisi",
            "group_id.exists" => "Group tidak ditemukan",
            "description.required" => "Deskripsi harus diisi",
            "description.string" => "Deskripsi harus berupa string",
        ];
    }
}
