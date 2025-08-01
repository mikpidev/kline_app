<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    Route::resources('pacientes', app\Http\Controllers\PacienteController::class);
    
    Route::resources('psicologos', app\Http\Controllers\PsicologosController::class);
    
    Route::resources('expedientes', app\Http\Controllers\ExpedientesController::class);
    
    Route::resources('usuarios', app\Http\Controllers\UsuariosController::class);

    return view('welcome');
});
