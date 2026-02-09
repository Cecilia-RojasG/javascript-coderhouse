let cartStorage = localStorage.getItem("carroProductos")
let carroProductos = JSON.parse(cartStorage)|| []
let carroSeccion = document.getElementById ("carrito")
let descuentoPercent = 0.05

function renderCarrito (cartItems) {
    carroSeccion.innerHTML = ""
    if (cartItems.length === 0) {
        carroSeccion.innerHTML = "<p id = carritoVacio>Su carrito está vacío.</p>"
        return;
    }
    const cabecera = document.createElement("div");
    cabecera.className = "carritoItem";
    cabecera.innerHTML = `
        <span id = productoTxt>Productos</span>
        <span id = Txt>Cantidad</span>
        <span id = Txt>Unitario</span>
        <span>Subtotal</span>
    `;
    carroSeccion.appendChild(cabecera);

    let totalParcial = 0
    
    //Para llenar el carrito y calcular valores
    cartItems.forEach((producto, index) => {
        const subtotalProducto = producto.precio * producto.cantidad;
        totalParcial += subtotalProducto;
        
        const fila = document.createElement("div")
        fila.className = "carritoItem"
        fila.innerHTML = `
            <span class="prodNombre">${producto.nombre}</span>
            <div class="controlesCantidad">
                <button class="btn-cantidad minus-button"data-index="${index}"> - </button>
                <span class="counter-value"> ${producto.cantidad} </span>
                <button class="btn-cantidad plus-button"data-index="${index}"> + </button>
            </div>
            <span class="prodPrecioUnitario">* $${producto.precio.toLocaleString('es-CL')}</span>
            <span class="prodPrecioMultiplicado">$${subtotalProducto.toLocaleString('es-CL')}</span>
        `;
        carroSeccion.appendChild(fila)
    });
    
    let totalImpuestos = totalParcial * 0.19;
    let totalDescuento = totalParcial * descuentoPercent;
    let totalFinal = totalParcial - totalDescuento;

    //Botones Sumar y Restar cantidad de objetos
    document.querySelectorAll(".plus-button").forEach(btn => {
        btn.onclick = (e) => {
            const index = e.target.getAttribute("data-index");
            const prod = cartItems[index];
            // Validamos contra la existencia original
            if (prod.cantidad < prod.existencia) {
                prod.cantidad++;
                actualizarTodo();
            } else {
                mostrarAlerta("Máximo de stock alcanzado para este producto");
            }
        };
    });

    document.querySelectorAll(".minus-button").forEach(btn => {
        btn.onclick = (e) => {
            const index = e.target.getAttribute("data-index");
            if (cartItems[index].cantidad > 1) {
                cartItems[index].cantidad--;
            } else {
                // Si llega a 0 elimina el producto
                cartItems.splice(index, 1);
                mostrarAlerta("Producto eliminado del carrito");
            }
            actualizarTodo();
        };
    });

    //Para mostrar el valor parcial
    const valorParcial = document.createElement("div");
    valorParcial.className = "carritoParcial"
    valorParcial.innerHTML = `
        <hr>
        <div class="valorParcial">
            <strong>SUBTOTAL: </strong>
            <strong>$${totalParcial.toLocaleString('es-CL')}</strong>
        </div>
    `;
    carroSeccion.appendChild(valorParcial);

    //Para mostrar el impuesto
    const impuestos = document.createElement("div");
    impuestos.className = "carritoImpuestos"
    totImp = parseInt(totalImpuestos.toFixed(0))
    impuestos.innerHTML = `
        <hr>
        <div class="valorImpuestos">
            <strong>IMPUESTOS INCLUIDOS IVA(19%): </strong>
            <strong>$${totImp.toLocaleString('es-CL')}</strong>
        </div>
    `;
    carroSeccion.appendChild(impuestos);

//Para mostrar descuento
    const descuento = document.createElement("div");
    descuento.className = "carritoDescuento"
    totDes = parseInt(totalDescuento.toFixed(0))
    descuento.innerHTML = `
        <hr>
        <div class="valorDescuento">
            <strong>Descuento: </strong>
            <strong>$${totDes.toLocaleString('es-CL')}</strong>
        </div>
    `;
    carroSeccion.appendChild(descuento);

//Para calcular valor Total
    totDes = parseInt(totalDescuento.toFixed(0))
    totalFinal = (totalParcial - totDes)
    const valorTotal = document.createElement("div");
    valorTotal.className = "carritoTotal"
    valorTotal.innerHTML = `
        <hr>
        <div class="valorTotal">
            <strong>TOTAL: </strong>
            <strong>$${totalFinal.toLocaleString('es-CL')}</strong>
        </div>
    `;
    carroSeccion.appendChild(valorTotal);

    //contenedor de botones
    const contenedorBotones = document.createElement("div");
    contenedorBotones.className = "carritoBotonesAccion";
    contenedorBotones.innerHTML = `
        <button id="vaciarCarrito" class="btn-vaciar">Vaciar Carrito</button>
        <button id="pagarCarrito" class="btn-pagar">Finalizar Compra</button>
    `;
    carroSeccion.appendChild(contenedorBotones);
    
    //Para vaciar el carro 
    document.getElementById("vaciarCarrito").onclick = () => {
        if(confirm("¿Deseas vaciar el carrito?")) {
            carroProductos = [];
            localStorage.removeItem("carroProductos");
            actualizarTodo();
            mostrarAlerta("Carrito vaciado correctamente");
        }
    };
    //Para comprar el carro
    document.getElementById("pagarCarrito").onclick = () => {
        if (carroProductos.length > 0 && confirm("¿Deseas continuar con el pago?")) {
            carroProductos.forEach(itemEnCarrito => {
                const productoMaestro = productos.find(p => p.codigo === itemEnCarrito.codigo)
                if (productoMaestro) {
                    // Resta la cantidad comprada del stock real
                    productoMaestro.existencia = productoMaestro.existencia - itemEnCarrito.cantidad
                }
            })
            const nuevoInventario = { libros, juegosRol, juegosMesa };
            localStorage.setItem("inventarioCompleto", JSON.stringify(nuevoInventario));

            carroProductos = []
            localStorage.removeItem("carroProductos")
            actualizarTodo()
            mostrarAlerta("¡Compra realizada con éxito! Gracias.")
        }
    };   
}

// Función auxiliar para no repetir código
function actualizarTodo() {
    localStorage.setItem("carroProductos", JSON.stringify(carroProductos));
    renderCarrito(carroProductos);
}

renderCarrito(carroProductos);