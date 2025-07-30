<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clinicas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_comercial', 150);                  
            $table->string('nombre_legal', 200);
            $table->text('direccion');
            $table->integer('telefono');
            $table->string('respnsable', 100);
            $table->text('correo_contacto, 100');     /*** Correo contacto del responsable de la clinica*/
            $table->string('sitio_web', 100); /*** Ejemplo https://www.ejemplo.com*/
            $table->enum('tipo_plan', ['demo','basico','Premium']);
            $table->enum('tipo_despliegue', ['saas','on_premise']);
            $table->enum('estado', ['activa','suspendida','inactiva']);
            $table->date('fecha_creacion');
            $table->text('observaciones');
	    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinicas');
    }
};
