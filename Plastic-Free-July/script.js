document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.getElementById('indicators');
    let currentSlide = 0;
    let isAnimating = false;

    // Generate Indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (isAnimating || index === currentSlide || index < 0 || index >= slides.length) return;
        isAnimating = true;

        // Hide current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Show new
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Prevent rapid switching
        setTimeout(() => {
            isAnimating = false;
        }, 800); // matches CSS transition duration
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            goToSlide(currentSlide - 1);
        }
    });

    // Mouse Wheel Navigation (Optional, but adds to the presentation feel)
    document.addEventListener('wheel', (e) => {
        if (isAnimating) return;
        if (e.deltaY > 0) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(currentSlide - 1);
        }
    }, { passive: true });
});
