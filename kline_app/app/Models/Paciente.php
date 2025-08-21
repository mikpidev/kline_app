<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paciente extends Model
{
    use SoftDeletes;

    protected $fillable =['nombre','fecha_nacimiento','sexo','telefono','email','psicologo_id'];

    public function psicologo()
    {

        return $this->belongsTo(Usuarios::class,'psicologo_id');
    }
}
