// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Actualizar año en el footer ---
    const currentYearElem = document.getElementById('currentYear');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // --- Animación de Partículas en Canvas ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray;

        // Ajustar tamaño del canvas al de la ventana
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Inicializar tamaño

        // Clase para cada partícula
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            // Método para dibujar la partícula individual
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            // Método para actualizar la posición de la partícula y manejar bordes
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        // Crear el array de partículas
        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000); // Ajustar densidad
            const particleColors = ['#E91E63', '#EC407A', '#F06292', '#F48FB1']; // Tonos de rosa/primario

            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 1; // Tamaño entre 1 y 3
                const x = Math.random() * (canvas.width - size * 2) + size;
                const y = Math.random() * (canvas.height - size * 2) + size;
                const directionX = (Math.random() * 0.4) - 0.2; // Movimiento lento
                const directionY = (Math.random() * 0.4) - 0.2;
                const color = particleColors[Math.floor(Math.random() * particleColors.length)];
                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Loop de animación
        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }
        
        // Solo inicializar y animar si el canvas existe
        initParticles();
        animateParticles();
        
        // Re-inicializar partículas en resize para ajustar densidad
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles(); // Recrear partículas con el nuevo tamaño
        });

    } else {
        console.warn("Elemento #particle-canvas no encontrado. La animación de partículas no se iniciará.");
    }


    // --- Interacción con el Icono del Dragón y Modal ---
    const dragonIcon = document.getElementById('dragon-icon');
    const dragonModal = document.getElementById('dragon-modal');
    const closeDragonModal = document.getElementById('close-dragon-modal');

    if (dragonIcon && dragonModal && closeDragonModal) {
        dragonIcon.addEventListener('click', () => {
            // Añadir clase para animación CSS
            dragonIcon.classList.add('clicked');
            setTimeout(() => dragonIcon.classList.remove('clicked'), 700); // Duración de la animación

            // Mostrar modal
            dragonModal.classList.remove('hidden');
            setTimeout(() => { // Pequeño delay para que la transición de opacidad y escala funcione
                dragonModal.classList.remove('opacity-0');
                dragonModal.querySelector('div > div').classList.remove('scale-95'); // El div interno
            }, 10); 
        });

        closeDragonModal.addEventListener('click', () => {
            dragonModal.classList.add('opacity-0');
            dragonModal.querySelector('div > div').classList.add('scale-95');
            setTimeout(() => dragonModal.classList.add('hidden'), 300); // Duración de la transición
        });

        // Cerrar modal al hacer clic fuera del contenido
        dragonModal.addEventListener('click', (event) => {
            if (event.target === dragonModal) {
                closeDragonModal.click();
            }
        });
    } else {
        console.warn("Elementos para la interacción del dragón no encontrados (dragon-icon, dragon-modal, close-dragon-modal).");
    }


    // --- Smooth scroll para los enlaces de navegación ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animaciones al hacer scroll (Fade In Up) ---
    // Usaremos Intersection Observer para eficiencia
    const animatedElements = document.querySelectorAll('.animate-fade-in-up');
    if (animatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = entry.target.style.animationDelay || '0s'; // Asegurar que tenga un delay
                    entry.target.classList.add('opacity-1', 'translate-y-0'); // Clases finales de Tailwind
                    // No es necesario quitar 'animate-fade-in-up' si la animación solo corre una vez con 'forwards'
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, { threshold: 0.1 }); // Activar cuando el 10% del elemento es visible

        animatedElements.forEach(el => {
            el.classList.add('opacity-0', 'translate-y-5'); // Estado inicial para la animación de Tailwind
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores sin IntersectionObserver o si no hay elementos
        animatedElements.forEach(el => {
            el.classList.add('opacity-1', 'translate-y-0'); // Simplemente mostrarlos
        });
    }
});

