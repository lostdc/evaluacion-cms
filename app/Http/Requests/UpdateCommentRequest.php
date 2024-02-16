<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class UpdateCommentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'content' => 'sometimes|required|string|max:500', 
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('content')) {
            $this->merge([
                'content' => Purify::clean($this->content),
            ]);
        }
    }
}
