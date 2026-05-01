function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  icon.classList.toggle("open");
  menu.classList.toggle("open");
}

// Scroll to top
const scrollBtn = document.getElementById("scroll-top-btn");

window.addEventListener("scroll", () => {
  scrollBtn.classList.toggle("visible", window.scrollY > 300);
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Fade-in animations
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach((el) => fadeObserver.observe(el));

// Stagger children animation
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(".stagger-child");
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 80}ms`;
          child.classList.add("visible");
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".about-containers, .experience-details-container")
  .forEach((el) => staggerObserver.observe(el));

// Dark mode toggle
const darkToggles = document.querySelectorAll(".dark-toggle");

function applyDark(isDark) {
  document.body.classList.toggle("dark", isDark);
  darkToggles.forEach((btn) => {
    btn.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
  localStorage.setItem("dark", isDark ? "1" : "0");
}

applyDark(localStorage.getItem("dark") === "1");

darkToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyDark(!document.body.classList.contains("dark"));
  });
});

// Typing animation
const roles = ["ML Engineer", "Web Developer", "AI Enthusiast", "Deep Learning Researcher"];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById("typed-role");

function typeRole() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  typedEl.textContent = isDeleting
    ? current.slice(0, charIdx--)
    : current.slice(0, charIdx++);

  if (!isDeleting && charIdx > current.length) {
    isDeleting = true;
    setTimeout(typeRole, 1800);
    return;
  }
  if (isDeleting && charIdx < 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(typeRole, 400);
    return;
  }
  setTimeout(typeRole, isDeleting ? 60 : 100);
}

typeRole();
