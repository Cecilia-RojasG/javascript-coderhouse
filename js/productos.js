productsContainer = document.getElementById("contenedorDeProductos")
categoriasDeProductos = [
    {nombre: "Libros", contenido: libros}, 
    {nombre: "Juegos de Rol", contenido: juegosRol}, 
    {nombre: "Juegos de Mesa", contenido: juegosMesa}
]
let todosLosProductos = []

function renderProductos (arrayDeProductos) {
    arrayDeProductos.forEach(producto => {
        const card = document.createElement("div")
        card.className = "cardProduct"

        const hayExistencia = producto.existencia > 0
        const textoBoton = hayExistencia ? "Agregar al carrito" : "Agotado"
        const claseBoton = hayExistencia ? "productoAgregar" : "productoAgregar agotado"
        const atributoDisabled = hayExistencia ? "" : "disabled"

        card.innerHTML = `
            <img src="${producto.imagen || '../assets/img/placeholder.png'}" alt="${producto.nombre}" class="imgProducto">
            <h4>${producto.nombre}</h4>
            <p>${producto.autor}</p>
            <p>$${producto.precio.toLocaleString('es-CL')}</p>
            <button class="${claseBoton}" codigo="${producto.codigo}" ${atributoDisabled}>${textoBoton}</button>`
        productsContainer.appendChild(card)
    })
}

function renderDe (categorias){
    productsContainer.innerHTML = ""; 
    categorias.forEach(categoria => {
        const seccion = document.createElement("div")
        seccion.className = "seccionCategoria"
        const titulo = document.createElement("h3")
        titulo.innerText = categoria.nombre
        titulo.className = "tituloCategoria";
        productsContainer.appendChild(titulo);
        renderProductos(categoria.contenido);
        const filaCards = document.createElement("div");
        filaCards.className = "filaProductos";
    })
    agregarAlCarrito();
}

renderDe (categoriasDeProductos)

function agregarAlCarrito () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const codProd = parseInt(e.currentTarget.getAttribute('codigo'))
            const productoElegido = productos.find(producto => producto.codigo === codProd)
            //Revisar si el producto está en existencia
            if (productoElegido && productoElegido.existencia > 0){
                //Revisar si el producto ya está en el carrito de antemano
                const productoEnCarrito = carroProductos.find(p => p.codigo === codProd);
                if (productoEnCarrito) {
                    if (productoEnCarrito.cantidad < productoElegido.existencia) {
                        productoEnCarrito.cantidad++
                    } else {
                        return
                    }
                } else {
                    carroProductos.push({ ...productoElegido, cantidad: 1 })
                }
                localStorage.setItem("carroProductos", JSON.stringify(carroProductos))
            }
        }
    })
}

