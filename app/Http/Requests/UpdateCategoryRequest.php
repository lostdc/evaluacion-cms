<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Aquí puedes incorporar lógica de autorización si es necesario
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => Purify::clean($this->name),
            'description' => Purify::clean($this->description),
        ]);
    }
}
