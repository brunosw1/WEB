$(document).ready(function() {
    let cart = [];

    function updateCart() {
        let subtotal = 0;
        let cartBody = '';

        cart.forEach((item, index) => {
            const itemSubtotal = item.quantity * item.price;
            subtotal += itemSubtotal;
            cartBody += `
                <tr>
                    <td>Producto ${index + 1}</td>
                    <td>
                        <input type="number" class="item-quantity" data-index="${index}" min="1" value="${item.quantity}">
                    </td>
                    <td>$${item.price}</td>
                    <td>$${itemSubtotal}</td>
                </tr>`;
        });

        $('#cart-body').html(cartBody);
        $('#subtotal').text(subtotal);

        const iva = (subtotal * 0.19).toFixed(2);
        const total = (subtotal + parseFloat(iva)).toFixed(2);

        $('#iva').text(iva);
        $('#total').text(total);
    }

    $('#add-to-cart').click(function() {
        const price = parseInt($('#product-price').text());
        const quantity = parseInt($('#quantity').val());

        cart.push({ price, quantity });
        updateCart();
    });

    $(document).on('input', '.item-quantity', function() {
        const index = $(this).data('index');
        const newQuantity = parseInt($(this).val());

        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            updateCart();
        }
    });

    
});