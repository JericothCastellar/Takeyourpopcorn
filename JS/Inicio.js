//* JS DEL BOTÓN DESPLEGABLE DEL HEADER */
const toggleButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

toggleButton.addEventListener('click', () => {
    nav.classList.toggle('active');
});

//* JS DEL SLIDER (automático con dots) */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let slideInterval = setInterval(nextSlide, 5000);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    current = index;
}

function nextSlide() {
    const nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
    });
});
//JS DEL CARRUSEL DE CONTENIDO
document.querySelectorAll('.carrusel').forEach(carrusel => {
    const contenedor = carrusel.querySelector('.contenedor-carrusel');
    const prev = carrusel.querySelector('.prev');
    const next = carrusel.querySelector('.next');
    let index = 0;

    function moverCarrusel() {
        const items = carrusel.querySelectorAll('.movie');
        if (items.length === 0) return;

        const estilo = getComputedStyle(items[0]);
        const anchoItem = items[0].offsetWidth +
            parseInt(estilo.marginLeft) +
            parseInt(estilo.marginRight);

        contenedor.style.transform = `translateX(-${index * anchoItem}px)`;
    }

    next.addEventListener('click', () => {
        const items = carrusel.querySelectorAll('.movie').length;
        index++;
        if (index >= items) index = 0; // vuelve al inicio al llegar al final
        moverCarrusel();
    });

    prev.addEventListener('click', () => {
        if (index > 0) {   // solo retrocede si no está en el inicio
            index--;
            moverCarrusel();
        }
    });

    window.addEventListener('resize', moverCarrusel);
    moverCarrusel(); // inicializar
});