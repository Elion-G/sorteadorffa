let allCardsData = [];
let cardsData = [];
let ruletaInterval;
let numbers = Array.from({ length: 642 }, (_, i) => i + 1);
let index = 0; 
let tiempoRuleta = 5000;

function chooseRandomAndRemove() {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers.splice(randomIndex, 1)[0]; // Elimina y devuelve el número seleccionado
}

window.addEventListener('DOMContentLoaded', () => {
    // Obtener las tarjetas del servidor
    $.ajax({
        url: '/get-total-sorteo',
        type: 'GET',
        timeout: -1,
        success: function(response) {
            if (response && Array.isArray(response.sorteables) && Array.isArray(response.total)) {
                allCardsData = [...response.total];
                cardsData = [...response.sorteables];
            } else {
                alert('Formato de datos inesperado o datos incompletos.');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud:", error);
        }
    });

    window.addEventListener('keydown', (event) => {
        var mainRuleta = document.getElementById('main-ruleta');
        var mainPremios = document.getElementById('main-premios'); 
        var mainSorteado = document.getElementById('main-sorteado'); 
        var mainFondoPrincipal = document.getElementById('main-fondo-principal'); 

        if ((event.code === 'ArrowRight' || event.code === 'ArrowLeft' || event.code === 'Space')) {
            event.preventDefault();
            
            if (mainRuleta.classList.contains('d-none') && cardsData.length !== 0) {
                mainFondoPrincipal.classList.add('d-none');
                mainSorteado.classList.add('d-none');
                mainRuleta.classList.remove('d-none');
                startRuleta();
            }
        }
    });
});

function startRuleta() {
    if (allCardsData.length === 0 || numbers.length === 0) return; // Salir si no hay datos o números

    const ruletaContainer = document.querySelector('#ruleta-premios');
    const ruletaNumerosContainer = document.querySelector('#ruleta-numeros');

    const spinRuleta = () => {
        // Actualización rápida de la ruleta
        ruletaInterval = setInterval(() => {
            const currentCard = allCardsData[index];
            const randomSmallNumber = Math.floor(Math.random() * 642) + 1; // Número aleatorio temporal
            const randomImageNumber = Math.floor(Math.random() * 642) + 1; // Imagen temporal

            const numbers = [131274, 127061, 121642, 111209, 129528, 123326, 111211, 122723, 105607, 123969, 128570];

            // Función para seleccionar un número aleatorio
            function chooseRandom() {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                const randomNumber = numbers[randomIndex];

                return randomNumber;
            }

            ruletaContainer.innerHTML = `
                <img src="${'/images/' + chooseRandom() + '.jpg'}" alt="Giro">
                <div>GIRANDO...</div>
            `;
            ruletaNumerosContainer.innerHTML = `
                <h1>${randomSmallNumber}</h1>
            `;

            // Ciclar al siguiente índice
            index = (index + 1) % allCardsData.length;
        }, 110);
    };

    const stopRuleta = () => {
        clearInterval(ruletaInterval); // Detener el giro

        const currentCard = allCardsData[index];
        const winningNumber = chooseRandomAndRemove(); // Seleccionar número ganador y eliminarlo

        const numbers = [131274, 127061, 121642, 111209, 129528, 123326, 111211, 122723, 105607, 123969, 128570];

        // Función para seleccionar un número aleatorio
        function chooseRandom() {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            const randomNumber = numbers[randomIndex];

            return randomNumber;
        }

        // Mostrar el premio
        ruletaContainer.innerHTML = `
            <img src="${'/images/' + chooseRandom() + '.jpg'}" alt="Imagen de ${currentCard.descripcion}">
            <div>${currentCard.descripcion}</div>
        `;
        ruletaNumerosContainer.innerHTML = `
            <h1>${winningNumber}</h1>
        `;
    };

    // Control del ciclo: 7s giro, 5s premio, 2s giro corto
    const runCycle = () => {
        spinRuleta(); // Inicia el giro
        setTimeout(() => {
            stopRuleta(); // Detiene el giro en un premio
            tiempoRuleta = 2000;
            setTimeout(() => {
                runCycle();
            }, 5000);
        }, tiempoRuleta);
    };

    runCycle(); // Inicia el ciclo
}

// Función para iniciar la ruleta
// function startRuleta() {
//     if (allCardsData.length === 0) return; // Si no hay datos, salir

//     const ruletaContainer = document.querySelector('#ruleta-premios');
//     const ruletaNumerosContainer = document.querySelector('#ruleta-numeros');
//     let index = 0;

//     // Actualizar el contenido rápidamente
//     ruletaInterval = setInterval(() => {
//         const currentCard = allCardsData[index];
//         const numbers = [131274, 127061, 121642, 111209, 129528, 123326, 111211, 122723, 105607, 123969, 128570];

//         // Función para seleccionar un número aleatorio
//         function chooseRandom() {
//             const randomIndex = Math.floor(Math.random() * numbers.length);
//             const randomNumber = numbers[randomIndex];

//             return randomNumber;
//         }

//         // Generar número aleatorio del 1 al 642
//         const randomSmallNumber = Math.floor(Math.random() * 642) + 1;


//         let url = '/images/' + chooseRandom() + '.jpg';
//         ruletaContainer.innerHTML = `
//             <img src="${url}" alt="Imagen de ${currentCard.descripcion}">
//             <div>${currentCard.descripcion}</div>
//         `;

//         ruletaNumerosContainer.innerHTML = `
//             <h1>${randomSmallNumber}</h1>
//         `;

//         // Ciclar al siguiente índice
//         index = (index + 1) % allCardsData.length;
//     }, 110);
// }