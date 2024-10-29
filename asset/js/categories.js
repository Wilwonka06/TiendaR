

function registroCategoria() {
    let registros = {
        nombre:document.getElementById('nombre').value,
        description:document.getElementById('description').value
    }
    let local = localStorage.getItem('categorias');
    let arreglo

    if (registros.nombre === '') {
        alert('No puedes registrar sin un nombre.')
    }else{
        if (local) {
            arreglo = JSON.parse(local)
        }else{
            arreglo = [];
        }
    
        arreglo.push(registros)
        localStorage.setItem('categorias', JSON.stringify(arreglo));
    
        document.getElementById('nombre').value = ''
        document.getElementById('description').value = ''
    
        alert('Registro Exitoso.')
        tablaCategoria();
    }

}

function tablaCategoria() {
    let cuerpoT = document.getElementById('tbody')
    cuerpoT.innerHTML ='';

    let local = localStorage.getItem('categorias');
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
tablaCategoria()

function showCategory(id) {
    let loca = localStorage.getItem('categorias');
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
    let local = localStorage.getItem('categorias');
    local = JSON.parse(local);

    document.getElementById('editIndex').value = id;
    document.getElementById('newName').value = local[id].nombre;
    document.getElementById('newDescription').value = local[id].description;
}

function editCategory() {
    let local = localStorage.getItem('categorias');
    local = JSON.parse(local);

    

    let id = document.getElementById('editIndex').value;
    let newName = document.getElementById('newName').value
    let newDescription = document.getElementById('newDescription').value;

    local[id].nombre = newName;
    local[id].description = newDescription;

    localStorage.setItem('categorias', JSON.stringify(local));
    alert('Categoria Modificada con éxito.')
    tablaCategoria();
}

function deleteCategory(id) {
    let local = localStorage.getItem('categorias');
    local = JSON.parse(local)

    let categoria = local[id].nombre

    local.splice(id, 1)
    localStorage.setItem('categorias', JSON.stringify(local));

    alert('categoria eliminada con éxito')
    tablaCategoria();
}