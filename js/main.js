const contenedor = document.getElementById("contenedorResultados")
const buscador = document.getElementById("inputBusqueda")
const botonBuscador = document.getElementById("btnBusqueda")

botonBuscador.onclick = () => {
    if (!contenedor) return 
    contenedor.innerHTML = ""

    const itemBuscado = buscador.value.toLowerCase().trim()
    if (itemBuscado === "") {
        contenedor.innerHTML = ""
        return
    }
    const inventarioActual = JSON.parse(localStorage.getItem("inventarioCompleto"));
    
    if (!inventarioActual) {
        showToast("Error: Inventario no cargado todavía.", "#ff5f6d")
        return
    }

    //Para juntar todos los productos copiandolo con un map por categoria en un array, agregando la categoria correspondiente
    //y usando un operador de propagación para que no quede como un array de arrays y todo quede simple.
    const todosLosProductos = [
        ...inventarioActual.libros.map(p => ({...p, categoria: 'Libros'})),
        ...inventarioActual.juegosRol.map(p => ({...p, categoria: 'Juegos de Rol'})),
        ...inventarioActual.juegosMesa.map(p => ({...p, categoria: 'Juegos de Mesa'}))
    ]
    //Para asegurarse de encontrar todas las coincidencias con el termino ingresado
    const filtrados = todosLosProductos.filter(p => {
        const nombre = p.nombre.toLowerCase()
        const autor = (p.autor || "").toLowerCase()
        const categoria = p.categoria.toLowerCase()
        const precio = p.precio.toString()

        return (
            nombre.includes(itemBuscado) || 
            autor.includes(itemBuscado) || 
            categoria.includes(itemBuscado) || 
            precio.includes(itemBuscado)
        );
})
    if (filtrados.length === 0) {
        showToast("No se encontraron coincidencias", "#833737")
    } else {
        showToast("Productos encontrados")
        renderProductos(filtrados, contenedor)
        agregarAlCarrito()
    }
    buscador.value = ""; 
}


