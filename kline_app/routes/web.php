<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PacienteController;
use \App\Http\Controllers\PsicologosController;
use \App\Http\Controllers\ExpedienteController;
use \App\Http\Controllers\UsuariosController;

Route::get('/', function () {

    return view('welcome');
});

Route::resource('pacientes', PacienteController::class);
    
Route::resource('psicologos', PsicologosController::class);

Route::resource('expedientes', ExpedienteController::class);

Route::resource('usuarios', UsuariosController::class);
