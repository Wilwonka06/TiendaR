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

function tablaUsuario() {
    let cuerpoT = document.getElementById('tbody')
    cuerpoT.innerHTML ='';

    let local = localStorage.getItem('usuario');
    local = JSON.parse(local);

    local.forEach((element, index) => {
        let cuerpoT2 = document.createElement('tr');
        cuerpoT2.innerHTML =`
        <td >${index+1}</td>
        <td>${element.nombre}</td>
        <td >${element.description}</td>
        <td>
            <button type="button" class="btn bg-primary bi bi-eye" data-bs-toggle="modal" data-bs-target="#modalId" onclick='showCategory(${index})'></button>

            <button type="button" class="btn bg-warning bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#modalEdit" onclick='showEdit(${index})'></button>
            
            <button type="button" class="btn bg-danger bi bi-trash3" onclick='deleteCategory(${index})'></button>
        </td>
    `;
    cuerpoT.appendChild(cuerpoT2);
    });
}
tablaUsuario()

function showCategory(id) {
    let loca = localStorage.getItem('usuario');
    loca = JSON.parse(loca);

    let categoria = loca[id].nombre;
    let desc = loca[id].description;

    let detalles = document.getElementById('detalle');

    detalles.innerHTML =`
        <h4>Categoria</h4>
        <p><strong>Nombre:</strong> ${categoria}</p>
        <p><strong>Descripción:</strong> ${desc}</p>
    `

}

function showEdit(id) {
    let local = localStorage.getItem('usuario');
    local = JSON.parse(local);

    document.getElementById('editIndex').value = id;
    document.getElementById('newName').value = local[id].nombre;
    document.getElementById('newDescription').value = local[id].description;
}

function editCategory() {
    let local = localStorage.getItem('usuario');
    local = JSON.parse(local);

    

    let id = document.getElementById('editIndex').value;
    let newName = document.getElementById('newName').value
    let newDescription = document.getElementById('newDescription').value;

    local[id].nombre = newName;
    local[id].description = newDescription;

    localStorage.setItem('usuario', JSON.stringify(local));
    alert('Categoria Modificada con éxito.')
    tablaUsuario();
}

function deleteCategory(id) {
    let local = localStorage.getItem('usuario');
    local = JSON.parse(local)

    let categoria = local[id].nombre

    local.splice(id, 1)
    localStorage.setItem('usuario', JSON.stringify(local));

    alert('categoria eliminada con éxito')
    tablaUsuario();
}