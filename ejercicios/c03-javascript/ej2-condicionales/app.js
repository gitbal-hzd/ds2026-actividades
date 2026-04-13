function clasificarNota(nota) {
    if (nota < 4) {
        // Si la nota es 0, 1, 2 o 3
        return "Desaprobado"; 
    } else if (nota >= 4 && nota <= 7) {
        // Si está entre 4 y 7 inclusive
        return "Aprobado"; 
    } else if (nota >= 8) {
        // Si es 8, 9 o 10
        return "Promocionado"; 
    }
}

function diaDeLaSemana(numero) {
    switch (numero) {
        case 1: return "Lunes"; 
        case 2: return "Martes"; 
        case 3: return "Miércoles"; 
        case 4: return "Jueves";
        case 5: return "Viernes";
        case 6: return "Sábado (fin de semana)"; 
        case 7: return "Domingo (fin de semana)"; 
        default: 
        // Si el número no es del 1 al 7
            return "Día inválido";
        }
}

// Probando notas
console.log("Nota 2:", clasificarNota(2));        
console.log("Nota 5:", clasificarNota(5));       
console.log("Nota 10:", clasificarNota(10));     

// Probando días
console.log("Día 1:", diaDeLaSemana(1));
console.log("Día 7:", diaDeLaSemana(7));        
console.log("Día 99:", diaDeLaSemana(99));     