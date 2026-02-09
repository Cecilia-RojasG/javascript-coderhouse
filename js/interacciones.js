const alerta = document.createElement("div");
alerta.id = "avisoAlerta";
document.body.appendChild(alerta);

function mostrarAlerta(mensaje) {
    alerta.innerText = mensaje;
    alerta.style.display = "block";
    setTimeout(() => {
        alerta.style.display = "none";
    }, 5000);
}