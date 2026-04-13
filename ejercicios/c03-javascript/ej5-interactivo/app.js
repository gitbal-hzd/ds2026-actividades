// 1. Seleccionamos los elementos del DOM 
const inputAltura = document.querySelector('#altura');
const boton = document.querySelector('#btnGenerar');
const displayResultado = document.querySelector('#resultado');
const displayError = document.querySelector('#error');

// 2. Escuchamos el evento 'click' del botón 
boton.addEventListener('click', () => {
    // Limpiamos resultados anteriores
    displayResultado.textContent = "";
    displayError.textContent = "";

    // Obtenemos el valor del input y lo pasamos a número
    const n = parseInt(inputAltura.value);

    // 3. Validación 
    if (isNaN(n) || n < 1) {
        displayError.textContent = "Error: Por favor, ingresá un número mayor a 0.";
        return; // Cortamos la ejecución si hay error
    }

    // 4. Generación del árbol 
    let arbolCompleto = "";
    
    for (let i = 1; i <= n; i++) {
        // Reutilizamos la lógica de generar asteriscos por fila
        let fila = "";
        for (let j = 0; j < i; j++) {
            fila += "*";
        }
        // Agregamos la fila y un salto de línea
        arbolCompleto += fila + "\n";
    }

    // 5. Mostramos el resultado en la página 
    displayResultado.textContent = arbolCompleto;
});