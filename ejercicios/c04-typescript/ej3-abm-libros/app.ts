interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
}

let catalogo: Libro[] = [
    { isbn: "AUTO-1", titulo: "El Aleph", autor: "Borges", precio: 4500, disponible: true },
    { isbn: "AUTO-2", titulo: "Rayuela", autor: "Cortazar", precio: 5200, disponible: true }
];

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}
 
function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const t = (document.querySelector('#titulo') as HTMLInputElement).value;
    const a = (document.querySelector('#autor') as HTMLInputElement).value;
    const p = parseFloat((document.querySelector('#precio') as HTMLInputElement).value);
    const d = (document.querySelector('#disponible') as HTMLInputElement).checked;

    if (t === "" || a === "" || isNaN(p) || p <= 0) return null;

    return {
        isbn: "AUTO-" + Date.now(), // ISBN Random 
        titulo: t,
        autor: a,
        precio: p,
        disponible: d
    };
}


function renderizar(librosAMostrar: Libro[]): void {
    const ul = document.querySelector('#listado') as HTMLElement;
    const stats = document.querySelector('#stats') as HTMLElement;
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
    const errorDiv = document.querySelector('#errorForm') as HTMLElement;
    const nuevo = validarFormulario();

    if (!nuevo) {
        errorDiv.innerText = "Error: Complete todos los campos correctamente.";
    } else {
        errorDiv.innerText = "";
        agregarLibro(nuevo);

        (document.querySelector('#titulo') as HTMLInputElement).value = "";
        (document.querySelector('#autor') as HTMLInputElement).value = "";
        (document.querySelector('#precio') as HTMLInputElement).value = "";
    }
});

document.querySelector('#filtrar')?.addEventListener('click', () => {
    const autor = (document.querySelector('#filtroAutor') as HTMLInputElement).value;
    const filtrados = catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
    renderizar(filtrados);
});

document.querySelector('#mostrarDisponibles')?.addEventListener('click', () => {
    renderizar(catalogo.filter(l => l.disponible));
});

document.querySelector('#mostrarTodos')?.addEventListener('click', () => renderizar(catalogo));

renderizar(catalogo);