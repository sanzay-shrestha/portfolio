// Smooth scroll for nav links
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Fade-in animation on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

// Dark mode toggle
const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Update button text
  if (document.body.classList.contains('dark-mode')) {
    toggleButton.textContent = '☀️ Light Mode';
  } else {
    toggleButton.textContent = '🌙 Dark Mode';
  }
});

// Modal functions
function openModal(id) {
  document.getElementById(id + '-modal').style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id + '-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
};
