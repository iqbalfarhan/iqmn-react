<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNilaiRequest extends FormRequest
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
            'tugas_id' => 'required|exists:tugas,id',
            'user_id' => 'required|exists:users,id',
            'nilai' => 'required|numeric|min:0|max:100',
        ];
    }

    public function messages()
    {
        return [
            'tugas_id.required' => 'Harus pilih tugas',
            'tugas_id.exists' => 'Tugas tidak ditemukan',
            'user_id.required' => 'Harus pilih user',
            'user_id.exists' => 'User tidak ditemukan',
            'nilai.required' => 'Nilai harus diisi',
            'nilai.numeric' => 'Nilai harus berupa angka',
            'nilai.min' => 'Nilai minimal 0',
            'nilai.max' => 'Nilai maksimal 100',
        ];
    }
}
