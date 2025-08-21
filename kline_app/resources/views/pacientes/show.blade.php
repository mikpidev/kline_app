@extends('layouts.app')

@section('title', 'Paciente')


@section('content')

<h1>{{ $paciente->nombre}}</h1>
<p>Fecha de nacimiento: {{$paciente->fecha_nacimiento}}</p>
<p>Sexo: {{$paciente->sexo}}</p>
<p>Telefono: {{$paciente->telefono}}</p>
<p>Email: {{$paciente->email}}</p>
<p>Psicologo {{ $paciente->psicologo->nombre }}</p>

<a href="{{ route('pacientes.edit', $paciente->id) }}">Editar</a>

<form action="{{ route('pacientes.destroy', $paciente->id) }}" method="POST" onsubmit="return confirm('¿Seguro que deseas eliminar este paciente?')">
    @csrf
    @method('DELETE')
    <button type="submit">Eliminar</button>
</form>



@endsection