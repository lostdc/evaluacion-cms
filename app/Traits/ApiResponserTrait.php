<?php

namespace App\Traits;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use PhpParser\Node\Expr\Cast\String_;
use Carbon\Carbon;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Api Responser Trait
|--------------------------------------------------------------------------
|
| This trait will be used for any response we sent to clients.
| also contains functions for Logs
*/

trait ApiResponserTrait
{
   
    protected function success(string $message = null, int $code, $data = null, $extra = null)
    {
        $jsonResponse = [
            'status' => 'Success',
            'message' => $message,
            'data' => $data,
            'code' => $code
        ];

        //agregamos cada elemento del array como extra en el mensaje json
        if(is_array($extra)){
            $jsonResponse = array_merge($jsonResponse, $extra);
        }
        return response()->json($jsonResponse, $code);
    }

    protected function error(string $message = null, int $code, $data = null)
    {
        return response()->json([
            'status' => 'Error',
            'message' => $message,
            'data' => $data,
            'code' => $code
        ], $code);
    }

    protected function resumenError($e)
    {
        // Información básica del error
        $errorSummary = PHP_EOL . "Archivo : " . $e->getFile() . PHP_EOL .
                        "Linea    : " . $e->getLine();
    
        // Solo añadimos el backtrace en entorno local
        if (getenv('APP_ENV') === 'local') {
            $backtraceOutput = "";
            $maxBacktraceLength = 3;
            
            $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
            for ($i = 0; $i < min($maxBacktraceLength, count($backtrace)); $i++) {
                $entry = $backtrace[$i];
                $fileName = $entry['file'] ?? 'N/A';
                $line = $entry['line'] ?? 'N/A';
                $function = $entry['function'] ?? 'N/A';
                $backtraceOutput .= "Archivo: {$fileName} - Linea: {$line}, Función: {$function}" . PHP_EOL;
            }
    
            if (!empty($backtraceOutput)) {
                $errorSummary .= PHP_EOL . "Backtrace Limitado:" . PHP_EOL . $backtraceOutput;
            }
        }
    
        return $errorSummary;
    }

    protected function resumenInfo($linea, Request $request = null, $except = null)
    {
        $logOutput = PHP_EOL."Archivo        : ".debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS,2)[1]["file"].PHP_EOL.
                     "Linea          : ".$linea.PHP_EOL;
    
        if ($request !== null) {
            $requestData = json_encode($request->except(['password', 'secret'])); // Asegúrate de excluir campos sensibles
            $logOutput .= "Request Type   : ".$request->method().PHP_EOL.
                          "Request Data   : ".$requestData.PHP_EOL;
        }
    
        $logOutput .= "Metodo         : ".debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS,2)[1]["function"].PHP_EOL;
    
        return $logOutput;
    }

}