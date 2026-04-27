"use strict";
const listado = document.querySelector('#users-list');
const loadingMsg = document.querySelector('#loading');
const errorDiv = document.querySelector('#error-message');
function renderizarUsuarios(usuarios) {
    listado.innerHTML = "";
    usuarios.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.name} - ${u.email}`;
        listado.appendChild(li);
    });
}
async function cargarDatos() {
    try {
        loadingMsg.style.display = "block";
        errorDiv.style.display = "none";
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const usuarios = await response.json();
        renderizarUsuarios(usuarios);
    }
    catch (error) {
        errorDiv.textContent = "No se pudieron cargar los usuarios. Reintentá más tarde.";
        errorDiv.style.display = "block";
    }
    finally {
        loadingMsg.style.display = "none";
    }
}
cargarDatos();
