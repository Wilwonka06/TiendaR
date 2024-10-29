function registroCliente() {
    let user = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        tDoc: document.getElementById('tDoc').value,
        documento: document.getElementById('documento').value,
        telefono: document.getElementById('telefono').value,
        correoR: document.getElementById('correoR').value,
        passW: document.getElementById('passW').value,
        rol: 'cliente'
    };

    if (user.documento === "" || user.nombre === "" || user.correoR === "" || user.telefono === "" || user.apellido === "" || user.passW === "") {
        alert("Todos los campos son obligatorios");
        return false;
    }

    let localS = localStorage.getItem('usuario');
    let UsuarioS;

    if (localS) {
        UsuarioS = JSON.parse(localS);
    } else {
        UsuarioS = [];
    }

    UsuarioS.push(user);
    localStorage.setItem('usuario', JSON.stringify(UsuarioS));
    alert('Registro exitoso')

    limpiarC();
}

function registroUsuario() {
    let user = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        tDoc: document.getElementById('tDoc').value,
        documento: document.getElementById('documento').value,
        telefono: document.getElementById('telefono').value,
        correoR: document.getElementById('correoR').value,
        passW: document.getElementById('passW').value,
        rol: document.getElementById('rol').value
    };

    if (user.documento === "" || user.nombre === "" || user.correoR === "" || user.telefono === "" || user.apellido === "" || user.passW === "") {
        alert("Todos los campos son obligatorios");
        return false;
    }

    let localS = localStorage.getItem('usuario');
    let UsuarioS;

    if (localS) {
        UsuarioS = JSON.parse(localS);
    } else {
        UsuarioS = [];
    }

    UsuarioS.push(user);
    localStorage.setItem('usuario', JSON.stringify(UsuarioS));
    alert('Registro exitoso')

    limpiarC();
}


function limpiarC() {
    document.getElementById('nombre').value = '',
    document.getElementById('apellido').value = '',
    document.getElementById('tDoc').value = '',
    document.getElementById('documento').value = '',
    document.getElementById('telefono').value = '',
    document.getElementById('correoR').value = '',
    document.getElementById('passW').value = ''
}

function logout() {
    alert('Hasta luego.')
    setTimeout(() => {
        window.location.replace('/index.html')
    }, 2000);
}

function login() {
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('pass').value;

    let usuarios = JSON.parse(localStorage.getItem('usuario'))
    if (!usuarios) {
        alert('No hay usuarios registrados');
        return;
    }


    let userIndex = usuarios.findIndex(element => correo === element.correoR && pass === element.passW);
    if (userIndex !== -1) {
        localStorage.setItem('usuarioAct', userIndex);
        alert('Bienvenido');
        setTimeout(() => {
            window.location.replace('./home.html');
        }, 2000);
    } else {
        alert('Credenciales incorrectas');
        document.getElementById('pass').value = '';
    }
}

function longitud(nombre) {
    let documento = document.getElementById('documento').value;
    let telefono = document.getElementById('telefono').value;

    if (nombre === 'doc') {
        if (documento.length > 10 || documento.length < 7) {
            alert('Documento debe tener entre 7 y 10 números')
            document.getElementById('documento').value = '';
            return false
        }
    }else if (nombre ==='tel') {
        if (telefono.length > 10) {
            alert('El número excede la cantidad de digitos permitios')
            document.getElementById('telefono').value = '';
            return false
        }
    }
    return true
}

function existenciaDoc() {
    let local = localStorage.getItem('usuario')
    let documento = document.getElementById('documento').value;

    local = JSON.parse(local)

    if (local) {
        let encontrado = local.find(element => element.documento == documento);
        if (encontrado) {
            alert('Este documento ya existe.');
            document.getElementById('documento').value = '';
            return false;
        }
    }
    return true;
}

function existenciaCorreo() {
    let local = localStorage.getItem('usuario')
    let correo = document.getElementById('correoR').value;

    local = JSON.parse(local)

    if (local) {
        let encontrado = local.find(element => element.correoR == correo);
        if (encontrado) {
            alert('Este correo ya esta siendo utilizado.');
            document.getElementById('documento').value = '';
            return false;
        }
    }
    return true;
}

function redirecion(nombre) {
    if (nombre == 'categoria') {
        setTimeout(() => {
            window.location.replace('./products/categories.html')
        }, 1000);
    } else if (nombre == 'producto') {
        setTimeout(() => {
            window.location.replace('./products/products.html')
        }, 1000);
    }
}