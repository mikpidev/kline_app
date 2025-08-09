@extends('layouts.app')

@section('title', 'Inicio')


@section('content')

    @forelse($pacientes as $paciente)
        {{ $paciente->nombre }} -
        <a href="{{ route('pacientes.show', $paciente) }}">ver</a>
    @empty
        No hay pacientes Registrados
    @endforelse

@endsection

