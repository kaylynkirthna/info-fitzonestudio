// ====== FORM VALIDATION ======
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const program = document.getElementById("program").value;

  // Basic empty field check
  if (!name || !email || !program) {
    showTempAlert("⚠️ Please fill in all fields before submitting.", "danger");
    return;
  }

  // Basic email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showTempAlert("❌ Please enter a valid email address.", "danger");
    return;
  }

  // Show Bootstrap success modal
  const modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();

  // Reset the form
  this.reset();

  // Optional: subtle success alert
  setTimeout(() => {
    showTempAlert("✅ Form submitted successfully!", "success");
  }, 700);
});

// ====== TEMP ALERT FUNCTION ======
function showTempAlert(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 shadow`;
  alertDiv.style.zIndex = "2000";
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.style.opacity = "0";
    alertDiv.style.transition = "opacity 0.5s ease";
    setTimeout(() => alertDiv.remove(), 500);
  }, 2500);
}

// ====== DARK MODE TOGGLE ======
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme on startup
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  if (toggleBtn) toggleBtn.textContent = "☀️ Light Mode";
}

// Smooth fade when changing theme
function smoothThemeTransition() {
  body.style.transition = "background-color 0.6s ease, color 0.6s ease, filter 0.6s ease";
}

// Toggle mode
toggleBtn?.addEventListener("click", () => {
  smoothThemeTransition();
  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Add a quick flash animation
  body.animate(
    [{ opacity: 0.8 }, { opacity: 1 }],
    { duration: 400, easing: "ease-out" }
  );
});
