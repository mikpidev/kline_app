// Laravel DTE API Structure
// =======================

// 1️⃣ Migración: clientes
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration {
    public function up() {
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('nit')->nullable();
            $table->string('nrc')->nullable();
            $table->string('direccion')->nullable();
            $table->string('telefono')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('clientes');
    }
}


// 2️⃣ Migración: ventas
class CreateVentasTable extends Migration {
    public function up() {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained()->onDelete('cascade');
            $table->date('fecha');
            $table->decimal('total', 12, 2);
            $table->string('tipo_pago')->nullable();
            $table->enum('estado', ['borrador', 'emitida', 'anulada'])->default('borrador');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('ventas');
    }
}


// 3️⃣ Migración: venta_items
class CreateVentaItemsTable extends Migration {
    public function up() {
        Schema::create('venta_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('venta_id')->constrained()->onDelete('cascade');
            $table->string('descripcion');
            $table->integer('cantidad');
            $table->decimal('precio_unitario', 12, 2);
            $table->decimal('total', 12, 2);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('venta_items');
    }
}


// 4️⃣ Migración: dtes
class CreateDtesTable extends Migration {
    public function up() {
        Schema::create('dtes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('venta_id')->constrained()->onDelete('cascade');
            $table->string('tipo_dte');
            $table->string('codigo_generacion')->nullable();
            $table->longText('xml_firmado')->nullable();
            $table->json('json_original')->nullable();
            $table->json('respuesta_hacienda')->nullable();
            $table->enum('estado_envio', ['pendiente', 'enviado', 'rechazado'])->default('pendiente');
            $table->timestamp('fecha_envio')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('dtes');
    }
}


// 5️⃣ Modelos y relaciones

// Cliente.php
public function ventas() {
    return $this->hasMany(Venta::class);
}

// Venta.php
public function cliente() {
    return $this->belongsTo(Cliente::class);
}
public function items() {
    return $this->hasMany(VentaItem::class);
}
public function dte() {
    return $this->hasOne(Dte::class);
}

// Dte.php
public function venta() {
    return $this->belongsTo(Venta::class);
}

// VentaItem.php
public function venta() {
    return $this->belongsTo(Venta::class);
}


// 6️⃣ Configuración Hacienda: config/hacienda.php
return [
    'endpoint' => env('HACIENDA_API_URL', 'https://api.hacienda.go.cr/fe/'),
    'cert_path' => env('HACIENDA_CERT_PATH'),
    'key_path' => env('HACIENDA_KEY_PATH'),
    'username' => env('HACIENDA_USER'),
    'password' => env('HACIENDA_PASS'),
    'timeout' => 30,
];


// 7️⃣ Servicio: app/Services/DteService.php
namespace App\Services;
use Illuminate\Support\Facades\Http;

class DteService {
    protected $endpoint, $cert, $key, $username, $password;

    public function __construct() {
        $this->endpoint = config('hacienda.endpoint');
        $this->cert = config('hacienda.cert_path');
        $this->key = config('hacienda.key_path');
        $this->username = config('hacienda.username');
        $this->password = config('hacienda.password');
    }

    public function enviarDte(array $dteData) {
        $response = Http::withBasicAuth($this->username, $this->password)
            ->timeout(config('hacienda.timeout'))
            ->attach('xml_dte', $dteData['xml_firmado'], 'dte.xml')
            ->post($this->endpoint . 'send');
        return $response->json();
    }

    public function consultarDte(string $clave) {
        $response = Http::withBasicAuth($this->username, $this->password)
            ->timeout(config('hacienda.timeout'))
            ->get($this->endpoint . 'status/' . $clave);
        return $response->json();
    }
}


// 8️⃣ Controlador: app/Http/Controllers/Api/DteController.php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Services\DteService;
use App\Models\Dte;
use Illuminate\Http\Request;

class DteController extends Controller {
    protected $dteService;

    public function __construct(DteService $dteService) {
        $this->dteService = $dteService;
    }

    public function enviar(Dte $dte) {
        $response = $this->dteService->enviarDte($dte->toArray());
        $dte->update([
            'respuesta_hacienda' => $response,
            'estado_envio' => $response['status'] ?? 'pendiente',
            'fecha_envio' => now(),
        ]);
        return response()->json($response);
    }

    public function consultar(Dte $dte) {
        $status = $this->dteService->consultarDte($dte->id);
        return response()->json($status);
    }
}


// 9️⃣ Rutas: routes/api.php
use App\Http\Controllers\Api\DteController;
use App\Http\Controllers\Api\VentaController;
use App\Http\Controllers\Api\ClienteController;

Route::apiResource('clientes', ClienteController::class);
Route::apiResource('ventas', VentaController::class);
Route::apiResource('dtes', DteController::class)->only(['show', 'update']);

Route::post('dtes/{dte}/enviar', [DteController::class, 'enviar']);
Route::get('dtes/{dte}/status', [DteController::class, 'consultar']);
