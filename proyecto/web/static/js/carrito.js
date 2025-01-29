// Función para actualizar el carrito visualmente
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // Actualiza el contador de productos en el carrito
  }

  // Evento de añadir al carrito
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Prevenir que el enlace navegue a otro lado

      const comicTitulo = this.getAttribute('data-titulo');
      const comicPrecio = this.getAttribute('data-precio');

      const comic = {
        titulo: comicTitulo,
        precio: comicPrecio
      };

      // Obtener el carrito del localStorage o crear uno vacío
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Verificar si el cómic ya está en el carrito
      const existingComic = cart.find(item => item.titulo === comic.titulo);

      if (!existingComic) {
        // Si no existe, añadir el cómic al carrito
        cart.push(comic);
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Actualizar el contador del carrito
      updateCart();
    });
  });

  // Inicializar el contador del carrito cuando se carga la página
  window.onload = function () {
    updateCart();
  };


