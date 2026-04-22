
interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; 
}


const catalogo: Libro[] = [
    { isbn: "111", titulo: "El Aleph", autor: "Borges", precio: 4500, disponible: true },
    { isbn: "222", titulo: "Rayuela", autor: "Cortazar", precio: 5200, disponible: true },
    { isbn: "333", titulo: "Ficciones", autor: "Borges", precio: 4800, disponible: false },
    { isbn: "444", titulo: "Bestiario", autor: "Cortazar", precio: 3900, disponible: true }
];


function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(l => l.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const total = libros.reduce((acc, l) => acc + l.precio, 0);
    return total / libros.length;
}

const ulListado = document.querySelector('#listado') as HTMLElement;
const pStats = document.querySelector('#stats') as HTMLElement;

function renderizar(libros: Libro[]): void {
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
    const input = document.querySelector('#filtroAutor') as HTMLInputElement;
    renderizar(buscarPorAutor(input.value));
});

document.querySelector('#mostrarDisponibles')?.addEventListener('click', () => {
    renderizar(librosDisponibles());
});

document.querySelector('#mostrarTodos')?.addEventListener('click', () => {
    renderizar(catalogo);
});

renderizar(catalogo);