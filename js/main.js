const contenedor = document.getElementById("contenedorResultados")
const buscador = document.getElementById("inputBusqueda")
const botonBuscador = document.getElementById("btnBusqueda")

function renderizarProductos(lista) {
    contenedor.innerHTML = "" 
    if (lista.length === 0) {
        showToast ("No se encontraron coincidencias.", "#ff5f6d")
        return
    }else{
        showToast ("Coincidencias encontradas:")
        lista.forEach(producto => {
            const card = document.createElement("div")
            card.className = "cardProduct"
            card.innerHTML = `
                <img src="${producto.imagen || 'assets/img/placeholder.png'}" alt="${producto.nombre}" class="imgProducto">
                <h4>${producto.nombre}</h4>
                <p>${producto.autor}</p>
                <p>$${producto.precio.toLocaleString('es-CL')}</p>`
            contenedor.appendChild(card)
        })
    }
}

botonBuscador.onclick = () => {
    if (!contenedor) return; 
    const itemBuscado = buscador.value.toLowerCase()
    if (itemBuscado === "") {
        contenedor.innerHTML = ""
        return
    }
    const inventarioActual = JSON.parse(localStorage.getItem("inventarioCompleto"));
    
    if (!inventarioActual) {
        showToast("Error: Inventario no cargado todavía.");
        return;
    }

    //Para juntar todos los productos copiandolo con un map por categoria en un array, agregando la categoria correspondiente
    //y usando un operador de propagación para que no quede como un array de arrays y todo quede simple.
    const todosLosProductos = [
        ...inventarioActual.libros.map(p => ({...p, categoria: 'Libros'})),
        ...inventarioActual.juegosRol.map(p => ({...p, categoria: 'Juegos de Rol'})),
        ...inventarioActual.juegosMesa.map(p => ({...p, categoria: 'Juegos de Mesa'}))
    ]
    //Para asegurarse de encontrar todas las coincidencias con el termino ingresado
    const filtrados = todosLosProductos.filter(p => 
        p.nombre.toLowerCase().includes(itemBuscado.toLowerCase().trim()) ||
        p.categoria.toLowerCase().includes(itemBuscado.toLowerCase().trim()) ||
        p.autor.toLowerCase().includes(itemBuscado.toLowerCase().trim()) ||
        p.precio.toString().includes(itemBuscado.toString().trim())
    )

    renderizarProductos(filtrados)
    buscador.value = ""; 
}


