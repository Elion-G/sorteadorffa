<?php

namespace App\Http\Controllers;

use App\Models\Premios;
use Illuminate\Http\Request;

class PremiosController extends Controller
{
    public function getPremios(){
        return view('welcome');
    }

    public function getTotalPremios()
    {
        $sorteables = Premios::where('sorteado', 0)->get();
        $total = Premios::all();

        return response()->json([
            'sorteables' => $sorteables,
            'total' => $total,
        ]);
    }

    public function registrarSorteado(Request $request){

        try {
            $id = $request->input('id');

            $premio = Premios::findOrFail($id);

            $premio->sorteado = 1;
            $premio->save();

            return response()->json('Registrado correctamente!!');
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }

    }
}
