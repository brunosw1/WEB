// Función para mostrar los productos del carrito en la página de carrito
function showCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    // Limpiar contenido anterior
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
      cart.forEach(comic => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <h5>${comic.titulo}</h5>
          <p>Precio: ${comic.precio}</p>
          <button class="btn btn-danger remove-from-cart" data-titulo="${comic.titulo}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
    }
  }

  // Evento para eliminar cómic del carrito
  document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-from-cart')) {
      const comicTitulo = event.target.getAttribute('data-titulo');
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Filtrar el carrito para eliminar el cómic
      cart = cart.filter(comic => comic.titulo !== comicTitulo);

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Volver a mostrar el carrito actualizado
      showCart();
    }
  });

  // Inicializar la vista del carrito cuando se carga la página
  window.onload = function () {
    showCart();
  };