<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChatRequest extends FormRequest
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
            'material_id' => 'required|exists:materials,id',
            'message' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'material_id.required' => 'Material ID is required.',
            'material_id.exists' => 'Material ID does not exist.',
            'message.string' => 'Message must be a string.',
            'message.required' => 'Message is required.',
        ];
    }
}
