// assets/js/navbar.js

async function loadNavbar() {
  const mount = document.getElementById("navbarMount");
  if (!mount) return;

  try {
    const navbarPath =
      window.location.pathname.includes("/articles/")
        ? "../navbar.html"
        : "navbar.html";

    const res = await fetch(navbarPath);

    if (!res.ok) {
      throw new Error(`Navbar failed to load: ${res.status}`);
    }

    const html = await res.text();
    mount.innerHTML = html;

    // After injecting, wire events
    const navBar = document.getElementById("navBar");
    const navToggle = document.getElementById("navToggle");
    const navMobile = document.getElementById("navMobile");
    const mDropBtn = document.getElementById("mDropBtn");
    const mDropPanel = document.getElementById("mDropPanel");

    function closeMobile() {
      navMobile?.classList.remove("isOpen");
      navToggle?.setAttribute("aria-expanded", "false");
      mDropPanel?.classList.remove("isOpen");
      mDropBtn?.setAttribute("aria-expanded", "false");
    }

    navToggle?.addEventListener("click", () => {
      const open = navMobile?.classList.toggle("isOpen");

      navToggle.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

      if (!open) {
        mDropPanel?.classList.remove("isOpen");
        mDropBtn?.setAttribute("aria-expanded", "false");
      }
    });

    mDropBtn?.addEventListener("click", () => {
      const open = mDropPanel?.classList.toggle("isOpen");

      mDropBtn.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );
    });

    document.addEventListener("click", (e) => {
      if (navMobile?.classList.contains("isOpen")) {
        const inside =
          navMobile.contains(e.target) ||
          navToggle?.contains(e.target);

        if (!inside) {
          closeMobile();
        }
      }
    });

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (!link) return;

      if (navMobile && navMobile.contains(link)) {
        closeMobile();
      }
    });

    const onScroll = () => {
      navBar?.classList.toggle(
        "is-scrolled",
        window.scrollY > 10
      );
    };

    window.addEventListener("scroll", onScroll, {
      passive: true
    });

    onScroll();
  } catch (error) {
    console.error("Navbar loading error:", error);
  }
}

loadNavbar();


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("footerSubscribeForm");
  const status = document.getElementById("footerSubscribeStatus");

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.textContent =
      "Newsletter subscriptions are coming soon. Please contact us for updates.";
  });
});
