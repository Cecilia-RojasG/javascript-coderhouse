const URL_LIBROS = "../db/libros.json"
const URL_ROL = "../db/rol.json"
const URL_MESA = "../db/mesa.json"
const placeholder = "../assets/img/placeholder.png"

let inventarioGuardado = JSON.parse(localStorage.getItem("inventarioCompleto"))

let libros = []
let juegosRol = []
let juegosMesa = []
let productos = []
let carroProductos = JSON.parse(localStorage.getItem("carroProductos")) || []
productsContainer = document.getElementById("contenedorDeProductos")

function cargarInventario(){
    if (productsContainer) {
        // si un link a una imagen se rompe o no la imagen no esta
        productsContainer.addEventListener('error', function(event) {
            if (event.target.tagName === 'IMG') {
                // para evitar un bucle
                if (event.target.src !== placeholder) {
                    event.target.src = placeholder
                }
            }
        }, true); 
    }
    
    if (inventarioGuardado) {
        // Si hay datos anteriores, actualiza el inventario
        libros = inventarioGuardado.libros
        juegosRol = inventarioGuardado.juegosRol
        juegosMesa = inventarioGuardado.juegosMesa
        //Para que quede en un solo array
        productos = [...libros, ...juegosRol, ...juegosMesa]
        // Si hay datos anteriores, renderiza, solo si esta en la pagina productos
        if (productsContainer) prepararCategoriasYRenderizar()
    } else {
        // Si no hay LocalStorage, cargar por fetch
        fetch(URL_LIBROS)
            .then(res => res.json())
            .then(dataLibros => {
                libros = dataLibros
                return fetch(URL_ROL) 
            })
            .then(res => res.json())
            .then(dataRol => {
                juegosRol = dataRol
                return fetch(URL_MESA)
            })
            .then(res => res.json())
            .then(dataMesa => {
                juegosMesa = dataMesa

                //Guardar en localStorage para otra vez
                const inventarioParaGuardar = { libros, juegosRol, juegosMesa }
                localStorage.setItem("inventarioCompleto", JSON.stringify(inventarioParaGuardar))
                 //Para que quede en un solo array
                productos = [...libros, ...juegosRol, ...juegosMesa]
                // renderiza si el contenedor existe
                if (productsContainer) prepararCategoriasYRenderizar();
            })
            .catch(error => {
                showToast(("Error al cargar los datos", "#ff5f6d"), error)
            })
            .finally(() => {
                showToast("Proceso de carga finalizado")
            });
    }
}

function prepararCategoriasYRenderizar() {
    categoriasDeProductos = [
        {nombre: "Libros", contenido: libros}, 
        {nombre: "Juegos de Rol", contenido: juegosRol}, 
        {nombre: "Juegos de Mesa", contenido: juegosMesa}
    ]
    renderDe(categoriasDeProductos)
}

function renderProductos (arrayDeProductos, contenedorSeccion) {
    arrayDeProductos.forEach(producto => {
        const card = document.createElement("div")
        card.className = "cardProduct"

        const hayExistencia = producto.existencia > 0
        const textoBoton = hayExistencia ? "Agregar al carrito" : "Agotado"
        const claseBoton = hayExistencia ? "productoAgregar" : "productoAgregar agotado"
        const atributoDisabled = hayExistencia ? "" : "disabled"

        card.innerHTML = `
            <img src="${producto.imagen || placeholder}" alt="${producto.nombre}" class="imgProducto">
            <h4>${producto.nombre}</h4>
            <p>${producto.autor}</p>
            <p>$${producto.precio.toLocaleString('es-CL')}</p>
            <button class="${claseBoton}" codigo="${producto.codigo}" ${atributoDisabled}>${textoBoton}</button>`
        
        contenedorSeccion.appendChild(card)
    })
}

function renderDe (categorias){
    if (!productsContainer) return; 
    
    productsContainer.innerHTML = ""; 
    categorias.forEach(categoria => {
        const titulo = document.createElement("h3")
        titulo.innerText = categoria.nombre
        titulo.className = "tituloCategoria"
        productsContainer.appendChild(titulo)

        const filaCards = document.createElement("div")
        filaCards.className = "filaProductos"
        productsContainer.appendChild(filaCards)

        renderProductos(categoria.contenido, filaCards)
    })
    agregarAlCarrito()
}

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
                showToast(`Producto añadido: ${productoElegido.nombre}`);
            }
        }
    })
}

cargarInventario()

