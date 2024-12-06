<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Premios extends Model
{

    protected $table = "solopremios";

    protected $fillable = ['codigo', 'descripcion', 'sorteado'];
}
