export {};
const inputAltura = document.querySelector('#altura') as HTMLInputElement;
const boton = document.querySelector('#btnGenerar') as HTMLButtonElement;
const displayResultado = document.querySelector('#resultado') as HTMLElement;


function generarAsteriscos(n: number): string {
    let asteriscos: string = "";
    for (let i: number = 0; i < n; i++) {
        asteriscos += "*";
    }
    return asteriscos;
}


boton.addEventListener('click', () => {
    
    const n: number = parseInt(inputAltura.value);

   
    if (isNaN(n) || n < 1) {
        alert("Por favor, ingresá un número válido mayor a 0.");
        return;
    }

    let arbolCompleto: string = "";
    
    for (let i: number = 1; i <= n; i++) {
        arbolCompleto += generarAsteriscos(i) + "\n";
    }

    displayResultado.innerText = arbolCompleto;
});