// Variables
const main = document.querySelector('.main');
const tarjeta = document.querySelector('.tarjeta');
const desk = document.querySelector('.desk');
tarjeta.addEventListener('click', onClickTarjeta);

// EventListeners
cargarEventListeners()
function cargarEventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        about();
        buttonActive();
        mostrarElementos(elementos)
    })
}

// Funciones
function mostrarElementos(elementos) {
    console.log(elementos)

    elementos.forEach(elemento => {
        const section = document.createElement('SECTION')
        const lista = document.createElement('UL')
        const { titulo, seccion, id, link, avif, webp, jpg, desc } = elemento;

        section.innerText = '${titulo}'
        lista.classList.add('list')
        lista.innerHTML = `
            <li class="list-content"><a class="link-list" href="https://acortar.link/lP69KF" target="_blank">
                <div class="tarjeta" id="1">
                    <div class="tarjeta-img">
                        <picture>
                            <source srcset="build/img/gallery/full/logitechkeys.avif" type="image/avif">
                            <source srcset="build/img/gallery/full/logitechkeys.webp" type="image/webp">
                            <img width="300" height="200" loading="lazy" src="build/img/gallery/full/logitechkeys.jpg" alt="">
                        </picture>
                    </div>
        
                    <div class="tarjeta-info">
                        <h2>Logitech MX Keys</h2>
        
                        <p>Teclado inalámbrico, bajo Perfil, preciso y silencioso, Teclas programables, retroiluminado, Bluetooth, USB C Recargable, para Windows PC, Linux, Chrome, Mac-Negro</p>
                    </div>
                </div>
            </a></li>
        `

        // Inserta en el HTML
        document.getElementById('resultado').appendChild(camisaHTML);
    })
}

function onClickTarjeta(e) {
    limpiarContenido();

    const tarjetaElement = e.target.closest('.tarjeta');

    if (tarjetaElement.getAttribute('id') === '1') {
        desk.style.display = 'block';
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