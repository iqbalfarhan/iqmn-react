<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name' => "required",
            'email' => "required|email|unique:users,email",
            'password' => "required|min:8",
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,name',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Nama user harus diisi",
            'email.required' => "Alamat email harus diisi",
            'email.email' => "Alamat email harus dengan format email",
            'password.required' => "Passowrd harus diisi",
            'password.min' => "Password minimal 8 karakter",
            'role.required' => "Role user harus diisi",
            'role.array' => "Role user harus berupa array",
            'role.*.exists' => "Nama role tidak valid",
            'email.unique' => "Email udah ada yang pakai",
        ];
    }
}
