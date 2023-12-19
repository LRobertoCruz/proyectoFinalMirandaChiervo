document.addEventListener('DOMContentLoaded', function() {
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

    console.log(cart);
    mostrarCarrito();
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
                <p>Precio: ${producto.price}</p>
                <div class="count-container">
                    <button class="btn btn-danger"> - </button>
                    <div class="quantity-container">
                        <p>${producto.quantity}</p>
                    </div>
                    <button class="btn btn-success"> + </button>
                </div>
                <button class="btn btn-danger del-btn">Del</button>
            </div>
        `;
        cartProductListElement.appendChild(cartCard);
    });
}