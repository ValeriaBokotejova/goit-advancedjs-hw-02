function highlightActiveLink() {
  const currentPage = window.location.pathname.replace(/.*\//, '');

  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href').replace(/.*\//, '');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', highlightActiveLink);
