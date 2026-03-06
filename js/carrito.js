let cartStorage = localStorage.getItem("carroProductos")
let carroProductos = JSON.parse(cartStorage)|| []
let carroSeccion = document.getElementById ("carrito")
let descuentoPercent = 0.05
let costoEnvio = 0
const costoEstandar = 3500

function renderCarrito (cartItems) {
    if (!carroSeccion) return
        carroSeccion.innerHTML = ""
    if (cartItems.length === 0) {
        carroSeccion.innerHTML = "<p id = carritoVacio>Su carrito está vacío.</p>"
        volverComprar()
        return;
    }
    const cabecera = document.createElement("div")
    cabecera.className = "carritoItem"
    cabecera.innerHTML = `
        <span id = productoTxt>Productos</span>
        <span id = Txt>Cantidad</span>
        <span id = Txt>Unitario</span>
        <span>Subtotal</span>
    `;
    carroSeccion.appendChild(cabecera)
    
    let totalParcial = 0
    
    //Para llenar el carrito y calcular valores
    cartItems.forEach((producto, index) => {
        const subtotalProducto = producto.precio * producto.cantidad;
        totalParcial += subtotalProducto
        
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
    
    let totalImpuestos = totalParcial * 0.19
    let totalDescuento = totalParcial * descuentoPercent
    let totalFinal = totalParcial - totalDescuento

    //Botones Sumar y Restar cantidad de objetos
    document.querySelectorAll(".plus-button").forEach(btn => {
        btn.onclick = (e) => {
            const index = e.target.getAttribute("data-index")
            const prod = cartItems[index]
            // Validar contra la existencia original
            if (prod.cantidad < prod.existencia) {
                prod.cantidad++
                actualizarTodo()
            } else {
                showToast ("Máximo de stock alcanzado", "#f39c12")
            }
        };
    });

    document.querySelectorAll(".minus-button").forEach(btn => {
        btn.onclick = (e) => {
            const index = e.target.getAttribute("data-index")
            if (cartItems[index].cantidad > 1) {
                cartItems[index].cantidad--
            } else {
                //Para evitar que se elimine el producto sorpresivamente o por error
                pedirConfirmacion("¿Quitar este producto?", () => {
                    cartItems.splice(index, 1)
                    showToast ("Producto eliminado del carrito")
                    actualizarTodo()
                })
                return;
            }
            actualizarTodo()
        };
    });
    
    //Para mostrar el valor parcial
    const valorParcial = document.createElement("div")
    valorParcial.className = "carritoParcial"
    valorParcial.innerHTML = `
        <hr>
        <div class="valorParcial">
            <strong>SUBTOTAL: </strong>
            <strong>$${totalParcial.toLocaleString('es-CL')}</strong>
        </div>
    `;
    carroSeccion.appendChild(valorParcial)

    //Para mostrar el impuesto
    const impuestos = document.createElement("div")
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
    const descuento = document.createElement("div")
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

    // --- SECCIÓN DE ENVÍO ---
    const seccionEnvio = document.createElement("div")
    seccionEnvio.className = "carritoEnvio"
    let mostrarPrecioEnvio = costoEnvio > 0 ? `<strong>$${costoEstandar.toLocaleString('es-CL')}</strong>` : "";

    seccionEnvio.innerHTML = `
        <hr>
        <div class="valorParcial">
            <label style="cursor:pointer;">
                <input type="checkbox" id="checkEnvio" ${costoEnvio > 0 ? "checked" : ""}> 
                ¿Desea envío a domicilio?, (Valor Estandard $3.500)
            </label>
            ${mostrarPrecioEnvio}
        </div>
        <div id="datosEnvio" style="display: ${costoEnvio > 0 ? "block" : "none"}; margin-top: 10px;">
            <strong>NOMBRE: </strong><input type="text" id="nombreCliente" placeholder="Nombre de quien recibe" style="width: 100%; margin-bottom: 5px;">
            <strong>DIRECCIÓN: </strong><input type="text" id="direccionCliente" placeholder="Dirección de entrega (Calle, Número, Comuna)" style="width: 100%;">
        </div>
    `;
    carroSeccion.appendChild(seccionEnvio)

    // Checkbox
    document.getElementById("checkEnvio").onchange = (e) => {
        if (e.target.checked) {
            costoEnvio = costoEstandar;
        } else {
            costoEnvio = 0;
        }
        renderCarrito(cartItems); 
    };

    // --- SECCIÓN DOCUMENTO (Boleta/Factura) ---
    const seccionDocumento = document.createElement("div")
    seccionDocumento.className = "carritoDocumento"
    seccionDocumento.innerHTML = `
        <hr>
        <div class="tipoDoc">
            <label><input type="radio" name="tipoDoc" value="boleta" checked> Boleta</label>
            <label><input type="radio" name="tipoDoc" value="factura"> Factura</label>
        </div>
        <div id="datosFactura" style="display: none; margin-top: 10px; font-size: 0.9em;">
            <strong>RUT: </strong><input type="text" id="rutFactura" placeholder="RUT (12.345.678-9)" style="width: 100%; margin-bottom: 5px;">
            <strong>GIRO: </strong><input type="text" id="giroFactura" placeholder="Giro Comercial" style="width: 100%;">
        </div>
    `;
    carroSeccion.appendChild(seccionDocumento);
    // Si se elige factura se muestra los datos de factura
    const radioFactura = seccionDocumento.querySelectorAll('input[name="tipoDoc"]');
    radioFactura.forEach(radio => {
        radio.onchange = (e) => {
            const panel = document.getElementById("datosFactura");
            panel.style.display = e.target.value === "factura" ? "block" : "none";
        }
    })

    //Para calcular valor Total
    totDes = parseInt(totalDescuento.toFixed(0))
    totalFinal = (totalParcial - totDes)
    const totalFinalConEnvio = (totalParcial - totDes) + costoEnvio;
    const valorTotal = document.createElement("div")
    valorTotal.className = "carritoTotal"
    valorTotal.innerHTML = `
        <hr>
        <div class="valorTotal">
            <strong>TOTAL: </strong>
            <strong>$${totalFinalConEnvio.toLocaleString('es-CL')}</strong>
        </div>
    `;
    carroSeccion.appendChild(valorTotal);

    //contenedor de botones
    const contenedorBotones = document.createElement("div")
    contenedorBotones.className = "carritoBotonesAccion"
    contenedorBotones.innerHTML = `
        <button id="vaciarCarrito" class="btn-vaciar">Vaciar Carrito</button>
        <button id="pagarCarrito" class="btn-pagar">Finalizar Compra</button>
    `;
    carroSeccion.appendChild(contenedorBotones);  

    //Para vaciar el carro 
    document.getElementById("vaciarCarrito").onclick = () => {
        pedirConfirmacion("¿Deseas vaciar el carrito?", () => {
            carroProductos = []
            localStorage.removeItem("carroProductos")
            actualizarTodo()
            showToast ("Carrito vaciado correctamente")
        })
    }

    //Para comprar el carro
    document.getElementById("pagarCarrito").onclick = () => {
        if (carroProductos.length > 0) {
            const tipoDocSeleccionado = document.querySelector('input[name="tipoDoc"]:checked').value;
            pedirConfirmacion("¿Deseas continuar con el pago?", () => {
                const subtotal = carroProductos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0)
                const descuento = parseInt((subtotal * descuentoPercent).toFixed(0))
                const totalFinalBoleta = (subtotal - descuento) + costoEnvio;
                // Lista de productos del carrito
                let listaProductos = ""
                carroProductos.forEach(p => {
                    listaProductos += `${p.nombre} (x${p.cantidad}) - $${(p.precio * p.cantidad).toLocaleString('es-CL')}\n`
                });
                // Para descontar los productos comprados del inventario completo
                const inv = JSON.parse(localStorage.getItem("inventarioCompleto"))
                if (!inv) return;

                // Busca en cada categoría del objeto original para que quede el cambio al comprar
                carroProductos.forEach(itemEnCarrito => {
                    let encontrado = inv.libros.find(p => p.codigo === itemEnCarrito.codigo) ||
                                    inv.juegosRol.find(p => p.codigo === itemEnCarrito.codigo) ||
                                    inv.juegosMesa.find(p => p.codigo === itemEnCarrito.codigo);
                    
                    if (encontrado) {
                        encontrado.existencia -= itemEnCarrito.cantidad;
                    }
                });
                // Guarda el objeto inv que ya tiene los valores restados
                localStorage.setItem("inventarioCompleto", JSON.stringify(inv))

                // En caso de que se marque la opcion de envio, debe pedir datos
                const deseaEnvio = document.getElementById("checkEnvio").checked;
                let datosEntregaHtml = "";
                if (deseaEnvio) {
                    const nombre = document.getElementById("nombreCliente").value || "No especificado";
                    const direccion = document.getElementById("direccionCliente").value || "No especificada";
                    datosEntregaHtml = `
                        <p><strong>DATOS DE ENVÍO:</strong><br>
                        Destinatario: ${nombre}<br>
                        Dirección: ${direccion}</p>
                    `;
                }

                // Mostrar la boleta o la factura al final usando SweetAlert2
                let encabezadoDoc = "BOLETA ELECTRÓNICA"
                let infoAdicional = ""
                //Si se elige factura
                if (tipoDocSeleccionado === "factura") {
                    const rut = document.getElementById("rutFactura").value || "No ingresado";
                    const giro = document.getElementById("giroFactura").value || "No ingresado";
                    encabezadoDoc = "FACTURA ELECTRÓNICA";
                    infoAdicional = `
                        <p><strong>DATOS FACTURACIÓN:</strong><br>
                        RUT: ${rut}<br>
                        GIRO: ${giro}</p>
                    `;
                }
                Swal.fire({
                    title: `${encabezadoDoc}`,
                    html: `<div style="text-align: left; font-family: monospace;">
                            <p>--------------------------------</p>
                            ${infoAdicional} 
                            ${datosEntregaHtml}
                            <p>--------------------------------</p>
                            <p>${listaProductos.replace(/\n/g, '<br>')}</p>
                            <p>--------------------------------</p>
                            <p>Subtotal: $${subtotal.toLocaleString('es-CL')}</p>
                            <p>Descuento (5%): -$${descuento.toLocaleString('es-CL')}</p>
                            <p>Envío: $${costoEnvio.toLocaleString('es-CL')}</p>
                            <p><strong>TOTAL PAGADO: $${totalFinalBoleta.toLocaleString('es-CL')}</strong></p>
                            <p>--------------------------------</p>
                            <p style="text-align: center;">¡Gracias por su compra!</p>
                        </div>`,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
                 // Para limpiar todo
                carroProductos = []
                localStorage.removeItem("carroProductos")
                actualizarTodo()
                showToast ("¡Compra realizada con éxito! Gracias.")
            });
        }
    }  
}

// Función auxiliar para no repetir código
function actualizarTodo() {
    localStorage.setItem("carroProductos", JSON.stringify(carroProductos))
    renderCarrito(carroProductos)
}

renderCarrito(carroProductos)