// 1. Creo el array con al menos 8 números 
const numeros = [12, 5, 20, 8, 30, 4, 15, 10];

// 2. Inicializamos variables para los cálculos
let suma = 0;
let mayor = numeros[0]; // Empezamos asumiendo que el primero es el mayor
let menor = numeros[0]; // Empezamos asumiendo que el primero es el menor

// 3. Usamos for...of para recorrer el array 
for (const num of numeros) {
    suma += num; // Acumulamos la suma total

    // Verificamos si encontramos un número más grande
    if (num > mayor) {
        mayor = num;
    }

    // Verificamos si encontramos un número más chico
    if (num < menor) {
        menor = num;
    }
}

// 4. Calculamos el promedio usando la propiedad .length 
const promedio = suma / numeros.length;

// 5. Mostramos resultados en consola 
console.log("Array analizado:", numeros);
console.log("Suma total:", suma);
console.log("Promedio:", promedio);
console.log("Número mayor:", mayor);
console.log("Número menor:", menor);


// Definimos la función que recibe un número 'n' 
function generarAsteriscos(n) {
    let resultado = ""; // String vacío para ir acumulando

    // Usamos un bucle for tradicional como pide la consigna 
    for (let i = 0; i < n; i++) {
        resultado += "*"; // Concatenamos un asterisco en cada vuelta
    }

    return resultado; // Devolvemos el string final 
}

// Probamos la función
console.log("Generar 5 asteriscos:", generarAsteriscos(5));
console.log("Generar 10 asteriscos:", generarAsteriscos(10));