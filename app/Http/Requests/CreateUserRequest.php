<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
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
            //'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => ['required', 'string', 'min:8', 'confirmed', 'regex:/^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z]).{8,}$/'],
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


    protected function failedValidation(Validator $validator)
    {
        //devolvemos un error generico para blindaje contra ataques de enumeración 
        $jsonResponse = [
            "status"        => "Error",
            "message"       => "Credenciales incorrectas",
            "data"          => $validator->errors()->all(),
        ];

        throw new HttpResponseException(response()->json($jsonResponse, 422));
    }

}
