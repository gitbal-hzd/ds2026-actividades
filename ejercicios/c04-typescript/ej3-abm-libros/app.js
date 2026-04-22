"use strict";
let catalogo = [
    { isbn: "AUTO-1", titulo: "El Aleph", autor: "Borges", precio: 4500, disponible: true },
    { isbn: "AUTO-2", titulo: "Rayuela", autor: "Cortazar", precio: 5200, disponible: true }
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const t = document.querySelector('#titulo').value;
    const a = document.querySelector('#autor').value;
    const p = parseFloat(document.querySelector('#precio').value);
    const d = document.querySelector('#disponible').checked;
    if (t === "" || a === "" || isNaN(p) || p <= 0)
        return null;
    return {
        isbn: "AUTO-" + Date.now(), // ISBN Random 
        titulo: t,
        autor: a,
        precio: p,
        disponible: d
    };
}
function renderizar(librosAMostrar) {
    const ul = document.querySelector('#listado');
    const stats = document.querySelector('#stats');
    ul.innerHTML = "";
    librosAMostrar.forEach(libro => {
        const li = document.createElement('li');
        li.innerHTML = `${libro.titulo} - ${libro.autor} ($${libro.precio}) `;
        const btnBorrar = document.createElement('button');
        btnBorrar.innerText = "Eliminar";
        btnBorrar.onclick = () => eliminarLibro(libro.isbn);
        li.appendChild(btnBorrar);
        ul.appendChild(li);
    });
    const total = librosAMostrar.reduce((acc, l) => acc + l.precio, 0);
    const promedio = librosAMostrar.length > 0 ? total / librosAMostrar.length : 0;
    stats.innerText = `Libros: ${librosAMostrar.length} | Promedio: $${promedio.toFixed(2)}`;
}
document.querySelector('#btnAgregar')?.addEventListener('click', () => {
    const errorDiv = document.querySelector('#errorForm');
    const nuevo = validarFormulario();
    if (!nuevo) {
        errorDiv.innerText = "Error: Complete todos los campos correctamente.";
    }
    else {
        errorDiv.innerText = "";
        agregarLibro(nuevo);
        document.querySelector('#titulo').value = "";
        document.querySelector('#autor').value = "";
        document.querySelector('#precio').value = "";
    }
});
document.querySelector('#filtrar')?.addEventListener('click', () => {
    const autor = document.querySelector('#filtroAutor').value;
    const filtrados = catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
    renderizar(filtrados);
});
document.querySelector('#mostrarDisponibles')?.addEventListener('click', () => {
    renderizar(catalogo.filter(l => l.disponible));
});
document.querySelector('#mostrarTodos')?.addEventListener('click', () => renderizar(catalogo));
renderizar(catalogo);
