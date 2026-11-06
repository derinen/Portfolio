const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".hero-grid, .hero-art, .hero-bottom, .section-heading, .intro-layout, .portfolio-intro, .project-card, .ib-intro, .ib-project, .ib-gallery-heading, .ib-gallery-item, .ib-connection, .footer-main, .footer-details, .copyright"
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

  revealTargets.forEach((element, index) => {
    element.dataset.reveal = "";
    if (element.classList.contains("project-card")) {
      element.style.setProperty("--reveal-delay", `${(index % 2) * 100}ms`);
    }
    revealObserver.observe(element);
  });
}
