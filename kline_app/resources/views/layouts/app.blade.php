<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Kline')</title>

    <!-- Referencias a librerias frontend-->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

</head>

<body>
    <header class="">

        <!-- H1 sera remplazado por pic tag-->
        <h1 class="">Insertar Logo Kline</h1>

        <nav class="">
            <a href="{{ route('pacientes.index') }}">Home</a>
            <a href="{{ route('pacientes.index') }}">Expedientes</a>
            <a href="{{ route('pacientes.index') }}">Citas</a>
            <a href="{{ route('pacientes.index') }}">Psicologos</a>
            <a href="{{ route('pacientes.index') }}">Citas</a>
            <a href="{{ route('pacientes.index') }}">Soporte</a>
        </nav>
    </header>

    <main>
        @yield('content')
    </main>

    <footer>
        <p>&copy; 2025 Kline</p>
    </footer>



</body>

</html>