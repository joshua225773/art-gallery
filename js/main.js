/* ===================================================
   Lumière Fine Art Gallery - Main Interactions
   Handles navigation, session header, modal viewer & likes
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  checkAuthStatus();
  initModalViewer();
  initArtworkActions();
  initNewsletter();
});

// Mobile Hamburger Menu Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('show');
      }
    });
  }
}

// Check logged-in user and update navbar accordingly
function checkAuthStatus() {
  const authContainer = document.querySelector('.nav-auth-group');
  if (!authContainer) return;

  const savedUser = localStorage.getItem('lumiere_current_user');

  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      const displayName = user.name ? user.name.split(' ')[0] : 'Member';

      authContainer.innerHTML = `
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary);">
          Hello, ${escapeHtml(displayName)}
        </span>
        <button id="logoutBtn" class="btn btn-outline btn-sm">Log Out</button>
      `;

      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('lumiere_current_user');
          alert('You have been logged out.');
          window.location.reload();
        });
      }
    } catch (e) {
      console.error('Error parsing user session', e);
    }
  }
}

// Image Zoom Modal Viewer
function initModalViewer() {
  const zoomableImages = document.querySelectorAll('.zoomable-image');
  const modalOverlay = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImageDisplay');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay || !modalImg) return;

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || 'Artwork Preview';
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

// Like button and Audio Guide simulator
function initArtworkActions() {
  const likeBtn = document.getElementById('likeArtworkBtn');
  const likeCountSpan = document.getElementById('likeCount');

  if (likeBtn && likeCountSpan) {
    const artworkId = window.location.pathname.split('/').pop().replace('.html', '');
    const storageKey = `lumiere_liked_${artworkId}`;

    if (localStorage.getItem(storageKey) === 'true') {
      likeBtn.classList.add('liked');
      likeBtn.querySelector('span').textContent = 'Liked';
    }

    likeBtn.addEventListener('click', () => {
      let currentLikes = parseInt(likeCountSpan.textContent, 10) || 124;
      const isLiked = likeBtn.classList.toggle('liked');

      if (isLiked) {
        currentLikes += 1;
        likeBtn.querySelector('span').textContent = 'Liked';
        localStorage.setItem(storageKey, 'true');
      } else {
        currentLikes = Math.max(0, currentLikes - 1);
        likeBtn.querySelector('span').textContent = 'Add to Favorites';
        localStorage.removeItem(storageKey);
      }
      likeCountSpan.textContent = currentLikes;
    });
  }

  // Audio Guide narrative toggle
  const audioBtn = document.getElementById('audioGuideBtn');
  if (audioBtn) {
    let isPlaying = false;
    let synthUtterance = null;

    audioBtn.addEventListener('click', () => {
      const audioStatus = document.getElementById('audioGuideStatus');
      const artTitle = document.querySelector('.artwork-detail-title')?.textContent || 'this artwork';
      const artDesc = document.querySelector('.artwork-description-box p')?.textContent || '';

      if (!isPlaying) {
        isPlaying = true;
        audioBtn.textContent = 'Pause Narration';
        if (audioStatus) audioStatus.textContent = 'Playing audio commentary...';

        // Use Web Speech API if supported for genuine natural voiceover
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          synthUtterance = new SpeechSynthesisUtterance(`Curator's commentary on ${artTitle}. ${artDesc}`);
          synthUtterance.rate = 0.95;
          synthUtterance.pitch = 1.0;
          synthUtterance.onend = () => {
            isPlaying = false;
            audioBtn.textContent = 'Listen to Audio Commentary';
            if (audioStatus) audioStatus.textContent = 'Narration completed.';
          };
          window.speechSynthesis.speak(synthUtterance);
        }
      } else {
        isPlaying = false;
        audioBtn.textContent = 'Listen to Audio Commentary';
        if (audioStatus) audioStatus.textContent = 'Narration paused.';
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
    });
  }
}

// Newsletter subscription alert
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value.trim()) {
        alert(`Thank you for subscribing to Lumière Gallery Gazette with ${input.value.trim()}!`);
        input.value = '';
      }
    });
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
