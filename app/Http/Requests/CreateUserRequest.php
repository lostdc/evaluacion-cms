<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;

class CreateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Sanitize input before validation.
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'name' => Purify::clean($this->name),
            'email' => Purify::clean($this->email),
            // No need to purify password, but you might want to sanitize other fields.
        ]);
    }
}
