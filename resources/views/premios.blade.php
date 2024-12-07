<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Sorteador</title>

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/sorteo.css', 'resources/css/bootstrap.min.css', 'resources/js/sorteo.js', 'resources/js/jquery-3.7.1.min.js'])
        @endif

        <style>
            .card-wrapper {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
        
            .card-wrapper.visible {
                opacity: 1;
                transform: translateY(0);
            }

            #ruleta-premios {
                font-family: Arial, sans-serif;
                font-size: 30px;
                font-weight: bold;
                border-radius: 10px;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            #ruleta-premios img {
                max-width: 100%;
                max-height: 80%;
            }

            #premio-sorteado {
                font-family: Arial, sans-serif;
                font-size: 30px;
                font-weight: bold;
                border-radius: 10px;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            #premio-sorteado img {
                max-width: 100%;
                max-height: 80%;
            }

            .red-card {
                background-color: red;
            }

            .grayscale {
                filter: grayscale(100%); /* Aplica blanco y negro */
            }
        </style>
    </head>
    <body>
        <div id="main-fondo-principal" class="main min-vh-100 text-center align-items-center align-content-center" style="background-image: url('{{ asset('img/fondo_vertical.jpg') }}');">
            <img src="{{ asset('img/logo_nissei.png') }}" alt="">
        </div>

        <div id="main-ruleta" class="main row d-none">
            <div id="ruleta-premios" class="col-md-6 col-lg-6 text-center">
            </div>
            <div class="col-md-6 col-lg-6 main d-flex justify-content-center align-items-center vh-100">
                <div id="ruleta-numeros" class="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center">
                    <h1>001</h1>
                </div>
            </div>
        </div>

        <div id="main-sorteado" class="main d-none">
            <div id="premio-sorteado" class="col-md-6 col-lg-6 text-center">
            </div>
            <div class="col-md-6 col-lg-6 main d-flex justify-content-center align-items-center vh-100">
                <div id="numero-sorteado" class="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center">
                    <h1>001</h1>
                </div>
            </div>
        </div>
    </body>
</html>
