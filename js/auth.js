/* ===================================================
   Lumière Fine Art Gallery - Authentication Handler
   Handles login, registration, validation & local storage
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initLoginForm();
  initSignupForm();
  initDemoLogin();
});

// Toggle password visibility
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);

      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = 'Hide';
        } else {
          input.type = 'password';
          btn.textContent = 'Show';
        }
      }
    });
  });
}

// Login Form Handling
function initLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  const errorAlert = document.getElementById('loginAlert');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberMe = document.getElementById('rememberMe')?.checked;

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      showAuthAlert(errorAlert, 'Please enter both email and password.', 'danger');
      return;
    }

    // Check stored users or demo account
    const registeredUsers = JSON.parse(localStorage.getItem('lumiere_registered_users') || '[]');
    
    // Default demo user
    const demoUser = {
      name: 'Joshua Antony',
      email: 'demo@gallery.org',
      password: 'password123'
    };

    let matchedUser = null;

    if (email === demoUser.email && password === demoUser.password) {
      matchedUser = demoUser;
    } else {
      matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email && u.password === password);
    }

    if (matchedUser) {
      showAuthAlert(errorAlert, `Welcome back, ${matchedUser.name}! Redirecting...`, 'success');

      const sessionData = {
        name: matchedUser.name,
        email: matchedUser.email,
        loggedInAt: new Date().toISOString()
      };

      localStorage.setItem('lumiere_current_user', JSON.stringify(sessionData));

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } else {
      showAuthAlert(errorAlert, 'Invalid email or password. Please try again or use the demo login.', 'danger');
    }
  });
}

// SignUp Form Handling
function initSignupForm() {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;

  const alertBox = document.getElementById('signupAlert');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const movement = document.getElementById('signupMovement')?.value || 'Impressionism';
    const terms = document.getElementById('termsCheck')?.checked;

    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      showAuthAlert(alertBox, 'All fields are required.', 'danger');
      return;
    }

    if (!isValidEmail(email)) {
      showAuthAlert(alertBox, 'Please enter a valid email address.', 'danger');
      return;
    }

    if (password.length < 6) {
      showAuthAlert(alertBox, 'Password must be at least 6 characters.', 'danger');
      return;
    }

    if (password !== confirmPassword) {
      showAuthAlert(alertBox, 'Passwords do not match.', 'danger');
      return;
    }

    if (!terms) {
      showAuthAlert(alertBox, 'You must agree to the Terms & Conditions.', 'danger');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('lumiere_registered_users') || '[]');
    const existing = users.find(u => u.email.toLowerCase() === email);

    if (existing) {
      showAuthAlert(alertBox, 'An account with this email already exists. Please log in.', 'danger');
      return;
    }

    // Save user
    const newUser = {
      name: name,
      email: email,
      password: password,
      favoriteMovement: movement,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('lumiere_registered_users', JSON.stringify(users));

    // Also set active session
    localStorage.setItem('lumiere_current_user', JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      loggedInAt: new Date().toISOString()
    }));

    showAuthAlert(alertBox, 'Account successfully created! Redirecting to gallery...', 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1400);
  });
}

// Quick fill demo button for evaluation convenience
function initDemoLogin() {
  const quickDemoBtn = document.getElementById('quickDemoLoginBtn');
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');
      if (emailInput && passwordInput) {
        emailInput.value = 'demo@gallery.org';
        passwordInput.value = 'password123';
        document.getElementById('loginForm')?.dispatchEvent(new Event('submit'));
      }
    });
  }
}

function showAuthAlert(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.className = `alert-message alert-${type}`;
  element.style.display = 'block';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
