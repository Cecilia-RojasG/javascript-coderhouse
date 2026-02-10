const alerta = document.createElement("div");
alerta.id = "avisoAlerta";
document.body.appendChild(alerta);

function mostrarAlerta(mensaje) {
    alerta.innerText = mensaje;
    alerta.style.opacity = "1";
    alerta.style.display = "block";
    
    alerta.addEventListener('transitionend', () => {
        alerta.style.display = "none";
    }, { once: true }); 
}

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