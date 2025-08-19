<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $table = 'usuarios';

    public function rol()
    {
        return $this->belongsTo(Roles::class, 'rol_id');
    }
}
