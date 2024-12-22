document.addEventListener('DOMContentLoaded', function() {
    about();
    buttonActive();
    crearGaleria();
})

const main = document.querySelector('.main');
const tarjeta = document.querySelector('.tarjeta');
const desk = document.querySelector('.desk');
tarjeta.addEventListener('click', onClickTarjeta);

function onClickTarjeta(e) {
    limpiarContenido();

    const tarjetaElement = e.target.closest('.tarjeta');

    if (tarjetaElement.getAttribute('id') === '1') {
        desk.style.display = 'block';
    }
}

function limpiarContenido() {
    while ( main.firstChild ) {
        main.removeChild(main.firstChild);
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

function crearGaleria() {
    const galeria_imagenes = 8
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= galeria_imagenes; i++) {
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.png" alt="imagen galeria">
        `;

        // Event Handler
        imagen.onclick = function() {
            mostarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostarImagen(i) {
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.png" alt="imagen galeria">
    `;

    // Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    // Boton
    const cerrarBtn = document.createElement('BUTTON');
    cerrarBtn.textContent = 'X';
    cerrarBtn.classList.add('btn-cerrar');
    cerrarBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarBtn)

    // Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden')

        modal?.remove();
    }, 500);
}