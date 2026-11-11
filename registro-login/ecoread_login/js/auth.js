


var BACKEND_LISTO = false;





function mostrarError(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
    document.getElementById(campo).setAttribute("aria-invalid", "true");
}

function limpiarErrores(campos) {
    for (var i = 0; i < campos.length; i++) {
        document.getElementById("error-" + campos[i]).textContent = "";
        document.getElementById(campos[i]).removeAttribute("aria-invalid");
    }
}

function aplicarErrores(errores) {
    for (var i = 0; i < errores.length; i++) {
        mostrarError(errores[i].campo, errores[i].mensaje);
    }
    if (errores.length > 0) {
        document.getElementById(errores[0].campo).focus();
    }
}

function mostrarMensaje(idMensaje, texto, tipo) {
    var mensaje = document.getElementById(idMensaje);
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
}

function limpiarMensaje(idMensaje) {
    var mensaje = document.getElementById(idMensaje);
    mensaje.textContent = "";
    mensaje.className = "mensaje";
}

function correoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}


function telefonoValido(telefono) {
    return /^\d{4}-?\d{4}$/.test(telefono);
}


function claveSegura(clave) {
    return clave.length >= 8 && /[A-Za-z]/.test(clave) && /\d/.test(clave);
}


function alternarClaves(casilla, ids) {
    var tipo = casilla.checked ? "text" : "password";
    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).type = tipo;
    }
}

function formatearFecha(fecha) {
    return fecha.toLocaleDateString("es-CR", { day: "numeric", month: "short", year: "numeric" });
}


function textoFicha(id, valor, porDefecto) {
    var celda = document.getElementById(id);
    if (valor == "") {
        celda.textContent = porDefecto;
        celda.className = "vacio";
    } else {
        celda.textContent = valor;
        celda.className = "";
    }
}



function actualizarFicha() {
    var universidad = document.getElementById("universidad");
    var textoUniversidad = "";
    if (universidad.value != "") {
        textoUniversidad = universidad.options[universidad.selectedIndex].text;
    }

    textoFicha("ficha-nombre", document.getElementById("nombre").value.trim(), "Tu nombre");
    textoFicha("ficha-correo", document.getElementById("correo").value.trim(), "tu.correo@universidad.ac.cr");
    textoFicha("ficha-universidad", textoUniversidad, "Tu universidad");
    textoFicha("ficha-carrera", document.getElementById("carrera").value.trim(), "Tu carrera");
    document.getElementById("sello-fecha").textContent = formatearFecha(new Date());
}

function validarRegistro() {
    var campos = ["nombre", "correo", "telefono", "universidad", "carrera", "clave", "confirmar", "terminos"];
    limpiarErrores(campos);
    limpiarMensaje("mensaje-registro");

    var nombre = document.getElementById("nombre").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var universidad = document.getElementById("universidad").value;
    var carrera = document.getElementById("carrera").value.trim();
    var clave = document.getElementById("clave").value;
    var confirmar = document.getElementById("confirmar").value;
    var terminos = document.getElementById("terminos").checked;

    var errores = [];

    if (nombre == "") {
        errores.push({ campo: "nombre", mensaje: "Escribe tu nombre completo." });
    } else if (nombre.indexOf(" ") == -1) {
        errores.push({ campo: "nombre", mensaje: "Agrega al menos un apellido." });
    }

    if (correo == "") {
        errores.push({ campo: "correo", mensaje: "Escribe tu correo." });
    } else if (!correoValido(correo)) {
        errores.push({ campo: "correo", mensaje: "El correo no es válido. Ejemplo: nombre@universidad.ac.cr" });
    }

    if (telefono != "" && !telefonoValido(telefono)) {
        errores.push({ campo: "telefono", mensaje: "Usa 8 dígitos. Ejemplo: 8888-8888" });
    }

    if (universidad == "") {
        errores.push({ campo: "universidad", mensaje: "Selecciona tu universidad." });
    }

    if (carrera == "") {
        errores.push({ campo: "carrera", mensaje: "Escribe tu carrera." });
    }

    if (clave == "") {
        errores.push({ campo: "clave", mensaje: "Crea una contraseña." });
    } else if (!claveSegura(clave)) {
        errores.push({ campo: "clave", mensaje: "Usa mínimo 8 caracteres con letras y números." });
    }

    if (confirmar == "") {
        errores.push({ campo: "confirmar", mensaje: "Repite tu contraseña." });
    } else if (confirmar != clave) {
        errores.push({ campo: "confirmar", mensaje: "Las contraseñas no coinciden." });
    }

    if (!terminos) {
        errores.push({ campo: "terminos", mensaje: "Debes aceptar las normas para continuar." });
    }

    if (errores.length > 0) {
        aplicarErrores(errores);
        mostrarMensaje("mensaje-registro", "Revisa los campos marcados en rojo.", "fallo");
        return false;
    }

    
    if (BACKEND_LISTO) {
        return true;
    }

    
    mostrarMensaje("mensaje-registro", "¡Cuenta creada! Ya puedes iniciar sesión.", "ok");
    document.getElementById("sello").classList.add("activo");
    return false;
}




function validarLogin() {
    limpiarErrores(["correo", "clave"]);
    limpiarMensaje("mensaje-login");

    var correo = document.getElementById("correo").value.trim();
    var clave = document.getElementById("clave").value;

    var errores = [];

    if (correo == "") {
        errores.push({ campo: "correo", mensaje: "Escribe tu correo." });
    } else if (!correoValido(correo)) {
        errores.push({ campo: "correo", mensaje: "El correo no es válido. Ejemplo: nombre@universidad.ac.cr" });
    }

    if (clave == "") {
        errores.push({ campo: "clave", mensaje: "Escribe tu contraseña." });
    }

    if (errores.length > 0) {
        aplicarErrores(errores);
        mostrarMensaje("mensaje-login", "Revisa los campos marcados en rojo.", "fallo");
        return false;
    }

    if (BACKEND_LISTO) {
        return true;
    }

    
    mostrarMensaje("mensaje-login", "Datos correctos. Entrando a tu perfil...", "ok");
    window.location.href = "perfil.html";
    return false;
}
