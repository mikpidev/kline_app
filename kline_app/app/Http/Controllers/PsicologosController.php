<?php

namespace App\Http\Controllers;

use App\Models\Psicologo;
use Illuminate\Http\Request;

class PsicologosController extends Controller
{
    public function index()
    {
        $psicologos = Psicologo::all();
        return view('psicologos.index', compact('psicologos'));
    }

    public function create()
    {
        return view('psicologos.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|max:100',
            'telefono' => 'nullable|integer',
            'email' => 'nullable|string|unique:psicologos|max:100',
        ]);

        Psicologo::create($request->all());

        return redirect()->route('psicologos.index')->with('success', 'Psicólogo creado');
    }

    public function show(Psicologo $psicologo)
    {

        dd($psicologo);
        return view('psicologos.show', compact('psicologo'));
    }

    public function edit(Psicologo $psicologo)
    {
        return view('psicologos.edit', compact('psicologo'));
    }

    public function update(Request $request, Psicologo $psicologo)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'sexo' => 'nullable|string|max:100',
            'telefono' => 'nullable|integer',
            'email' => 'nullable|string|unique:psicologos,email,' . $psicologo->id . '|max:100',
        ]);

        $psicologo->update($request->all());

        return redirect()->route('psicologos.index')->with('success', 'Psicólogo actualizado.');
    }

    public function destroy(Psicologo $psicologo)
    {
        $psicologo->delete();
        return redirect()->route('psicologos.index')->with('success', 'Psicólogo eliminado');
    }
}
