<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'email' => "nullable|email",
            'password' => "nullable|min:8",
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,name',
        ];
    }

    public function messages()
    {
        return [
            'email.email' => "Alamat email harus dengan format email",
            'password.min' => "Password minimal 8 karakter",
            'role.required' => "Role user harus diisi",
            'role.array' => "Role user harus berupa array",
            'role.*.exists' => "Nama role tidak valid",
        ];
    }
}
