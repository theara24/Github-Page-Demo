document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });

  // Carousel functionality
  const carousel = document.getElementById('custom-carousel');
  const slides = carousel.querySelectorAll('.carousel-item');
  const indicators = carousel.querySelectorAll('[data-slide]');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove(
        'translate-x-0',
        'translate-x-full',
        '-translate-x-full'
      );
      slide.classList.add(
        i === index
          ? 'translate-x-0'
          : i < index
          ? '-translate-x-full'
          : 'translate-x-full'
      );
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('bg-white', i === index);
      indicator.classList.toggle('bg-gray-400', i !== index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  // Typing effect
  const words = ['Svelte training'];
  let i = 0;
  let j = 0;
  let currentWord = '';
  let isDeleting = false;

  function type() {
    currentWord = words[i];
    if (isDeleting) {
      document.getElementById('typewriter').textContent = currentWord.substring(
        0,
        j - 1
      );
      j--;
      if (j == 0) {
        isDeleting = false;
        i++;
        if (i == words.length) {
          i = 0;
        }
      }
    } else {
      document.getElementById('typewriter').textContent = currentWord.substring(
        0,
        j + 1
      );
      j++;
      if (j == currentWord.length) {
        isDeleting = true;
      }
    }
    setTimeout(type, 100);
  }

  // Initialize typing effect and carousel
  type();
  showSlide(currentIndex);
  AOS.init(); // Initialize AOS
  // Auto slide
  const autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

  // Cleanup interval on component unmount
  return () => clearInterval(autoSlideInterval);
});
