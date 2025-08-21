@extends('layouts.app')

@section('title', 'Inicio')


@section('content')

    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Fecha de Nacimiento</th>
                <th>Sexo</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Psicologo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @forelse($pacientes as $paciente)
                <tr>
                    <td>{{ $paciente->nombre }} </td>
                    <td>{{ $paciente->fecha_nacimiento }}</td>
                    <td>{{ $paciente->sexo }}</td>
                    <td>{{ $paciente->telefono }}</td>
                    <td>{{ $paciente->email }}</td>
                    <td>{{ $paciente->psicologo->nombre }}</td>
                    <td>
                            <a href="{{ route('pacientes.show', $paciente) }}">ver</a>
                            <a href="{{ route('pacientes.edit', $paciente->id) }}">Editar</a>
                            <form action="{{ route('pacientes.destroy', $paciente->id) }}" method="POST" onsubmit="return confirm('¿Seguro que deseas eliminar este paciente?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit">Eliminar</button>
                            </form>
                    </td>
                </tr>
            @empty
                <tr>No hay pacientes Registrados</tr>
            @endforelse
        </tbody>
    </table>

    <form action="{{ route('pacientes.index') }}" id="filterForm" method="GET">
        <label for="">
            <input type="checkbox" name="show_disabled" value="1" id="showDisabledCheckbox" {{request('show_disabled') ? 'checked' : ''}}> Mostrar Pacientes deshabilitados
        </label>
    </form>

    <script>
        //al seleccionar checkbox la pagina se recargara automaticamente
        document.getElementById('showDisabledCheckbox').addEventListener('change', function(){
            document.getElementById('filterForm').submit();
        });
    </script>

    <a href="{{ route('pacientes.create', $paciente->id) }}">Crear Paciente</a>
    
@endsection

