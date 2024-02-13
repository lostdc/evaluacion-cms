<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class UpdateTagRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            // La regla 'unique' debe ignorar el id del tag actual para permitir actualizar sin cambiar el nombre
            'name' => 'required|string|max:255|unique:tags,name,' . $this->tag,
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => Purify::clean($this->name),
        ]);
    }
}
