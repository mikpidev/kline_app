@extends('layouts.app')

@section('title', 'Crear Paciente')


@section('content')

    <h1>Crear Nuevo Paciente</h1>

    
<!--     formulario para la creacion de un paciente -->    
    <form action="{{ route('pacientes.store') }}" method="POST">
        @csrf
        @include('pacientes._form')


        <button type="submit">Guardar</button>
    </form>

@endsection
