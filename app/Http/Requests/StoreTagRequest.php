<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class StoreTagRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:tags,name',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => Purify::clean($this->name),
        ]);
    }
}
