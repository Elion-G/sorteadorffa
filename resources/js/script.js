let allCardsData = [];
let cardsData = [];
let currentCardIndex = 0;
let intervalId = null;
let allCardsDisplayed = false;
let ruletaInterval;
let canStopRuleta = false;
let canStartRuleta = true;

window.addEventListener('DOMContentLoaded', () => {
    // Obtener las tarjetas del servidor
    $.ajax({
        url: '/get-total-premios',
        type: 'GET',
        timeout: -1,
        success: function(response) {
            if (response && Array.isArray(response.sorteables) && Array.isArray(response.total)) {
                allCardsData = [...response.total];
                cardsData = [...response.sorteables];
                startRuleta();
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
            if (!mainRuleta.classList.contains('d-none') && cardsData.length !== 0) {
                if (canStopRuleta) {
                    mainRuleta.classList.add('d-none');
                    mainSorteado.classList.remove('d-none');
                    showRandomCard();
                }
            } else if (!allCardsDisplayed && intervalId === null) {
                mainFondoPrincipal.classList.add('d-none');
                showAllCards();
            } else if (allCardsDisplayed && cardsData.length !== 0 && canStartRuleta) {
                mainPremios.classList.add('d-none');
                mainSorteado.classList.add('d-none');
                mainRuleta.classList.remove('d-none');
                canStopRuleta = false;
                setTimeout(() => {
                    canStopRuleta = true;
                }, 1000);
            } else if (allCardsDisplayed && cardsData.length === 0) {
                mainPremios.classList.add('d-none');
                mainSorteado.classList.add('d-none');
                mainRuleta.classList.add('d-none');
                mainFondoPrincipal.classList.remove('d-none');
            }
        }
    });
});

function showAllCards() {
    if (allCardsData.length === 0) return;

    const cardContainer = document.querySelector('#card-container');

    // Configurar un intervalo para mostrar una tarjeta cada 1.5 segundos
    intervalId = setInterval(() => {
        if (currentCardIndex >= allCardsData.length) {
            clearInterval(intervalId);
            intervalId = null;
            allCardsDisplayed = true;
            return;
        }

        // Crear la tarjeta actual
        const element = allCardsData[currentCardIndex];
        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'col mb-1 card-wrapper';

        const card = document.createElement('div');
        if (element.sorteado === 1) {
            card.className = 'card h-100 red-card';
        } else {
            card.className = 'card h-100';
        }
        
        card.style.width = '100%';

        const img = document.createElement('img');
        console.log(element.sorteado);
        
        if (element.sorteado === 1) {
            img.className = 'card-img-top grayscale';
        } else {
            img.className = 'card-img-top';
        }
        
        img.src = '/images/' + element.codigo + '.jpg';
        img.alt = `Imagen de ${element.descripcion}`;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = element.descripcion;

        // Ensamblar la tarjeta
        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardWrapper.appendChild(card);

        // Agregar la tarjeta al contenedor
        cardContainer.appendChild(cardWrapper);

        // Activar la animación de visibilidad
        setTimeout(() => {
            cardWrapper.classList.add('visible');
        }, 100);

        currentCardIndex++;
    }, 500);
}

// Función para mostrar un premio al azar
function showRandomCard() {
    if (cardsData.length === 0) {
        return;
    }

    canStartRuleta = false;
    setTimeout(() => {
        canStartRuleta = true;
    }, 5000);

    // Seleccionar un premio al azar
    const randomIndex = Math.floor(Math.random() * cardsData.length);
    const randomElement = cardsData[randomIndex];
    const cardContainer = document.getElementById('premio-sorteado');

    // Limpiar contenido previo
    cardContainer.innerHTML = '';
    let url = '/images/' + randomElement.codigo + '.jpg';

    // Mostrar el premio en pantalla
    cardContainer.innerHTML = `
        <img src="${url}" alt="Imagen de ${randomElement.descripcion}">
        <div>${randomElement.descripcion}</div>
    `;

    // Enviar el ID del premio a la base de datos
    $.ajax({
        url: '/registrar-sorteado',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: { id: randomElement.id },
        success: function(response) {
            console.log("Premio registrado:", response);
        },
        error: function(xhr, status, error) {
            console.error("Error al registrar el premio:", xhr);
        }
    });

    // Eliminar el premio de la lista
    cardsData.splice(randomIndex, 1);
}

// Función para iniciar la ruleta
function startRuleta() {
    if (allCardsData.length === 0) return; // Si no hay datos, salir

    const ruletaContainer = document.querySelector('#ruleta-premios');
    let index = 0;

    // Actualizar el contenido rápidamente
    ruletaInterval = setInterval(() => {
        const currentCard = allCardsData[index];
        let url = '/images/' + currentCard.codigo + '.jpg';
        ruletaContainer.innerHTML = `
            <img src="${url}" alt="Imagen de ${currentCard.descripcion}">
            <div>${currentCard.descripcion}</div>
        `;

        // Ciclar al siguiente índice
        index = (index + 1) % allCardsData.length;
    }, 110);
}