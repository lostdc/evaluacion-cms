<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class StorePostRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Aquí puedes incluir lógica de autorización
    }

    public function rules()
    {
        return [
            'category_id' => 'required|integer|exists:categories,id',
            'author_id' => 'required|integer|exists:users,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'title' => Purify::clean($this->title),
            'content' => Purify::clean($this->content),
        ]);
    }
}
