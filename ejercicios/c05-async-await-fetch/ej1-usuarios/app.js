"use strict";
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }
        const usuarios = await response.json();
        return usuarios;
    }
    catch (error) {
        console.error("Hubo un fallo en la petición:", error);
        return [];
    }
}
obtenerUsuarios().then(usuarios => {
    console.log("--- Lista de Usuarios ---");
    usuarios.forEach(({ name, email }) => {
        console.log(`Usuario: ${name} | Contacto: ${email}`);
    });
});
