
/* ==========================================
   NASH TAX - PREMIUM GLOBAL SCROLL ANIMATIONS
   Home + About + Other Website Pages
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================
     ELEMENT SELECTORS
  ====================================== */

  const selectors = [

    /* ===== GENERAL WEBSITE ===== */
    "main h1",
    "main h2",
    "main h3",
    "main p",

    /* ===== HOME PAGE ===== */
    ".eventHero__left",
    ".eventHero__right",

    ".solutions-header-content",

    ".nt-challenge-head",
    ".nt-challenge-card",
    ".nt-challenge-btn-wrap",

    ".premium-process-head",

    ".testimonial-header",

    ".services-header",
    ".service-box",
    ".feature-card",

    ".faqItem",
    ".cta-content",
    ".contact-card",

    /* ===== ABOUT PAGE HERO ===== */
    ".aboutPremiumHero__content",
    ".aboutPremiumHero__visual",

    /* ===== ABOUT INTRO ===== */
    ".aboutIntroLabel",
    ".aboutIntroTitle",
    ".aboutIntroDescription p",
    ".aboutGoldDivider",

    /* ===== ABOUT STATISTICS ===== */
    ".aboutStats .stat",

    /* ===== MISSION / VISION ===== */
    ".aboutSectionHeading",
    ".mvCard",

    /* ===== HISTORY ===== */
    ".historyWrap > .aboutSectionLabel",
    ".historyWrap > h2",
    ".historyWrap > p",

    /* ===== CONSULTATION CTA ===== */
    ".aboutCTAContent",
    ".ctaActions",

    /* ===== OTHER PAGE SECTIONS ===== */
    ".aboutCopy",
    ".aboutImage",
    ".aboutSectionLabel",

    /* ===== FOOTER ===== */
    ".pFooter__brand",
    ".pFooter__col",
    ".pFooter__contact",
    ".footer-col"

  ];


  /* ======================================
     COLLECT ELEMENTS
  ====================================== */

  const elements = document.querySelectorAll(
    selectors.join(",")
  );


  /* ======================================
     ACCESSIBILITY
  ====================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach(element => {
      element.classList.add(
        "reveal",
        "is-visible"
      );
    });

    return;
  }


  /* ======================================
     INTERSECTION OBSERVER
  ====================================== */

  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -35px 0px"
    }
  );


  /* ======================================
     APPLY REVEAL ANIMATIONS
  ====================================== */

  elements.forEach(element => {

    /* Skip interactive components */
    if (
      element.closest(".solutions-stage") ||
      element.closest(".solution-card") ||
      element.closest(".chatWidget") ||
      element.closest("#chatWidget") ||
      element.closest("#navbarMount") ||
      element.closest(".nav")
    ) {
      return;
    }

    element.classList.add("reveal");

    /* Stagger cards within their own group */
    const parent = element.parentElement;

    const staggerGroups = [
      ".aboutStats",
      ".mvGrid",
      ".nt-challenge-grid"
    ];

    const shouldStagger = staggerGroups.some(
      selector => parent?.matches(selector)
    );

    if (shouldStagger) {

      const siblings = Array.from(
        parent.children
      ).filter(child => child.matches(
        ".stat, .mvCard, .nt-challenge-card"
      ));

      const index = siblings.indexOf(element);

      if (index > 0) {
        element.classList.add(
          `reveal-delay-${Math.min(index, 3)}`
        );
      }

    }

    observer.observe(element);

  });


  /* ======================================
     HANDLE ALREADY VISIBLE ELEMENTS
  ====================================== */

  // IntersectionObserver automatically detects
  // elements already visible in the viewport.

});
