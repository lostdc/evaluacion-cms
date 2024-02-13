<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class UpdatePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'category_id' => 'sometimes|required|integer|exists:categories,id',
            'author_id' => 'sometimes|required|integer|exists:users,id',
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
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
