let cart = [];

// Función para agregar productos al carrito
function addToCart(product) {
    // Verificamos si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        cart[existingProductIndex].quantity++;
    } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        cart.push({ ...product, quantity: 1 });
    }
    updateCart(); // Actualizamos el carrito después de agregar el producto
}

// Función para actualizar el carrito en el HTML
function updateCart() {
    // Actualizar los items del carrito
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Limpiar los elementos actuales

    let subtotal = 0;
    cart.forEach((item) => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${item.title} - $${item.price} x ${item.quantity} = $${itemSubtotal.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
    });

    // Calcular IVA y total
    const iva = (subtotal * 0.19).toFixed(2); // IVA al 19%
    const total = (subtotal + parseFloat(iva)).toFixed(2);

    // Actualizar los valores en el HTML
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('iva').textContent = iva;
    document.getElementById('total').textContent = total;
}

