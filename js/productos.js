document.addEventListener('DOMContentLoaded', function() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart.push(...storedCart);
        mostrarCarrito();
        calcularTotal();
        contarProductos();
    }

    const btnBuy = document.getElementById('btn-buy');
    btnBuy.addEventListener('click', finalizarCompra);

    fetch('../json/productos.json')
        .then(response => response.json())
        .then(data => mostrarProductos(data))
        .catch(error => console.error(`Error al cargar el JSON: ${error}`));
});

const cart = [];

function mostrarProductos(productos) {
    const productContainerElement = document.getElementById('product-container');

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        card.innerHTML = `
            <div class="card text-center">
                <img src="${producto.img}" class="card-img-top" alt="${producto.productName}">
                <div class="card-body">
                    <h5 class="card-title">${producto.productName}</h5>
                    <p class="card-text">Precio:${producto.price}</p>
                    <button class="btn btn-primary" onClick="addToCart('${producto.productId}', '${producto.productName}', '${producto.price}', '${producto.img}')">Añadir al Carrito</button>
                </div>
            </div>
        `;
        productContainerElement.appendChild(card)
    });
}

function addToCart(productId, productName, price, img) {
    const existingProduct = cart.find(item => item.productId === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            productId,
            productName,
            price,
            img,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(cart);
    mostrarCarrito();
    calcularTotal();
    contarProductos();
}

function mostrarCarrito() {
    const cartProductListElement = document.getElementById('cart-list');

    cartProductListElement.innerHTML = '';

    cart.forEach(producto => {
        const cartCard = document.createElement('div');
        cartCard.classList.add('mb-4');

        cartCard.innerHTML = `
            <div class="cart-card">
                <div class="img-cart-container">
                    <img src="${producto.img}" alt="${producto.productName}" class="img-card">
                </div>
                <p>Producto: ${producto.productName}</p>
                <p>Precio: $${producto.price}</p>
                <div class="count-container">
                    <button class="btn btn-danger" onclick="decrementarCantidad('${producto.productId}')"> - </button>
                    <div class="quantity-container">
                        <p id="quantity-${producto.productId}">${producto.quantity}</p>
                    </div>
                    <button class="btn btn-success" onclick="incrementarCantidad('${producto.productId}')"> + </button>
                </div>
                <button class="btn btn-danger del-btn" onclick="eliminarProducto('${producto.productId}')">Del</button>
            </div>
        `;
        cartProductListElement.appendChild(cartCard);
    });
}

function eliminarProducto(productId) {
    const productIndex = cart.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        mostrarCarrito();
        calcularTotal();
        contarProductos();
    }
}

function decrementarCantidad(productId) {
    const productIndex = cart.findIndex(item => item.productId === productId);

    if (productIndex !== -1 && cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--;
        const quantityElement = document.getElementById(`quantity-${productId}`);
        if (quantityElement) {
            quantityElement.textContent = cart[productIndex].quantity;
        }
        calcularTotal();
        contarProductos();
    }
}

function incrementarCantidad(productId) {
    const productIndex = cart.findIndex(item => item.productId === productId);

    if (productIndex !== -1) {
        cart[productIndex].quantity++;
        const quantityElement = document.getElementById(`quantity-${productId}`);
        if (quantityElement) {
            quantityElement.textContent = cart[productIndex].quantity;
        }
        calcularTotal();
        contarProductos();
    }
}

function calcularTotal() {
    const totalPayElement = document.getElementById('total-pay');
    let total = 0;
    
    cart.forEach(producto => {
        total += producto.quantity * parseFloat(producto.price); // Convierte el precio a número
    });

    totalPayElement.textContent = `$${total.toFixed(2)}`;
}

function contarProductos() {
    const totalProductsElement = document.getElementById('quantity-products');
    let totalProducts = 0;

    cart.forEach(producto => {
        totalProducts += producto.quantity;
    });

    totalProductsElement.textContent = totalProducts;
}

function finalizarCompra() {
    const totalProductsElement = document.getElementById('quantity-products');
    const totalProducts = parseInt(totalProductsElement.textContent);

    if (totalProducts === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos en el carrito. Agrega productos antes de finalizar la compra.'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Compra finalizada!',
            text: `Total de productos: ${totalProducts}`
        });
        cart.length = 0;
        mostrarCarrito();
        calcularTotal();
        contarProductos();
    }
}
