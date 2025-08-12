<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTugasRequest extends FormRequest
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
            'name' => "nullable",
            'description' => "nullable",
            'limit_date' => "nullable|date",
            'rate' => "nullable|numeric|min:0|max:100",
            'available' => "nullable|boolean",
        ];
    }

    public function messages()
    {
        return [
            'limit_date.date' => "harus berupa tanggal",
            'rate.numeric' => "harus berupa angka antara 0 - 100",
            'rate.min' => "angka minimal 0",
            'rate.max' => "angka maksimal 100",
            'available.boolean' => "Harus berupa nilai true atau false",
        ];
    }
}
