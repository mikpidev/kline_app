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
    public function index(Request $request)
    {
        
        if($request->has('show_disabled')){
            $pacientes = Paciente::onlyTrashed()->get();
        }else{
            $pacientes=Paciente::all(); //mandamos a llamar la db pacientes
        }

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
            'email' => 'nullable|email|max:100|unique:pacientes,email,',
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
        $psicologos = Usuarios::whereHas('rol', function($query){

            $query->where('nombre', 'Psicologo');

        })->get();        
        
        return view('pacientes.edit', compact('paciente', 'psicologos'));
    }

    /**
     * Actualizar un paciente en especifico.
     */
    public function update(Request $request, Paciente $paciente)
    {
        //debera de realizar otra vez la validacion 

        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|max:100',
            'telefono' => 'nullable|integer',
            'email' => 'nullable|string|max:100|unique:pacientes,email,' . $paciente->id,
            'psicologo_id' => 'required|exists:usuarios,id',


        ]);


        $paciente->update($validated);
        

        return redirect()->route('pacientes.index')
            ->with('success', 'Paciente Actualizado Correctamente!!');

    }

    /**
     * Eliminar paciente.
     */
    public function destroy(Paciente $paciente)
    {
        $paciente->delete(); // Soft Delete
        return redirect()->route('pacientes.index')
                         ->with('success', 'Paciente deshabilitado correctamente');
    
    }

    public function restore($id)
    {
        $paciente = Paciente::withTrashed()->findOrFail($id);
        $paciente->restore(); // quita el deleted_at
        return redirect()->route('pacientes.index')
                        ->with('success', 'Paciente restaurado correctamente');
    }

}
