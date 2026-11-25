(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  // Escape HTML when building template strings from config data
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Toast feedback helper
  let toastTimer = null;
  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3200);
  }

  // Copy email helper
  async function copyEmail() {
    const email = data.brand.email;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const helper = document.createElement("textarea");
        helper.value = email;
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        document.body.removeChild(helper);
      }
      showToast(`Copied ${email} to clipboard`);
    } catch {
      showToast(`Email: ${email}`);
    }
  }

  // Populate static sections from PORTFOLIO_DATA
  function hydrateContent() {
    const { brand, hero, about, skills, experience, socials } = data;

    document.title = `${brand.title} — ${brand.shortName} | ${brand.role}`;
    $("#brand-monogram").textContent = brand.monogram;
    $("#brand-title").textContent = brand.title.replace(/\s*portfolio$/i, "");
    $("#footer-brand").textContent = brand.title;
    $("#current-year").textContent = String(new Date().getFullYear());

    $("#hero-availability").textContent = brand.availability;
    $("#hero-eyebrow").textContent = hero.eyebrow;
    $("#hero-headline").textContent = hero.headline;
    $("#hero-subheadline").textContent = hero.subheadline;

    const primaryCta = $("#hero-primary-cta");
    primaryCta.textContent = hero.primaryCta.label;
    primaryCta.href = hero.primaryCta.href;

    const secondaryCta = $("#hero-secondary-cta");
    secondaryCta.textContent = hero.secondaryCta.label;
    secondaryCta.href = hero.secondaryCta.href;

    $("#profile-monogram").textContent = brand.monogram;
    $("#profile-name").textContent = brand.shortName;
    $("#profile-role").textContent = brand.role;
    $("#profile-location").textContent = brand.location;
    $("#code-location").textContent = `"${brand.location}"`;

    $("#hero-metrics").innerHTML = hero.metrics
      .map(
        (m) => `
        <div>
          <dt>${escapeHtml(m.label)}</dt>
          <dd>${escapeHtml(m.value)}</dd>
        </div>`
      )
      .join("");

    $("#about-heading").textContent = about.heading;
    $("#about-paragraphs").innerHTML = about.paragraphs
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");

    $("#about-highlights").innerHTML = about.highlights
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    $("#skills-grid").innerHTML = skills
      .map(
        (group) => `
        <article class="card skill-card reveal">
          <h3>${escapeHtml(group.category)}</h3>
          <div class="skill-pills">
            ${group.items
              .map((skill) => `<span class="skill-pill">${escapeHtml(skill)}</span>`)
              .join("")}
          </div>
        </article>`
      )
      .join("");

    $("#experience-timeline").innerHTML = experience
      .map(
        (item) => `
        <article class="card timeline-item reveal">
          <div class="timeline-meta">
            <span class="timeline-period">${escapeHtml(item.period)}</span>
            <p class="timeline-company">${escapeHtml(item.company)}</p>
          </div>
          <div>
            <h3 class="timeline-role">${escapeHtml(item.role)}</h3>
            <p class="timeline-summary">${escapeHtml(item.summary)}</p>
            <ul class="timeline-bullets">
              ${item.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
            </ul>
          </div>
        </article>`
      )
      .join("");

    const emailLink = $("#contact-email-link");
    emailLink.textContent = brand.email;
    emailLink.href = `mailto:${brand.email}`;

    $("#social-links").innerHTML = socials
      .map(
        (s) => `
        <a class="social-chip" href="${escapeHtml(s.href)}" target="_blank" rel="noopener noreferrer">
          <strong>${escapeHtml(s.label)}</strong>
          <span>${escapeHtml(s.handle)}</span>
        </a>`
      )
      .join("");
  }

  // Project filtering & modal
  let activeCategory = "All";
  let lastFocusedTrigger = null;

  function renderProjectFilters() {
    const categories = ["All", ...new Set(data.projects.map((p) => p.category))];
    const bar = $("#project-filters");
    bar.innerHTML = categories
      .map(
        (cat) => `
        <button
          type="button"
          class="filter-btn ${cat === activeCategory ? "active" : ""}"
          role="tab"
          aria-selected="${cat === activeCategory ? "true" : "false"}"
          data-category="${escapeHtml(cat)}"
        >${escapeHtml(cat)}</button>`
      )
      .join("");
  }

  function renderProjects() {
    const grid = $("#projects-grid");
    const list =
      activeCategory === "All"
        ? data.projects
        : data.projects.filter((p) => p.category === activeCategory);

    grid.innerHTML = list
      .map(
        (project) => `
        <article class="card project-card">
          <div class="project-top">
            <span class="badge">${escapeHtml(project.category)}</span>
            <span class="project-year">${escapeHtml(project.year)}</span>
          </div>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-summary">${escapeHtml(project.summary)}</p>
          <div class="tag-list">
            ${project.stack.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
          </div>
          <div class="project-actions">
            <button type="button" class="text-btn" data-project-id="${escapeHtml(project.id)}">
              View Case Study →
            </button>
            <div class="project-ext-links">
              <a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Live</a>
              <a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">Code</a>
            </div>
          </div>
        </article>`
      )
      .join("");
  }

  function openProjectModal(projectId, triggerEl) {
    const project = data.projects.find((p) => p.id === projectId);
    if (!project) return;

    lastFocusedTrigger = triggerEl || null;
    $("#modal-category").textContent = project.category;
    $("#modal-year").textContent = project.year;
    $("#modal-title").textContent = project.title;
    $("#modal-description").textContent = project.description;
    $("#modal-impact").innerHTML = `<strong>Impact:</strong> ${escapeHtml(project.impact)}`;
    $("#modal-stack").innerHTML = project.stack
      .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");
    $("#modal-links").innerHTML = `
      <a class="btn btn-primary btn-sm" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer">Open Live Demo</a>
      <a class="btn btn-secondary btn-sm" href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer">View Source</a>
    `;

    const modal = $("#project-modal");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modal-close").focus();
  }

  function closeProjectModal() {
    const modal = $("#project-modal");
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  // Theme management
  function initTheme() {
    const stored = localStorage.getItem("razy-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = stored || (prefersLight ? "light" : "dark");
    applyTheme(theme);

    $("#theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("razy-theme", next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = $(".theme-icon");
    if (icon) {
      icon.textContent = theme === "dark" ? "☀" : "☾";
    }
  }

  // Mobile drawer
  function initMobileMenu() {
    const btn = $("#mobile-menu-btn");
    const drawer = $("#mobile-drawer");

    function setOpen(isOpen) {
      drawer.hidden = !isOpen;
      btn.setAttribute("aria-expanded", String(isOpen));
    }

    btn.addEventListener("click", () => {
      setOpen(drawer.hidden);
    });

    $$(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
  }

  // Scroll reveal & active navigation state
  function initScrollObservers() {
    const reveals = $$(".reveal");
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => revealObserver.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }

    const sections = $$("main section[id]");
    const navLinks = $$(".nav-link");
    if ("IntersectionObserver" in window && sections.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
              });
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      sections.forEach((sec) => sectionObserver.observe(sec));
    }
  }

  // Event wiring
  function bindEvents() {
    $("#copy-email-hero").addEventListener("click", copyEmail);
    $("#copy-email-btn").addEventListener("click", copyEmail);

    $("#project-filters").addEventListener("click", (event) => {
      const btn = event.target.closest("[data-category]");
      if (!btn) return;
      activeCategory = btn.getAttribute("data-category");
      renderProjectFilters();
      renderProjects();
    });

    $("#projects-grid").addEventListener("click", (event) => {
      const btn = event.target.closest("[data-project-id]");
      if (!btn) return;
      openProjectModal(btn.getAttribute("data-project-id"), btn);
    });

    $("#modal-close").addEventListener("click", closeProjectModal);
    $("#project-modal").addEventListener("click", (event) => {
      if (event.target === $("#project-modal")) {
        closeProjectModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeProjectModal();
        const drawer = $("#mobile-drawer");
        if (!drawer.hidden) {
          drawer.hidden = true;
          $("#mobile-menu-btn").setAttribute("aria-expanded", "false");
        }
      }
    });

    $("#contact-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const name = $("#sender-name").value.trim();
      const email = $("#sender-email").value.trim();
      const subject = $("#sender-subject").value.trim();
      const message = $("#sender-message").value.trim();

      if (!name || !email || !subject || !message) {
        showToast("Please complete all fields before sending.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Please enter a valid email address.");
        return;
      }

      const body = `Hi Razy,\n\n${message}\n\n— ${name} (${email})`;
      const mailtoUrl = `mailto:${encodeURIComponent(data.brand.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showToast("Opening your email client...");
      form.reset();
    });
  }

  // Initialize application
  hydrateContent();
  renderProjectFilters();
  renderProjects();
  initTheme();
  initMobileMenu();
  bindEvents();
  initScrollObservers();
})();
