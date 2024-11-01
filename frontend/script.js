const input = document.querySelector('input')
    const form = document.getElementById('form')
    const agregar =document.querySelector('.button')
    
    agregar.addEventListener('click', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        fetch('http://localhost:3002/mascotas', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error))
    });
    
    fetch ('http://localhost:3002/mascotas')
    .then(response => response.json())
    .then(data => {
        let mostrarDatos = document.getElementById('tabla')
        mostrarDatos.innerHTML = "";
        data.forEach(pets => {
            
            const fila = document.createElement('tr')
            const datosNombre = document.createElement('td')
            datosNombre.textContent = pets.nombre;

            const btn = document.createElement('button')
            btn.textContent = "Eliminar";
            btn.className = "eliminar";
            datosNombre.appendChild(btn)

            fila.appendChild(datosNombre)
            mostrarDatos.appendChild(fila)

            btn.addEventListener('click', (e) => {
                //eliminarMascota(pets.nombre, fila);

                const items = e.target.parentElement;
                const nombre = items.firstChild.textContent;
                fetch(`http://localhost:3002/mascotas/${nombre}`, {
                    method: 'DELETE',
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar dato')
                    }
                    //fila.remove();
                })
                .then((data) => {
                    console.log(data);
                    mostrarDatos.removeChild(fila);
                })
                .catch((error) => console.error(error))
            });
    
        })
    })
    .catch(error => console.error('error:', error));

    //document.addEventListener('DOMContentLoaded', mostrarMascotas);
    