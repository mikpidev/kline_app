@extends('layouts.app')

@section('title', 'Editar Paciente')


@section('content')

<form action="{{ route('pacientes.update', $paciente->id) }}" method="POST">
    @csrf
    @method('PUT')
    
    @include('pacientes._form')

    <button type="submit">Guardar</button>
</form>


@endsection