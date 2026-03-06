const alerta = document.createElement("div");
alerta.id = "avisoAlerta";
document.body.appendChild(alerta);

//Para poder mostrar el mensaje de consulta (modal)
const modal = document.getElementById("modalConfirmacion")
const mensajeModal = document.getElementById("mensajeConfirmacion")
const btnAceptar = document.getElementById("btnAceptar")
const btnCancelar = document.getElementById("btnCancelar")

// Función para la confirmación 
function pedirConfirmacion(mensaje, accion) {
    mensajeModal.innerText = mensaje;
    modal.showModal()
    btnAceptar.onclick = () => {
        accion()
        modal.close()
    }    
    btnCancelar.onclick = () => modal.close()
}

function showToast(mensaje, color = "linear-gradient(to right, #00b09b, #96c93d)") {
    Toastify({
        text: mensaje,
        duration: 3500,
        destination: "#",
        offset: {
            x: 0, 
            y: 150 // Aumenta este número para bajarlo más desde el tope
        },
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color 
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

function volverComprar() {
    Toastify({
        text: "Seguir comprando",
        duration: 30000,
        destination: "../pages/productos.html",
        offset: {
            x: 0, 
            y: 150 // Aumenta este número para bajarlo más desde el tope
        },
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        },
        onClick: function(){} // Callback after click
    }).showToast();
}