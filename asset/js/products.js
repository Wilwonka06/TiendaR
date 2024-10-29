function registerProducts() {
    let registros = {
        nombre: document.getElementById('nombre').value,
        description: document.getElementById('description').value,
        categoria: document.getElementById('cate').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value
    };

    let local = localStorage.getItem('productos');
    let arreglo;

    if (local) {
        arreglo = JSON.parse(local);
    } else {
        arreglo = [];
    }

    let categoria = localStorage.getItem('categorias');
    categoria = JSON.parse(categoria);

    if (!categoria || categoria.length < 1) {
        alert('No puedes agregar productos sin categorías registradas.');
        return false;
    }

    if (registros.nombre === '' || registros.description === '' || registros.categoria === '' || registros.precio === '' || registros.stock === '') {
        alert('Todos los campos son requeridos');
        return false;
    }

    if (registros.categoria === '') {
        alert('Selecciona una categoría válida.');
        return false;
    }

    arreglo.push(registros);
    localStorage.setItem('productos', JSON.stringify(arreglo));

    document.getElementById('nombre').value = '';
    document.getElementById('description').value = '';
    document.getElementById('cate').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('stock').value = '';

    alert('Registro Exitoso.');
    productTable();
}


function selectCategory() {
    let categoria = document.getElementById('cate');
    categoria.innerHTML = '';

    let local = localStorage.getItem('categorias');
    
    if (local) {
        local = JSON.parse(local);

        local.forEach((element, index) => {
            let option = document.createElement('option');
            option.value = index;
            option.text = element.nombre;
            categoria.appendChild(option);
        });
    } else {
        let option = document.createElement('option');
        option.value = '';
        option.text = 'No hay categorías disponibles';
        categoria.appendChild(option);
    }
}

function productTable(id) {
    let cuerpoT = document.getElementById('tbody')
    cuerpoT.innerHTML ='';

    let producto = localStorage.getItem('productos');
    let categoria = localStorage.getItem('categorias');

    producto = JSON.parse(producto);
    categoria = JSON.parse(categoria);

    producto.forEach((element, index) => {
        let categoriaId = element.categoria;
        let categoriaNombre = categoria[categoriaId].nombre

        let cuerpoT2 = document.createElement('tr');
        cuerpoT2.innerHTML =`
        <td>${index}</td>
        <td>${element.nombre}</td>
        <td>${categoriaNombre}</td>
        <td>${element.precio}</td> 
        <td>
            <button type="button" class="btn bg-primary bi bi-eye" data-bs-toggle="modal" data-bs-target="#modalId" onclick='showProduct(${index})'></button>
            <button type="button" class="btn bg-warning bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#modalEdit" onclick='showEdit(${index})'></button>
            <button type="button" class="btn bg-danger bi bi-trash3" onclick='deleteProduct(${index})'></button>
        </td>
    `;
    cuerpoT.appendChild(cuerpoT2);
    });
}

function showProduct(id) {
    let loca = localStorage.getItem('productos');
    let local = localStorage.getItem('categorias');

    loca = JSON.parse(loca);
    local = JSON.parse(local);

    let nombre = loca[id].nombre;
    let descrip = loca[id].description;
    let categoriaId = loca[id].categoria;
    let precio = loca[id].precio;
    let stock = loca[id].stock;
    let NameC = loca[categoriaId].nombre;

    let detalles = document.getElementById('detalle');
    detalles.innerHTML =`
        <h4>Detalles</h4>
        <p><strong>nombre:</strong> ${nombre}</p>
        <p><strong>Descripción:</strong> ${descrip}</p>
        <p><strong>Categoria:</strong> ${NameC}</p>
        <p><strong>Precio Unitario:</strong> ${precio}</p>
        <p><strong>Cantidad:</strong> ${stock}</p>
    `
}

function showEdit(id) {
    let local = localStorage.getItem('productos');
    local = JSON.parse(local);

    document.getElementById('editIndex').value = id;
    document.getElementById('newName').value = local[id].nombre;
    document.getElementById('newDescription').value = local[id].description;
    document.getElementById('newPrecio').value = local[id].precio;
    document.getElementById('newStock').value = local[id].stock;
}

function editProduct() {
    let local = localStorage.getItem('productos');
    local = JSON.parse(local);

    let id = document.getElementById('editIndex').value;
    let newName = document.getElementById('newName').value
    let newDescription = document.getElementById('newDescription').value;
    let newPrecio = document.getElementById('newPrecio').value;
    let newStock = document.getElementById('newStock').value;

    local[id].nombre = newName;
    local[id].description = newDescription;
    local[id].precio = newPrecio;
    local[id].stock = newStock;

    localStorage.setItem('productos', JSON.stringify(local));
    alert('Producto Modificada con éxito.')
    productTable();
}


function deleteProduct(id) {
    let local = localStorage.getItem('productos');
    local = JSON.parse(local)

    let producto = local[id].nombre

    local.splice(id, 1)
    localStorage.setItem('productos', JSON.stringify(local));

    alert(`Producto ${producto} eliminado con éxito`)
    productTable();
}

let productModal = document.getElementById('modalProduct');
productModal.addEventListener('show.bs.modal', selectCategory);

productTable()