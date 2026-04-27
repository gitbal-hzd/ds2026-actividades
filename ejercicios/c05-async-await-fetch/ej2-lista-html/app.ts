interface Usuario {
    id: number;
    name: string;
    email: string;
}


const listado = document.querySelector('#users-list') as HTMLUListElement;
const loadingMsg = document.querySelector('#loading') as HTMLElement;
const errorDiv = document.querySelector('#error-message') as HTMLElement;


function renderizarUsuarios(usuarios: Usuario[]): void {
    listado.innerHTML = ""; 
    usuarios.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.name} - ${u.email}`;
        listado.appendChild(li);
    });
}


async function cargarDatos(): Promise<void> {
    try {
        loadingMsg.style.display = "block";
        errorDiv.style.display = "none";

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const usuarios: Usuario[] = await response.json(); 

        renderizarUsuarios(usuarios);

    } catch (error) {
        errorDiv.textContent = "No se pudieron cargar los usuarios. Reintentá más tarde.";
        errorDiv.style.display = "block";
    } finally {
        loadingMsg.style.display = "none";
    }
}


cargarDatos();