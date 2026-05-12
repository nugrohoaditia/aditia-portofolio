const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeText = document.querySelector("#themeText");
const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");
const scrollTop = document.querySelector("#scrollTop");

const storedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  themeIcon.textContent = isDark ? "Sun" : "Moon";
  themeText.textContent = isDark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("theme", theme);
}

setTheme(storedTheme || "light");

themeToggle.addEventListener("click", () => {
  setTheme(root.classList.contains("dark") ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden", isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".skill-item").forEach((item) => {
  const progress = document.createElement("span");
  const bar = document.createElement("span");
  const level = Number(item.dataset.level || 0) / 100;
  progress.className = "progress";
  bar.className = "bar";
  item.style.setProperty("--level", level);
  progress.appendChild(bar);
  item.appendChild(progress);
});

// Reveals content and skill progress when sections enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll(".skill-item").forEach((skill) => {
        skill.classList.add("is-visible");
      });
      if (entry.target.classList.contains("skill-item")) {
        entry.target.classList.add("is-visible");
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal, .skill-item").forEach((element) => {
  observer.observe(element);
});

window.addEventListener("scroll", () => {
  scrollTop.classList.toggle("hidden", window.scrollY < 600);
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".project-card a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.closest(".project-card").classList.add("ring-2", "ring-sky-200");
  });
  link.addEventListener("mouseleave", () => {
    link.closest(".project-card").classList.remove("ring-2", "ring-sky-200");
  });
});
