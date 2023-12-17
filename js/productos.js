document.addEventListener('DOMContentLoaded', function() {
    fetch('../json/productos.json')
        .then(response => response.json())
        .then(data => mostrarProductos(data));
})

function mostrarProductos(productos) {
    const productContainer = document.getElementById('product-container');

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        card.innerHTML = `
            <div class="card text-center">
                <img src="${producto.img}" class="card-img-top" alt="${producto.productName}">
                <div class="card-body">
                    <h5 class="card-title">${producto.productName}<h5>
                    <p class="card-text">Precio:${producto.price}</p>
                    <button class="btn btn-primary">Añadir al Carrito</button>
                </div>
            </div>
        `;
        productContainer.appendChild(card)
    });
}
