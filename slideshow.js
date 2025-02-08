let slideIndex = 1;
let slideshowPaused = false;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Remove all classes first
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove('active', 'prev', 'next');
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Set active slide
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].className += " active";

    // Set previous slide
    const prevIndex = slideIndex - 2 < 0 ? slides.length - 1 : slideIndex - 2;
    slides[prevIndex].style.display = "block";
    slides[prevIndex].classList.add('prev');

    // Set next slide
    const nextIndex = slideIndex % slides.length;
    slides[nextIndex].style.display = "block";
    slides[nextIndex].classList.add('next');
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function toggleSlideshow() {
    slideshowPaused = !slideshowPaused;
}

// Auto advance slides
function autoAdvance() {
    if (!slideshowPaused) {
        plusSlides(1);
    }
    setTimeout(autoAdvance, 5000);
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    autoAdvance();

    // Add hover pause functionality
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => { slideshowPaused = true; });
    slideshowContainer.addEventListener('mouseleave', () => { slideshowPaused = false; });
});
