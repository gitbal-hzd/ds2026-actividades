"use strict";
const catalogo = [
    { isbn: "111", titulo: "El Aleph", autor: "Borges", precio: 4500, disponible: true },
    { isbn: "222", titulo: "Rayuela", autor: "Cortazar", precio: 5200, disponible: true },
    { isbn: "333", titulo: "Ficciones", autor: "Borges", precio: 4800, disponible: false },
    { isbn: "444", titulo: "Bestiario", autor: "Cortazar", precio: 3900, disponible: true }
];
function buscarPorAutor(autor) {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(l => l.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((acc, l) => acc + l.precio, 0);
    return total / libros.length;
}
const ulListado = document.querySelector('#listado');
const pStats = document.querySelector('#stats');
function renderizar(libros) {
    ulListado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
        ulListado.appendChild(li);
    });
    const promedio = precioPromedio(libros);
    pStats.textContent = `Cantidad: ${libros.length} | Promedio: $${promedio.toFixed(2)}`;
}
document.querySelector('#filtrar')?.addEventListener('click', () => {
    const input = document.querySelector('#filtroAutor');
    renderizar(buscarPorAutor(input.value));
});
document.querySelector('#mostrarDisponibles')?.addEventListener('click', () => {
    renderizar(librosDisponibles());
});
document.querySelector('#mostrarTodos')?.addEventListener('click', () => {
    renderizar(catalogo);
});
renderizar(catalogo);
