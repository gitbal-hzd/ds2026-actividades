function calcularPrecioFinal(monto, medioPago) {
    let descuento = 0;

    if (monto < 200) {
        descuento = 0; 
    } else if (monto <= 400) {
        if (medioPago === "E") {
            descuento = 0.3; 
        } else if (medioPago === "D") {
            descuento = 0.2; 
        } else if (medioPago === "C") {
            descuento = 0.1; 
        }
    } else {
        descuento = 0.4; 
    }

    const precioFinal = monto * (1 - descuento);
    return precioFinal; 
}

// Pruebas: Muestro 5 combinaciones diferentes 
console.log("--- RESULTADOS EJERCICIO 3 ---");

// Prueba 1: Menor a $200
let m1 = 150, p1 = "E";
console.log(`Monto: $${m1} | Pago: ${p1} | Final: $${calcularPrecioFinal(m1, p1)}`);

// Prueba 2: Entre $200 y $400 (Efectivo)
let m2 = 300, p2 = "E";
console.log(`Monto: $${m2} | Pago: ${p2} | Final: $${calcularPrecioFinal(m2, p2)}`);

// Prueba 3: Entre $200 y $400 (Débito)
let m3 = 300, p3 = "D";
console.log(`Monto: $${m3} | Pago: ${p3} | Final: $${calcularPrecioFinal(m3, p3)}`);

// Prueba 4: Entre $200 y $400 (Crédito)
let m4 = 300, p4 = "C";
console.log(`Monto: $${m4} | Pago: ${p4} | Final: $${calcularPrecioFinal(m4, p4)}`);

// Prueba 5: Mayor a $400 (Cualquier pago)
let m5 = 500, p5 = "D";
console.log(`Monto: $${m5} | Pago: ${p5} | Final: $${calcularPrecioFinal(m5, p5)}`);