function loadPage(page) {
  fetch(page)
  .then(response => response.text())
  .then(html => {
    document.getElementById('contentContainer').innerHTML = html;

    // Now hide the sidebar offcanvas after loading content
    const sidebarEl = document.getElementById('sidebar');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(sidebarEl) 
                      || new bootstrap.Offcanvas(sidebarEl);
    bsOffcanvas.hide();
    
    // Reset scroll position and check button visibility after loading new content
    window.scrollTo(0, 0);
    setTimeout(toggleBackToTopButton, 100); // Small delay to ensure content is rendered
  })
  .catch(err => console.error('Error loading page:', err));
}

// Load default page on first load
window.addEventListener('DOMContentLoaded', () => {
  loadPage('dashboard.html');
});

// For the sidebar's hover
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = new bootstrap.Offcanvas('#sidebar');
  const toggle = document.getElementById('sidebarToggle');
  const sidebarElement = document.getElementById('sidebar');

  let showTimeout, hideTimeout;

  // Show sidebar on hover
  toggle.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      sidebar.show();
    }, 200); // slight delay to prevent accidental hover
  });

  // Keep it open while hovering on sidebar itself
  sidebarElement.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });

  // Hide sidebar when mouse leaves sidebar or toggle
  sidebarElement.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      sidebar.hide();
    }, 300);
  });
});

// Function for updating the time in the navbar and updating it every second
function updateDateTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  document.getElementById('dateTime').innerHTML = 
  `<span class="dateStr fw-bold text-end d-block">${dateStr}</span>` +
  `<span class="timeStr d-block mt-2">${timeStr}</span>`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Back to Top Button functionality - Define globally accessible functions
let backToTopBtn;

function toggleBackToTopButton() {
  if (!backToTopBtn) {
    backToTopBtn = document.getElementById('backToTopBtn');
  }
  
  if (backToTopBtn) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollTop > 100) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
}

function scrollToTop() {
  // Use the most compatible method
  const scrollToTopSmooth = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (currentScroll > 0) {
      window.requestAnimationFrame(scrollToTopSmooth);
      window.scrollTo(0, currentScroll - (currentScroll / 8));
    }
  };
  

  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    scrollToTopSmooth();
  }
}


document.addEventListener('DOMContentLoaded', function() {

  setTimeout(() => {
    backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {

      window.addEventListener('scroll', toggleBackToTopButton, { passive: true });
      backToTopBtn.addEventListener('click', scrollToTop);
      

      toggleBackToTopButton();
      
      console.log('Back to top button initialized successfully');
    } else {
      console.error('Back to top button not found in DOM');
    }
  }, 500);
});

// Optional: Add confirmation for logout
function confirmLogout(event) {
  return confirm('Are you sure you want to logout?');
}