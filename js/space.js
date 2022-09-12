const NASA_URL = "https://images-api.nasa.gov/search?q=";
let contenidoMaximo = 0;

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector("#inputBuscar");
    const boton = document.querySelector("#btnBuscar");
    
    boton.addEventListener("click", async () => {
        const response = await fetch(NASA_URL + input.value);
        const datos = await response.json();        
        
        showResults(datos.collection);
        console.log(datos);
    })
});

function showResults(datos) {
    const container = document.querySelector("#contenedor");
    let contenidoHTML = "";

    for (let i = 0; i < contenidoMaximo + 12; i++) {
        const item = datos.items[i];
        const title = item.data[0].title;
        const date = item.data[0].date_created;
        const description = item.data[0].description_508;
        const imgSrc = item.links[0].href;

        contenidoHTML +=
        `
        <div class="col">
            <div class="card h-100 mb-2 shadow-sm">
                <img src="${imgSrc}" class="card-img-top" alt="${title}">
                    <h4 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text text-secondary">${date}</p>
            </div>
        </div>
        `;
    }

    contenidoHTML += `<button class="btn btn-primary my-2" id="verMas">Ver mas</button>`;
    container.innerHTML = contenidoHTML;

    document.querySelector("#verMas").addEventListener("click", () => {
        contenidoMaximo += 12; 
        showResults(datos);
    });
}