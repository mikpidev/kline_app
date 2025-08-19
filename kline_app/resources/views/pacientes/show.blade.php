<h1>{{ $paciente->nombre}}</h1>
<p>Fecha de nacimiento: {{$paciente->fecha_nacimiento}}</p>
<p>Sexo: {{$paciente->sexo}}</p>
<p>Telefono: {{$paciente->telefono}}</p>
<p>Email: {{$paciente->email}}</p>
<p>Psicologo {{ $paciente->psicologo->nombre }}</p>