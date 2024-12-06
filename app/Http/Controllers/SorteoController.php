<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SorteoController extends Controller
{
    public function getComunes(){
        return view('premios');
    }
}
