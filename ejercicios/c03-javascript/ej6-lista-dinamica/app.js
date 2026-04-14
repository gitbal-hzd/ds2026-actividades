// Seleccionamos lo que necesitamos
const input = document.querySelector('#producto');
const boton = document.querySelector('#agregar');
const listaUl = document.querySelector('#lista');
const textoContador = document.querySelector('#contador');

let cantidad = 0; // Para llevar la cuenta 

boton.addEventListener('click', () => {
    const nombre = input.value;

    // Validación básica: que no esté vacío 
    if (nombre === "") {
        alert("Escribí algo!");
        return;
    }

    // 1. Creamos el item de la lista (li) 
    const li = document.createElement('li');
    li.innerText = nombre + " ";

    // 2. Creamos el botón de eliminar 
    const btnBorrar = document.createElement('button');
    btnBorrar.innerText = "Eliminar";

    // Lógica para borrar este item específico
    btnBorrar.addEventListener('click', () => {
        li.remove(); // Borra el elemento 
        cantidad--;  // Resta uno
        textoContador.innerText = `${cantidad} productos en la lista`; // Actualiza el texto 
    });

    // 3. Metemos el botón adentro del li y el li en la lista 
    li.appendChild(btnBorrar);
    listaUl.appendChild(li);

    // 4. Sumamos uno al total y limpiamos el input
    cantidad++;
    textoContador.innerText = `${cantidad} productos en la lista`; 
    input.value = ""; 
});