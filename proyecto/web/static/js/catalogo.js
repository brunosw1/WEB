let cart = []; // Declarar el carrito fuera de la función fetch para que sea accesible

// Función para agregar un cómic al carrito
function addToCart(index, data) {
    const comic = data.comics[index]; // Accede a los cómics en el array 'data'
    cart.push(comic); // Añadir el cómic al carrito
    updateCart(); // Actualizar el carrito en la interfaz
}

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');
    
    // Limpiar el contenedor del carrito
    cartItemsContainer.innerHTML = '';

    // Mostrar los cómics en el carrito
    cart.forEach((comic, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${comic.title} - $${comic.price}`;
        cartItemsContainer.appendChild(listItem);
    });

    // Calcular el total
    const total = cart.reduce((sum, comic) => {
        // Extraer el número de la cadena del precio
        const price = extractNumberFromPrice(comic.price);
        return sum + price;
    }, 0);

    // Calcular el IVA (por ejemplo, 21%)
    const ivaPercentage = 0.21;
    const ivaAmount = total * ivaPercentage;
    const totalWithIva = total + ivaAmount;

    // Mostrar el total con IVA
    totalPriceContainer.textContent = `${totalWithIva.toFixed(2)} (IVA: $${ivaAmount.toFixed(2)})`;
}

// Función para extraer el número de una cadena que contiene el símbolo '$'
function extractNumberFromPrice(priceStr) {
    // Eliminar el símbolo '$' y convertir el valor a un número
    const priceNumber = parseFloat(priceStr.replace('$', '').trim());
    return isNaN(priceNumber) ? 0 : priceNumber; // Retorna 0 si no es un número válido
}

fetch('https://cors-anywhere.herokuapp.com/https://api.shortboxed.com/comics/v1/new', {
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Verifica los datos
        if (data.comics && data.comics.length > 0) {
            const cardsContainer = document.getElementById('cardsContainer');
            const paginationContainer = document.getElementById('paginationContainer');
            const clearCartButton = document.getElementById('clearCart');
            const itemsPerPage = 10; // Tarjetas por página
            const totalItems = data.comics.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage); // Número total de páginas

            // Mostrar los cómics en la página actual
            function showPage(page) {
                cardsContainer.innerHTML = '';

                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

                for (let i = startIndex; i < endIndex; i++) {
                    const comic = data.comics[i];

                    const card = document.createElement('div');
                    card.classList.add('col-md-2', 'col-6');
                    card.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${comic.title}</h5>
                                <p class="card-text">${comic.description}</p>
                                <p class="card-text">${comic.price}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="addButton${i}">Añadir</button>
                            </div>
                        </div>
                    `;
                    cardsContainer.appendChild(card);

                    // Agregar el evento de click al botón "Añadir"
                    document.getElementById(`addButton${i}`).addEventListener('click', () => {
                        addToCart(i, data); // Pasar 'data' a la función addToCart
                    });
                }
            }

            // Limpiar el carrito
            clearCartButton.addEventListener('click', () => {
                cart = []; // Limpiar el carrito
                updateCart(); // Actualizar el carrito
            });

            // Generar la paginación
            function generatePagination() {
                paginationContainer.innerHTML = '';

                for (let i = 1; i <= totalPages; i++) {
                    const pageItem = document.createElement('li');
                    pageItem.classList.add('page-item');

                    const pageLink = document.createElement('a');
                    pageLink.classList.add('page-link');
                    pageLink.href = '#';
                    pageLink.textContent = i;

                    pageLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        showPage(i);
                    });

                    pageItem.appendChild(pageLink);
                    paginationContainer.appendChild(pageItem);
                }
            }

            // Mostrar la primera página y generar la paginación
            showPage(1);
            generatePagination();
        } else {
            cardsContainer.innerHTML = '<p>No se encontraron cómics disponibles.</p>';
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
        document.getElementById('cardsContainer').innerHTML = '<p>Error al cargar los datos.</p>';
    });
