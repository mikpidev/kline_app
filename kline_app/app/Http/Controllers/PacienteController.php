<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use App\Models\Psicologo;
use App\Models\Usuarios;
use App\Models\Rol;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    /**
     * mostrara la lista de pacientes.
     */
    public function index()
    {
        $pacientes=Paciente::all(); //mandamos a llamar la db pacientes

        return view('pacientes.index', compact('pacientes')); // manda la informacion a la vista 
    }

    /**
     * redirecciona a la vista del formulario para crear un paciente 
     */
    public function create()
    {
        /**Traer todos los psicologos */

        $psicologos = Usuarios::whereHas('rol', function($query){

            $query->where('nombre', 'Psicologo');

        })->get();

        return view('pacientes.create', compact('psicologos'));
    }

    /**
     * Valida la informacion del paciente y crea al paciente y redirecciona a la lista pacientes
     */
    public function store(Request $request)
    {

        
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|max:100',
            'telefono' => 'nullable|integer',
            'email' => 'nullable|string|unique:pacientes|max:100',
            'psicologo_id' => 'required|exists:usuarios,id',


        ]);


        Paciente::create($validated);
        

        return redirect()->route('pacientes.index')
            ->with('success', 'Paciente Registrado Correctamente!!');


    }

    /**
     * Muestra la informacion especifica de un paciente.
     */
    public function show($id)
    {
        $paciente = Paciente::with('psicologo')->findOrFail($id);

        return view('pacientes.show', compact('paciente')); //muestra la informacion de un solo paciente
    
    }


    /**
     * editar paciente.
     */
    public function edit(Paciente $paciente)
    {
        return view('pacientes.edit', compact('paciente'));
    }

    /**
     * Actualizar un paciente en especifico.
     */
    public function update(Request $request, Paciente $paciente)
    {
        //debera de realizar otra vez la validacion 

        $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|max:100',
            'telefono' => 'nullable|integer',
            'email' => 'nulleable|string|unique:pacientes|max:100' . $paciente->id,
            'psicologo_id' => 'required|exists:psicologos,id',
        ]);

        $paciente->update($request->all()); //actualiza paciente
        return redirect()->route('pacientes.index')->with('success', 'Paciente actualizado.');

    }

    /**
     * Eliminar paciente.
     */
    public function destroy(Paciente $paciente)
    {
        $paciente->delete(); // Borra a los pacientes
        return redirect()->rout('pacientes.index')->with('success', 'Paciente eliminado');
    
    }
}
