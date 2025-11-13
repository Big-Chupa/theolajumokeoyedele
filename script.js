// PRELOADER
    window.addEventListener("load", () => {
      setTimeout(
        () => document.getElementById("preloader").classList.add("hide"),
        2000
      );
    });

    // SCROLL ANIMATION
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
          else entry.target.classList.remove("show");
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));

    // CAROUSEL (slide movement + pause + swipe)
    let currentIndex = 0;
    const carouselInner = document.getElementById("carousel-inner");
    const slides = document.querySelectorAll(".testimonial");
    const totalSlides = slides.length;
    const carousel = document.getElementById("carousel");

    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }

    // Auto-slide control
    let autoSlide = setInterval(nextSlide, 4000);
    function pauseAutoSlide() {
      clearInterval(autoSlide);
    }
    function resumeAutoSlide() {
      autoSlide = setInterval(nextSlide, 4000);
    }

    // Pause/resume on hover/touch
    carousel.addEventListener("mouseenter", pauseAutoSlide);
    carousel.addEventListener("mouseleave", resumeAutoSlide);
    carousel.addEventListener("touchstart", pauseAutoSlide);
    carousel.addEventListener("touchend", resumeAutoSlide);

    // Swipe gestures
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextSlide();
      if (endX - startX > 50) prevSlide();
    });

    // HAMBURGER MENU
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navMenu.classList.toggle("show");
    });
    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navMenu.classList.remove("show");
      });
    });