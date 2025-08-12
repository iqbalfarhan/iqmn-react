<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
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
            'question' => 'required',
            'attachment' => 'nullable',
            'a' => 'required',
            'b' => 'required',
            'c' => 'required',
            'answer' => 'required|in:a,b,c',
        ];
    }

    public function messages()
    {
        return [
            'material_id.required' => "Harus pilih material",
            'question.required' => "Pertanyaan harus diisi",
            'a.required' => "pilihan a harus diisi",
            'b.required' => "pilihan b harus diisi",
            'c.required' => "pilihan c harus diisi",
            'answer.required' => "harus pilih salahsatu jawaban",
            'answer.in' => "Jawaban jarus pilih a|b|c",
        ];
    }
}
