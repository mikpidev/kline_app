@extends('layouts.app')

@section('title', 'Crear Paciente')


@section('content')

    <h1>Crear Nuevo Paciente</h1>

    
<!--     formulario para la creacion de un paciente -->    
    <form action="{{ route('pacientes.store') }}" method="POST">
        @csrf
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" required>

        <label for="fecha_nacimiento">fecha_nacimiento</label>
        <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" required>

        <label for="sexo">sexo</label>
        <input type="text" name="sexo" id="sexo" required>

        <label for="telefono">telefono</label>
        <input type="number" name="telefono" id="telefono" required>

        <label for="email">email</label>
        <input type="text" name="email" id="email" required>

        <label for="psicologo_id">Psicólogo</label>
        <select name="psicologo_id" required>
        <option value="">Seleccione un psicólogo</option>
        @foreach($psicologos as $psicologo)
            <option value="{{ $psicologo->id }}">{{ $psicologo->nombre }}</option>
        @endforeach
        </select>

        <button type="submit">Guardar</button>
    </form>

@endsection
