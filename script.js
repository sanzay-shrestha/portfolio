// =======================
// Dark Mode Toggle
// =======================
const toggleBtn = document.getElementById("dark-mode-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// =======================
// Typing Animation
// =======================
const roles = ["learning MERN stack", "building projects", "optimizing workflows"];
let roleIndex = 0, charIndex = 0;
const typingSpan = document.querySelector(".typing");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingSpan.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}

type();

// =======================
// Section Fade-In on Scroll
// =======================
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
});

// =======================
// Scroll-to-Top Button
// =======================
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =======================
// Project Filter
// =======================
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(project => {
    if (category === 'all' || project.classList.contains(category)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// =======================
// Particle Background
// =======================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleCount; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9800";
    ctx.fill();

    // Connect nearby particles
    for (let j = i + 1; j < particleCount; j++) {
      let p2 = particles[j];
      let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(255, 152, 0, 0.2)";
        ctx.stroke();
      }
    }

    // Move particle
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }

  requestAnimationFrame(draw);
}

draw();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
const speed = 200; // lower = faster

function animateCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Trigger when stats section is visible
window.addEventListener('scroll', () => {
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    animateCounters();
  }
});

// Carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-play carousel
let autoPlayInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 4000); // change slide every 4s

// Pause auto-play on hover
track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
track.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 4000);
});

// Swipe gestures
let startX = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    // swipe left
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  } else if (endX - startX > 50) {
    // swipe right
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }
});

// Blog fade-in
const blogPosts = document.querySelectorAll('.blog-post');
window.addEventListener("scroll", () => {
  blogPosts.forEach(post => {
    const rect = post.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      post.classList.add("visible");
    }
  });   
});
particlesJS("bgCanvas", {
  particles: {
    number: { value: 40 },   // fewer particles (default is often 100+)
    size: { value: 2 },      // smaller particles
    move: { speed: 1 }       // slower movement
  },
  interactivity: {
    events: {
      onhover: { enable: false }, // disable hover effects if not needed
    }
  }
});
