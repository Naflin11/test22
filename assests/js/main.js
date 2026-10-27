
/* ==========================================
   NASH TAX & BOOKKEEPING
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   1. NAVBAR (PREMIUM) + MOBILE
========================================== */

const menuBtn = document.getElementById("menuBtn");
const mnav = document.getElementById("mnav");

const navDrop = document.getElementById("navDrop");
const dropBtn = document.getElementById("dropBtn");

const mDropBtn = document.getElementById("mDropBtn");
const mDropPanel = document.getElementById("mDropPanel");


// Mobile menu toggle
menuBtn?.addEventListener("click", (e) => {
  e.stopPropagation();

  const open = mnav?.classList.toggle("show");

  menuBtn.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );
});


// Desktop dropdown
dropBtn?.addEventListener("click", (e) => {
  e.stopPropagation();

  const open = navDrop?.classList.toggle("is-open");

  dropBtn.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );
});


// Mobile services dropdown
mDropBtn?.addEventListener("click", (e) => {
  e.stopPropagation();

  const open = mDropPanel?.classList.toggle("isOpen");

  mDropBtn.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );
});


// Close menus when clicking outside
document.addEventListener("click", () => {
  mnav?.classList.remove("show");
  menuBtn?.setAttribute("aria-expanded", "false");

  navDrop?.classList.remove("is-open");
  dropBtn?.setAttribute("aria-expanded", "false");
});


// Close menus when clicking links
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  if (mnav?.contains(a)) {
    mnav.classList.remove("show");
    menuBtn?.setAttribute("aria-expanded", "false");
  }

  if (navDrop?.contains(a)) {
    navDrop.classList.remove("is-open");
    dropBtn?.setAttribute("aria-expanded", "false");
  }
});


// Sticky navbar glass effect
(() => {
  const navBar = document.getElementById("navBar");
  if (!navBar) return;

  const onScroll = () => {
    navBar.classList.toggle(
      "is-scrolled",
      window.scrollY > 10
    );
  };

  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  onScroll();
})();


/* ==========================================
   2. FORMS (MOCK SUBMISSION)
========================================== */

function fakeSubmit(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Mock submitted ✅ (No backend connected)");
    form.reset();
  });
}

fakeSubmit("miniForm");

// Contact form is handled by contact-email.js / EmailJS.
// Do not register fakeSubmit("contactForm") here.


/* ==========================================
   3. FAQ ACCORDION
========================================== */

document.querySelectorAll(".accItem").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".accItem").forEach((b) => {
      if (b !== btn) {
        b.classList.remove("isOpen");
      }
    });

    btn.classList.toggle("isOpen");
  });
});


/* ==========================================
   4. CHATBOT (SAMPLE UI)
========================================== */

(() => {
  const fab = document.getElementById("chatFab");
  const box = document.getElementById("chatBox");
  const closeBtn = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const body = document.getElementById("chatBody");

  if (
    !fab ||
    !box ||
    !closeBtn ||
    !form ||
    !input ||
    !body
  ) return;

  const openChat = () => {
    box.classList.add("isOpen");
    setTimeout(() => input.focus(), 50);
  };

  const closeChat = () => {
    box.classList.remove("isOpen");
  };

  const addMsg = (text, who = "bot") => {
    const div = document.createElement("div");

    div.className = `msg msg--${who}`;
    div.textContent = text;

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const botReply = (userText) => {
    const t = userText.toLowerCase();

    if (t.includes("price") || t.includes("cost")) {
      addMsg(
        "Pricing depends on your needs. Want help with Individual Tax, Business Tax, or Bookkeeping?",
        "bot"
      );
      return;
    }

    if (t.includes("book")) {
      addMsg(
        "Sure, do you need monthly bookkeeping, cleanup, or payroll support?",
        "bot"
      );
      return;
    }

    if (t.includes("tax")) {
      addMsg(
        "Got it. Is this for Individual Tax filing or Business Tax planning?",
        "bot"
      );
      return;
    }

    addMsg(
      "Thanks! Share a bit more about tax, bookkeeping, or payroll and we'll guide you.",
      "bot"
    );
  };

  // Toggle chatbot
  fab.addEventListener("click", (e) => {
    e.stopPropagation();

    box.classList.contains("isOpen")
      ? closeChat()
      : openChat();
  });

  closeBtn.addEventListener("click", closeChat);

  // Close chatbot when clicking outside
  document.addEventListener("click", (e) => {
    const widget = document.getElementById("chatWidget");
    if (!widget) return;

    if (
      box.classList.contains("isOpen") &&
      !widget.contains(e.target)
    ) {
      closeChat();
    }
  });

  // Send messages
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const val = input.value.trim();
    if (!val) return;

    addMsg(val, "user");
    input.value = "";

    setTimeout(() => botReply(val), 350);
  });

  // Quick response chips
  body.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;

    const topic =
      btn.getAttribute("data-chip") ||
      btn.textContent;

    addMsg(topic, "user");

    setTimeout(() => botReply(topic), 250);
  });
})();


/* ==========================================
   5. PREMIUM RESPONSIVE 3D SERVICES CAROUSEL
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".financial-solutions");
  if (!section) return;

  const cards = [
    ...section.querySelectorAll(".solution-card")
  ];

  const prev = section.querySelector(".solutions-prev");
  const next = section.querySelector(".solutions-next");
  const dotsContainer = section.querySelector(".solutions-dots");
  const counter = section.querySelector("#solutionCurrent");
  const stage = section.querySelector(".solutions-stage");

  if (!cards.length || !stage) return;

  let activeIndex = 0;
  let timer = null;
  let startX = 0;
  let startY = 0;
  let isHovered = false;
  let isFocused = false;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /* ======================================
     CREATE NAVIGATION DOTS
  ====================================== */

  if (dotsContainer) {
    dotsContainer.innerHTML = "";

    cards.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "solutions-dot";

      dot.setAttribute(
        "aria-label",
        `Show service ${index + 1}`
      );

      dot.addEventListener("click", () => {
        activeIndex = index;
        render();
        restartAuto();
      });

      dotsContainer.appendChild(dot);
    });
  }


  /* ======================================
     RENDER RESPONSIVE CAROUSEL
  ====================================== */

  function render() {
    const width = stage.clientWidth;

    // Use viewport width to match CSS media query
    const mobile = window.innerWidth <= 768;

    /*
       DESKTOP:
       Keep the existing full-width 3D layout.

       MOBILE:
       Increase spacing to 185px.
       Keep the active card centered and
       reduce overlapping side cards.
    */

    const spacing = mobile
      ? 185
      : Math.min(
          490,
          Math.max(270, width * 0.29)
        );

    cards.forEach((card, index) => {
      let offset = index - activeIndex;
      const half = Math.floor(cards.length / 2);

      if (offset > half) {
        offset -= cards.length;
      }

      if (offset < -half) {
        offset += cards.length;
      }

      // Resolve the opposite card consistently
      if (
        cards.length % 2 === 0 &&
        offset === half
      ) {
        offset = -half;
      }

      const distance = Math.abs(offset);
      const isActive = index === activeIndex;

      /* Horizontal positioning */
      const x = offset * spacing;

      /* Depth positioning */
      const z = mobile
        ? distance === 0
          ? 0
          : -distance * 140
        : distance === 0
          ? 130
          : -distance * 120;

      /* 3D rotation */
      const rotate = mobile
        ? offset === 0
          ? 0
          : offset < 0
            ? 8
            : -8
        : offset === 0
          ? 0
          : offset < 0
            ? 10
            : -10;

      /* Responsive scaling */
      const scale = mobile
        ? distance === 0
          ? 1
          : distance === 1
            ? 0.78
            : 0.65
        : distance === 0
          ? 1.04
          : distance === 1
            ? 0.88
            : 0.73;

      /* Brightness */
      const brightness = mobile
        ? distance === 0
          ? 1
          : distance === 1
            ? 0.58
            : 0.4
        : distance === 0
          ? 1
          : distance === 1
            ? 0.78
            : 0.55;

      /* Hide distant cards on mobile */
      const opacity = mobile && distance > 1
        ? 0
        : 1;

      /* Apply CSS custom properties */
      card.style.setProperty(
        "--card-x",
        `${x}px`
      );

      card.style.setProperty(
        "--card-z",
        `${z}px`
      );

      card.style.setProperty(
        "--card-rotate",
        `${rotate}deg`
      );

      card.style.setProperty(
        "--card-scale",
        scale
      );

      card.style.setProperty(
        "--card-opacity",
        opacity
      );

      card.style.setProperty(
        "--card-brightness",
        brightness
      );

      card.style.setProperty(
        "--card-order",
        isActive ? 20 : 10 - distance
      );

      card.classList.toggle(
        "is-active",
        isActive
      );

      card.setAttribute(
        "aria-hidden",
        String(!isActive)
      );

      // Only active card links can receive focus
      card.querySelectorAll("a").forEach((link) => {
        link.tabIndex = isActive ? 0 : -1;
      });

      // Prevent hidden cards from receiving clicks
      card.style.pointerEvents = isActive
        ? "auto"
        : "none";
    });


    /* ======================================
       UPDATE NAVIGATION DOTS
    ====================================== */

    if (dotsContainer) {
      [...dotsContainer.children].forEach(
        (dot, index) => {
          const isActive = index === activeIndex;

          dot.classList.toggle(
            "is-active",
            isActive
          );

          dot.setAttribute(
            "aria-current",
            String(isActive)
          );
        }
      );
    }


    /* ======================================
       UPDATE COUNTER
    ====================================== */

    if (counter) {
      counter.textContent = String(
        activeIndex + 1
      ).padStart(2, "0");
    }
  }


  /* ======================================
     MOVE CAROUSEL
  ====================================== */

  function move(direction) {
    activeIndex =
      (activeIndex + direction + cards.length)
      % cards.length;

    render();
    restartAuto();
  }


  /* ======================================
     ARROW CONTROLS
  ====================================== */

  prev?.addEventListener("click", () => {
    move(-1);
  });

  next?.addEventListener("click", () => {
    move(1);
  });


  /* ======================================
     AUTOMATIC SLIDING
  ====================================== */

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  function restartAuto() {
    stopAuto();

    if (
      reducedMotion.matches ||
      isHovered ||
      isFocused ||
      document.hidden ||
      cards.length <= 1
    ) {
      return;
    }

    timer = setInterval(() => {
      activeIndex =
        (activeIndex + 1) % cards.length;

      render();
    }, 4500);
  }


  /* ======================================
     PAUSE ON HOVER
  ====================================== */

  section.addEventListener("mouseenter", () => {
    isHovered = true;
    stopAuto();
  });

  section.addEventListener("mouseleave", () => {
    isHovered = false;
    restartAuto();
  });


  /* ======================================
     KEYBOARD INTERACTION
  ====================================== */

  section.addEventListener("focusin", () => {
    isFocused = true;
    stopAuto();
  });

  section.addEventListener("focusout", (event) => {
    if (!section.contains(event.relatedTarget)) {
      isFocused = false;
      restartAuto();
    }
  });

  section.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  });


  /* ======================================
     MOBILE SWIPE SUPPORT
  ====================================== */

  stage.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;

      stopAuto();
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchend",
    (event) => {
      const endX =
        event.changedTouches[0].clientX;

      const endY =
        event.changedTouches[0].clientY;

      const differenceX = endX - startX;
      const differenceY = endY - startY;

      // Swipe only when horizontal movement dominates
      if (
        Math.abs(differenceX) > 50 &&
        Math.abs(differenceX) >
          Math.abs(differenceY)
      ) {
        move(differenceX < 0 ? 1 : -1);
      } else {
        restartAuto();
      }
    },
    { passive: true }
  );

  stage.addEventListener(
    "touchcancel",
    restartAuto,
    { passive: true }
  );


  /* ======================================
     RESIZE SUPPORT
  ====================================== */

  let resizeFrame = null;

  window.addEventListener("resize", () => {
    if (resizeFrame !== null) {
      cancelAnimationFrame(resizeFrame);
    }

    resizeFrame = requestAnimationFrame(() => {
      render();
      resizeFrame = null;
    });
  });


  /* ======================================
     PAGE VISIBILITY
  ====================================== */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        stopAuto();
      } else {
        restartAuto();
      }
    }
  );


  /* ======================================
     REDUCED MOTION SUPPORT
  ====================================== */

  reducedMotion.addEventListener?.(
    "change",
    restartAuto
  );


  /* ======================================
     INITIALIZE
  ====================================== */

  render();
  restartAuto();
});


/* ==========================================
   NASH TAX - SIX SERVICE 3D CAROUSEL
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector(
    ".financial-solutions"
  );

  if (!section) return;

  const stage = section.querySelector(".solutions-stage");

  const cards = [
    ...section.querySelectorAll(".solution-card")
  ];

  const prev = section.querySelector(".solutions-prev");
  const next = section.querySelector(".solutions-next");

  const dotsContainer = section.querySelector(
    ".solutions-dots"
  );

  const counter = section.querySelector(
    "#solutionCurrent"
  );

  const totalCounter = section.querySelector(
    "#solutionTotal"
  );

  if (!stage || !cards.length) return;

  let activeIndex = 0;
  let timer = null;

  const total = cards.length;

  if (totalCounter) {
    totalCounter.textContent =
      String(total).padStart(2, "0");
  }

  // CREATE DOTS
  if (dotsContainer) {
    dotsContainer.innerHTML = "";

    cards.forEach((_, index) => {

      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "solutions-dot";

      dot.setAttribute(
        "aria-label",
        `Show service ${index + 1}`
      );

      dot.addEventListener("click", () => {
        activeIndex = index;
        render();
        restartAuto();
      });

      dotsContainer.appendChild(dot);

    });
  }

  function render() {

    const mobile = window.innerWidth <= 768;

    const stageWidth = stage.clientWidth;

    const spacing = mobile
  ? Math.max(220, stageWidth * 0.72)
  : Math.min(440, Math.max(310, stageWidth * 0.28));

    cards.forEach((card, index) => {

      let offset = index - activeIndex;

      const half = Math.floor(total / 2);

      if (offset > half) offset -= total;
      if (offset < -half) offset += total;

      // Avoid two competing opposite positions
      if (total % 2 === 0 && offset === half) {
        offset = -half;
      }

      const distance = Math.abs(offset);

      const x = offset * spacing;

      const z = distance === 0
        ? 100
        : -distance * 120;

      const rotate = mobile
        ? 0
        : offset === 0
          ? 0
          : offset < 0
            ? 8
            : -8;

      const scale = mobile
        ? distance === 0 ? 1 : 0.84
        : distance === 0
          ? 1.04
          : distance === 1
            ? 0.86
            : 0.72;

      const opacity = mobile
        ? distance > 1 ? 0 : 1
        : distance > 2 ? 0 : 1;

      card.style.setProperty("--card-x", `${x}px`);
      card.style.setProperty("--card-z", `${z}px`);
      card.style.setProperty(
        "--card-rotate",
        `${rotate}deg`
      );
      card.style.setProperty("--card-scale", scale);
      card.style.setProperty("--card-opacity", opacity);
      card.style.setProperty(
        "--card-brightness",
        distance === 0 ? 1 : 0.72
      );
      card.style.setProperty(
        "--card-order",
        10 - distance
      );

      card.classList.toggle(
        "is-active",
        index === activeIndex
      );

      card.setAttribute(
        "aria-hidden",
        index !== activeIndex ? "true" : "false"
      );

      const link = card.querySelector(".solution-link");

      if (link) {
        link.tabIndex =
          index === activeIndex ? 0 : -1;
      }

    });

    if (dotsContainer) {

      [...dotsContainer.children].forEach(
        (dot, index) => {

          const active = index === activeIndex;

          dot.classList.toggle("is-active", active);

          dot.setAttribute(
            "aria-current",
            active ? "true" : "false"
          );

        }
      );

    }

    if (counter) {
      counter.textContent =
        String(activeIndex + 1).padStart(2, "0");
    }

  }

  function move(direction) {

    activeIndex =
      (activeIndex + direction + total) % total;

    render();
    restartAuto();

  }

  prev?.addEventListener("click", () => move(-1));
  next?.addEventListener("click", () => move(1));

  // AUTO ROTATION
  function restartAuto() {

    clearInterval(timer);

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    timer = setInterval(() => {

      activeIndex = (activeIndex + 1) % total;

      render();

    }, 5000);

  }

  // PAUSE ON HOVER
  section.addEventListener(
    "mouseenter",
    () => clearInterval(timer)
  );

  section.addEventListener(
    "mouseleave",
    restartAuto
  );

  // PAUSE WHILE KEYBOARD NAVIGATING
  section.addEventListener(
    "focusin",
    () => clearInterval(timer)
  );

  section.addEventListener("focusout", event => {

    if (!section.contains(event.relatedTarget)) {
      restartAuto();
    }

  });

  // TOUCH SWIPE
  let touchStartX = 0;

  stage.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  stage.addEventListener("touchend", event => {

    const touchEndX =
      event.changedTouches[0].screenX;

    const difference = touchEndX - touchStartX;

    if (Math.abs(difference) > 45) {
      move(difference < 0 ? 1 : -1);
    }

  }, { passive: true });

  window.addEventListener("resize", render);

  render();
  restartAuto();

});
