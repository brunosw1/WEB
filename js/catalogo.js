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
            const itemsPerPage = 10; // Tarjetas por página
            const totalItems = data.comics.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage); // Número total de páginas

            // Función para mostrar las tarjetas de una página específica
            function showPage(page) {
                // Limpiar el contenedor de tarjetas
                cardsContainer.innerHTML = '';

                // Calcular el índice de inicio y fin para las tarjetas de la página actual
                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

                // Mostrar las tarjetas correspondientes a la página
                for (let i = startIndex; i < endIndex; i++) {
                    const comic = data.comics[i];

                    // Crear el div de la tarjeta
                    const card = document.createElement('div');
                    card.classList.add('col-md-2', 'col-6');
                    card.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${comic.title}</h5>
                                <p class="card-text">${comic.description}</p>
                                <p class="card-text">${comic.price}</p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Añadir</button>
                            </div>
                        </div>
                    `;
                    cardsContainer.appendChild(card);
                }
            }

            
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
