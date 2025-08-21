
<!-- Para que omita si no hay datos anteriores que mostrar(para create) -->  
@php
    $paciente = $paciente ?? new \App\Models\Paciente;
@endphp

<label for="nombre">Nombre</label>
<input type="text" name="nombre" id="nombre" value="{{old('nombre', $paciente->nombre)}}" required>

<label for="fecha_nacimiento">fecha_nacimiento</label>
<input type="date" name="fecha_nacimiento" id="fecha_nacimiento" value="{{old('fecha_nacimiento', $paciente->fecha_nacimiento)}}" required>

<label for="sexo">sexo</label>
<input type="text" name="sexo" id="sexo" value="{{old('sexo', $paciente->sexo)}}" required>

<label for="telefono">telefono</label>
<input type="number" name="telefono" id="telefono" value="{{old('telefono', $paciente->telefono)}}" required>

<label for="email">email</label>
<input type="text" name="email" id="email" value="{{old('email', $paciente->email)}}" required>

<label for="psicologo_id">Psicólogo</label>
<select name="psicologo_id" id="psicologo_id" required>
    <option value="">Seleccione un psicólogo</option>
    @foreach($psicologos as $psicologo)
        <option value="{{ $psicologo->id }}"
            {{ old('psicologo_id', $paciente->psicologo_id) == $psicologo->id ? 'selected' : '' }}>
            {{ $psicologo->nombre }}
        </option>
    @endforeach
</select>