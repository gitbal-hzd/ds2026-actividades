"use strict";

const inputBusqueda = document.querySelector('#busqueda');
const btnBuscar = document.querySelector('#btnBuscar');
const contenedorResultados = document.querySelector('#resultados');
const divError = document.querySelector('#error');

async function buscarLibros(tema) {
    try {
        contenedorResultados.innerHTML = "<p class='text-center w-100'>Buscando libros...</p>";
        
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(tema)}`);
        
        if (!response.ok) throw new Error("Error al conectar con la API");
        
        const data = await response.json();

        renderizarTarjetas(data.docs.slice(0, 12));
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
        contenedorResultados.innerHTML = "<p class='text-center w-100'>No se encontraron libros.</p>";
        return;
    }

    libros.forEach(libro => {
        const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
        

        const portadaId = libro.cover_i;
        const imagenUrl = portadaId 
            ? `https://covers.openlibrary.org/b/id/${portadaId}-L.jpg` 
            : 'https://via.placeholder.com/300x400?text=Sin+Portada';


        const divCol = document.createElement('div');
        divCol.className = 'col-12 col-md-6 col-lg-4';
        
        divCol.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${imagenUrl}" class="card-img-top" alt="${libro.title}" style="height: 350px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title text-truncate">${libro.title}</h5>
                    <p class="card-text text-muted small">${autor}</p>
                    <a href="libro.html" class="btn btn-outline-primary w-100">Ver más</a>
                </div>
            </div>
        `;
        
        contenedorResultados.appendChild(divCol);
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
