<?php

namespace App\Http\Controllers;

use App\Models\Premios;
use App\Models\Sorteo;
use Illuminate\Http\Request;

class SorteoController extends Controller
{
    public function getComunes(){
        return view('premios');
    }
    
    public function getTotalSorteos()
    {
        $sorteables = Sorteo::where('updated_at', null)->get();
        $total = Sorteo::inRandomOrder()->get();

        return response()->json([
            'sorteables' => $sorteables,
            'total' => $total,
        ]);
    }
}
