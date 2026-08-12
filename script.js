/* =========================================================
   VISTHARA — MAIN JAVASCRIPT
   logo: logo.png
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     BASIC ELEMENTS
  ======================================================= */

  const body = document.body;

  const pageLoader =
    document.getElementById("pageLoader");

  const header =
    document.getElementById("mainHeader");

  const mobileToggle =
    document.getElementById("mobileMenuToggle");

  const mobileNavigation =
    document.getElementById("mobileNavigation");

  const mobileClose =
    document.getElementById("mobileMenuClose");

  const heroImage =
    document.querySelector(".hero-background img");


  /* =======================================================
     LOGO
     Automatically use logo.png
  ======================================================= */

  const logoImages =
    document.querySelectorAll(
      ".site-logo img, " +
      ".loader-content img, " +
      ".footer-brand img"
    );

  logoImages.forEach(img => {

    img.src = "logo.png";

    if (!img.alt) {
      img.alt = "VISTHARA";
    }

  });


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  const hideLoader = () => {

    if (!pageLoader) return;

    setTimeout(() => {

      pageLoader.classList.add("hide");

    }, 700);

  };


  if (document.readyState === "complete") {

    hideLoader();

  } else {

    window.addEventListener(
      "load",
      hideLoader,
      { once: true }
    );

  }


  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const openMobileMenu = () => {

    if (!mobileNavigation) return;

    mobileNavigation.classList.add("open");

    body.classList.add("menu-open");


    if (mobileToggle) {

      mobileToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      mobileToggle.setAttribute(
        "aria-label",
        "Close menu"
      );

    }

  };


  const closeMobileMenu = () => {

    if (!mobileNavigation) return;

    mobileNavigation.classList.remove("open");

    body.classList.remove("menu-open");


    if (mobileToggle) {

      mobileToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      mobileToggle.setAttribute(
        "aria-label",
        "Open menu"
      );

    }

  };


  if (mobileToggle) {

    mobileToggle.addEventListener(
      "click",
      () => {

        if (
          mobileNavigation &&
          mobileNavigation.classList.contains("open")
        ) {

          closeMobileMenu();

        } else {

          openMobileMenu();

        }

      }
    );

  }


  if (mobileClose) {

    mobileClose.addEventListener(
      "click",
      closeMobileMenu
    );

  }


  /* =======================================================
     MOBILE LINKS
  ======================================================= */

  if (mobileNavigation) {

    const mobileLinks =
      mobileNavigation.querySelectorAll("a");


    mobileLinks.forEach(link => {

      link.addEventListener(
        "click",
        () => {

          closeMobileMenu();

        }
      );

    });

  }


  /* =======================================================
     CLOSE MENU WITH ESCAPE
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        mobileNavigation &&
        mobileNavigation.classList.contains("open")
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  const smoothLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  smoothLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        let target;


        try {

          target =
            document.querySelector(targetId);

        } catch {

          return;

        }


        if (!target) return;


        event.preventDefault();


        const headerHeight =
          header
            ? header.offsetHeight
            : 0;


        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          20;


        window.scrollTo({

          top: Math.max(position, 0),

          behavior: "smooth"

        });


        closeMobileMenu();

      }
    );

  });


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".intro-content, " +
      ".featured-trip, " +
      ".experience-content, " +
      ".experience-stat, " +
      ".destination-card, " +
      ".home-booking-inner"
    );


  revealElements.forEach(element => {

    element.classList.add("reveal");

  });


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {

          threshold: 0.12,

          rootMargin:
            "0px 0px -50px 0px"

        }
      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add(
        "visible"
      );

    });

  }


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    heroImage &&
    !reducedMotion
  ) {

    let ticking = false;


    const updateParallax = () => {

      const scroll =
        window.scrollY;


      if (
        scroll <
        window.innerHeight
      ) {

        heroImage.style.transform =
          `translate3d(0, ${scroll * 0.12}px, 0) scale(1.02)`;

      }


      ticking = false;

    };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateParallax
          );

          ticking = true;

        }

      },
      { passive: true }
    );

  }


  /* =======================================================
     ACTIVE DESKTOP NAVIGATION
  ======================================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  const navigationLinks =
    document.querySelectorAll(
      ".desktop-navigation a"
    );


  navigationLinks.forEach(link => {

    const href =
      link.getAttribute("href");


    if (!href) return;


    const linkPage =
      href
        .split("/")
        .pop()
        .split("#")[0]
        .toLowerCase();


    const homePage =
      (
        currentPage === "" ||
        currentPage === "index.html"
      ) &&
      (
        linkPage === "" ||
        linkPage === "index.html"
      );


    if (
      linkPage === currentPage ||
      homePage
    ) {

      link.classList.add(
        "active"
      );

    }

  });


  /* =======================================================
     SECTION ACTIVE NAVIGATION
     Highlights menu while scrolling
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              const id =
                entry.target.id;


              navigationLinks.forEach(link => {

                link.classList.remove(
                  "active"
                );


                if (
                  link.getAttribute("href") ===
                  `#${id}`
                ) {

                  link.classList.add(
                    "active"
                  );

                }

              });

            }

          });

        },
        {

          rootMargin:
            "-30% 0px -60% 0px",

          threshold: 0

        }
      );


    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }


  /* =======================================================
     IMAGE FALLBACK
  ======================================================= */

  const images =
    document.querySelectorAll("img");


  images.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        /*
          Do NOT hide logo.png.
          If another image fails, keep layout clean.
        */

        if (
          image.src.includes("logo.png")
        ) {

          console.warn(
            "VISTHARA logo.png could not be loaded."
          );

          return;

        }


        image.style.opacity = "0";

      },
      {
        once: true
      }
    );

  });


  /* =======================================================
     BUTTON MICRO INTERACTIONS
  ======================================================= */

  const buttons =
    document.querySelectorAll(
      ".primary-button, " +
      ".secondary-button, " +
      ".header-book-button, " +
      ".white-button, " +
      ".large-book-button, " +
      ".outline-button"
    );


  buttons.forEach(button => {

    button.addEventListener(
      "mouseenter",
      () => {

        button.style.willChange =
          "transform";

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.willChange =
          "auto";

      }
    );

  });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Tab"
      ) {

        body.classList.add(
          "keyboard-navigation"
        );

      }

    }
  );


  document.addEventListener(
    "mousedown",
    () => {

      body.classList.remove(
        "keyboard-navigation"
      );

    }
  );


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );


  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     PREVENT EMPTY LINKS
  ======================================================= */

  document.querySelectorAll(
    'a[href="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();

      }
    );

  });


  /* =======================================================
     INITIAL MOBILE ACCESSIBILITY
  ======================================================= */

  if (mobileToggle) {

    mobileToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

  }


  /* =======================================================
     VISTHARA
  ======================================================= */

  console.log(
    "%cVISTHARA",
    "font-size:24px;font-weight:700;color:#0878bd;"
  );

  console.log(
    "Travel Made Easier."
  );

});