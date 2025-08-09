<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Psicologo extends Model
{
    protected $fillable = ['usuario_id', 'nombre', 'fecha_nacimiento', 'especialidad', 'telefono', 'email'];

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}

