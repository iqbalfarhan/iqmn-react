<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTugasRequest extends FormRequest
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
            'group_id' => "required|exists:groups,id",
            'name' => "required",
            'description' => "nullable",
            'limit_date' => "nullable|date",
            'rate' => "required|numeric|min:0|max:100",
            'available' => "nullable|boolean",
        ];
    }

    public function messages()
    {
        return [
            'group_id.required' => 'Harus menyertakan id group',
            'group_id.exists' => 'Group ID tidak ditemukan',
            'limit_date.date' => "harus berupa tanggal",
            'rate.numeric' => "harus berupa angka antara 0 - 100",
            'rate.min' => "angka minimal 0",
            'rate.max' => "angka maksimal 100",
            'available.boolean' => "Harus berupa nilai true atau false",
        ];
    }
}
