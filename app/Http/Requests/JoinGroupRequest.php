<?php

namespace App\Http\Requests;

use App\Models\Group;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class JoinGroupRequest extends FormRequest
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
            'code' => 'required|exists:groups,code'
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Kode grup harus diisi',
            'code.exists' => 'Kode grup tidak ditemukan',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $group = Group::where('code', $this->input('code'))->first();
            $user = $this->user();

            if ($group && $group->members()->where('user_id', $user->id)->exists()) {
                $validator->errors()->add('code', 'Kamu sudah tergabung di grup ini.');
            }
        });
    }
}
