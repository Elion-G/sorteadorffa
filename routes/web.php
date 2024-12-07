<?php

use App\Http\Controllers\PremiosController;
use App\Http\Controllers\SorteoController;
use Illuminate\Support\Facades\Route;

Route::get('/especiales', [PremiosController::class, 'getPremios']);
Route::get('/get-faltantes-premios', [PremiosController::class, 'getTotalPremios']);
Route::get('/get-total-premios', [PremiosController::class, 'getTotalPremios']);
Route::post('/registrar-sorteado', [PremiosController::class, 'registrarSorteado']);

Route::get('/comunes', [SorteoController::class, 'getComunes']);
Route::get('/get-total-sorteo', [SorteoController::class, 'getTotalSorteos']);