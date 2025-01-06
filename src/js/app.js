// Variables
const main = document.querySelector('.main');
const tarjeta = document.querySelector('.tarjeta');
const desk = document.querySelector('#desk');
const pc = document.querySelector('#pc');

// EventListeners
cargarEventListeners()
function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        about();
        buttonActive();
        mostrarElementos(elementos)
        mostrarComponentes(configuraciones)
    })

    main.addEventListener('click', onClickTarjeta);
}

// Funciones
function mostrarElementos(elementos) {
    console.log(elementos)

    elementos.forEach(elemento => {
        const section = document.createElement('SECTION')
        section.innerHTML = `<h2 class="txt-align">${elemento.titulo}</h2>`;

        const list = document.createElement('UL')
        list.classList.add('list')

        elemento.seccion.forEach(producto => {
            const { link, nombre, avif, webp, jpg, desc } = producto;

            const listItem = document.createElement('LI');
            listItem.classList.add('list-content');

            listItem.innerHTML = `
                <li class="list-content"><a class="link-list" href="${link}" target="_blank">
                    <div class="tarjeta">
                        <div class="tarjeta-img">
                            <picture>
                                <source srcset="${avif}" type="image/avif">
                                <source srcset="${webp}" type="image/webp">
                                <img width="300" height="200" loading="lazy" src="${jpg}" alt="Imagen de elemento">
                            </picture>
                        </div>
            
                        <div class="tarjeta-info">
                            <h2>${nombre}</h2>
            
                            <p>${desc}</p>
                        </div>
                    </div>
                </a></li>
            `

            list.appendChild(listItem)
        })

        // Inserta en el HTML
        section.appendChild(list)
        desk.appendChild(section)
    })
}

function mostrarComponentes(configuraciones) {
    console.log(configuraciones)

    configuraciones.forEach(configuracion => {
        const section = document.createElement('SECTION')
        section.innerHTML = `<h2 class="txt-align">${configuracion.titulo}</h2>`;

        const list = document.createElement('UL')
        list.classList.add('list')

        configuracion.componentes.forEach(componente => {
            const { link, nombre, avif, webp, jpg } = componente;

            const listItem = document.createElement('LI');
            listItem.classList.add('list-content');

            listItem.innerHTML = `
                <li class="list-content"><a class="link-list" href="${link}" target="_blank">
                    <div class="tarjeta">
                        <div class="tarjeta-img">
                            <picture>
                                <source srcset="${avif}" type="image/avif">
                                <source srcset="${webp}" type="image/webp">
                                <img width="300" height="200" loading="lazy" src="${jpg}" alt="Imagen de elemento">
                            </picture>
                        </div>
            
                        <div class="tarjeta-info">
                            <h2>${nombre}</h2>
                        </div>
                    </div>
                </a></li>
            `

            list.appendChild(listItem)
        })

        // Inserta en el HTML
        section.appendChild(list)
        pc.appendChild(section)
    })
}

function onClickTarjeta(e) {
    limpiarContenido();

    const tarjetaElement = e.target.closest('.tarjeta');

    if(tarjetaElement.getAttribute('id') === '1') {
        desk.classList.add('desk')
        desk.classList.remove('hidden')
    } else {
        pc.classList.add('pc')
        pc.classList.remove('hidden')
    }
}

function about() {
    // Seleccionar las secciones que quieres animar
    const sections = document.querySelectorAll('.projects, .about');

    // Crear el Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Umbral: el 10% de la sección visible

    // Asignar el observer a cada sección
    sections.forEach(section => {
        section.classList.add('fade-in'); // Agregar la clase inicial para ocultarlas
        observer.observe(section);
    });

    // Seleccionar los elementos para los botones y las cajas de trabajo
    const jobBoxes = document.querySelectorAll('.job-box');
    const buttons = document.querySelectorAll('.btn-company');

    // Función para mostrar la caja de trabajo correcta
    function showJobBox(company) {
        jobBoxes.forEach(box => {
            if (box.id === company) {
                box.classList.add('active'); // Aplica la clase activa con la animación de desvanecimiento
            } else {
                box.classList.remove('active'); // Remueve la clase activa
            }
        });
    }

    // Agregar listeners a los botones para cambiar el contenido y aplicar la animación
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Cambiar la clase activa de los botones
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Mostrar el contenido del job-box correspondiente
            const company = this.getAttribute('data-company');
            showJobBox(company);
        });
    });
}

function buttonActive() {
    const buttons = document.querySelectorAll('.btn-company');
    const spanClick = document.querySelector('.btn-click');
    
    // Obtener el botón activo por defecto y su posición
    const activeButton = document.querySelector('.btn-company.active');
    if (activeButton) {
        const buttonTop = activeButton.offsetTop;
        const buttonHeight = activeButton.offsetHeight;
        spanClick.style.top = buttonTop + 'px';
        spanClick.style.height = buttonHeight + 'px';
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar la clase active al botón presionado
            this.classList.add('active');
    
            // Obtener la posición del botón activo
            const buttonTop = this.offsetTop;
            const buttonHeight = this.offsetHeight;
    
            // Mover el span al botón activo
            spanClick.style.top = buttonTop + 'px';
            spanClick.style.height = buttonHeight + 'px';
        });
    });
}

function limpiarContenido() {
    while ( main.firstChild ) {
        main.removeChild(main.firstChild);
    }
}