<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $table = 'roles';

    // Relación inversa
    public function usuarios()
    {
        return $this->hasMany(Usuarios::class, 'rol');
    }
}
