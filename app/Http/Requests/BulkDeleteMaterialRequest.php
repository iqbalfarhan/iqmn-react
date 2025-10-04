<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkDeleteMaterialRequest extends FormRequest
{
    /**
     * Determine if the material is authorized to make this request.
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
            'material_ids' => 'required|array',
            'material_ids.*' => 'exists:materials,id',
        ];
    }
}
