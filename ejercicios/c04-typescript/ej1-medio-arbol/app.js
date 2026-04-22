const inputAltura = document.querySelector('#altura');
const boton = document.querySelector('#btnGenerar');
const displayResultado = document.querySelector('#resultado');
function generarAsteriscos(n) {
    let asteriscos = "";
    for (let i = 0; i < n; i++) {
        asteriscos += "*";
    }
    return asteriscos;
}
boton.addEventListener('click', () => {
    const n = parseInt(inputAltura.value);
    if (isNaN(n) || n < 1) {
        alert("Por favor, ingresá un número válido mayor a 0.");
        return;
    }
    let arbolCompleto = "";
    for (let i = 1; i <= n; i++) {
        arbolCompleto += generarAsteriscos(i) + "\n";
    }
    displayResultado.innerText = arbolCompleto;
});
export {};
