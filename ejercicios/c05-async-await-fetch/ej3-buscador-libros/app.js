"use strict";
const inputBusqueda = document.querySelector('#busqueda');
const btnBuscar = document.querySelector('#btnBuscar');
const contenedorResultados = document.querySelector('#resultados');
const divError = document.querySelector('#error');
async function buscarLibros(tema) {
    try {
        contenedorResultados.innerHTML = "<p>Buscando...</p>";
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(tema)}`);
        if (!response.ok)
            throw new Error("Error al conectar con la API");
        const data = await response.json();
        const libros = data.docs;
        renderizarTarjetas(libros.slice(0, 10));
    }
    catch (error) {
        divError.innerText = "Hubo un problema técnico con la búsqueda.";
        contenedorResultados.innerHTML = "";
    }
}
function renderizarTarjetas(libros) {
    contenedorResultados.innerHTML = "";
    divError.innerText = "";
    if (libros.length === 0) {
        contenedorResultados.innerHTML = "<p>No se encontraron libros.</p>";
        return;
    }
    libros.forEach(libro => {
        const div = document.createElement('div');
        div.className = 'tarjeta';
        const autor = libro.author_name ? libro.author_name.join(", ") : "Autor desconocido";
        const anio = libro.first_publish_year ? libro.first_publish_year : "Año no disponible";
        div.innerHTML = `
            <h3>${libro.title}</h3>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Año:</strong> ${anio}</p>
        `;
        contenedorResultados.appendChild(div);
    });
}
btnBuscar.addEventListener('click', () => {
    const texto = inputBusqueda.value.trim();
    if (texto === "") {
        divError.innerText = "Por favor, escribe algo para buscar.";
        contenedorResultados.innerHTML = "";
    }
    else {
        buscarLibros(texto);
    }
});
