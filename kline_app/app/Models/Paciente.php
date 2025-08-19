<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    protected $fillable =['nombre','fecha_nacimiento','sexo','telefono','email','psicologo_id'];

    public function psicologo()
    {

        return $this->belongsTo(Usuarios::class,'psicologo_id');
    }
}
