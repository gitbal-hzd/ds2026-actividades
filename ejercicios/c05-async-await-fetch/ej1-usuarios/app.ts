
interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}


async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
 
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        const usuarios: Usuario[] = await response.json();
        return usuarios;

    } catch (error) {
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