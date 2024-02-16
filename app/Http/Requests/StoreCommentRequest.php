<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class StoreCommentRequest extends FormRequest
{
    public function authorize()
    {
        // Aquí puedes añadir lógica para determinar si el usuario está autorizado a hacer esta petición
        return true;
    }

    public function rules()
    {
        return [
            'post_id' => 'required|integer|exists:posts,id',
            'author_id' => 'required|integer|exists:users,id',
            'content' => 'required|string|max:500', // Ajusta según tus necesidades
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'content' => Purify::clean($this->content),
        ]);
    }
}
