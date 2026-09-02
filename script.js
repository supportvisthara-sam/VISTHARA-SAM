/* =========================================================
   VISHTHARA - MAIN SCRIPT
   script.js
   ========================================================= */

"use strict";

/* =========================================================
   1. PAGE LOADER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.body.classList.add("page-loaded");

    const loader = document.querySelector(".page-loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");

            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 400);
    }

});


/* =========================================================
   2. HEADER / NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector("header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });

    handleHeaderScroll();

});


/* =========================================================
   3. MOBILE MENU
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(
        ".menu-toggle, .mobile-menu-toggle, #menuToggle"
    );

    const nav = document.querySelector(
        ".nav-links, .navigation, #navLinks"
    );

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", function () {

        nav.classList.toggle("active");
        menuToggle.classList.toggle("active");

        const expanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

    });

    /* Close menu after clicking a link */

    nav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

    /* Close menu with Escape */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* =========================================================
   4. SMOOTH SCROLL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header =
                document.querySelector("header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

});


/* =========================================================
   5. REVEAL ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements =
        document.querySelectorAll("[data-reveal]");

    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {
            element.classList.add("revealed");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

});


/* =========================================================
   6. LAZY LOAD IMAGES
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const lazyImages =
        document.querySelectorAll("img[data-src]");

    if (!lazyImages.length) return;

    if (!("IntersectionObserver" in window)) {

        lazyImages.forEach(function (img) {

            img.src = img.dataset.src;

            img.removeAttribute("data-src");

        });

        return;
    }

    const imageObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }

                img.removeAttribute("data-src");

                observer.unobserve(img);

            });

        },
        {
            rootMargin: "100px"
        }
    );

    lazyImages.forEach(function (img) {
        imageObserver.observe(img);
    });

});


/* =========================================================
   7. CURRENT PAGE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    document.querySelectorAll("nav a, .nav-links a").forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage &&
            linkPage === currentPage
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================================
   8. BOOKING PAGE - TRIP FROM URL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const tripSelect =
        document.getElementById("trip");

    if (!tripSelect) return;

    const params =
        new URLSearchParams(window.location.search);

    const trip =
        params.get("trip");

    if (!trip) return;

    const tripMap = {

        "western-ghats":
            "Western Ghats Escape",

        "coastal-trails":
            "Coastal Trails",

        "coorg":
            "Coorg Highlands",

        "dharmasthala":
            "Dharmasthala Trails",

        "kumara-parvatha":
            "Kumara Parvatha"

    };

    const tripName =
        tripMap[trip];

    if (!tripName) return;

    for (let i = 0; i < tripSelect.options.length; i++) {

        if (
            tripSelect.options[i].text
                .toLowerCase()
                .includes(tripName.toLowerCase())
        ) {

            tripSelect.selectedIndex = i;

            tripSelect.dispatchEvent(
                new Event("change", {
                    bubbles: true
                })
            );

            break;
        }

    }

});


/* =========================================================
   9. PHONE NUMBER INPUT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"], input[name*="Phone"], input[name*="phone"]'
        );

    phoneInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            let value =
                this.value.replace(/\D/g, "");

            /* Indian mobile number */

            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            this.value = value;

        });

    });

});


/* =========================================================
   10. NUMBER INPUT PROTECTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const numberInputs =
        document.querySelectorAll(
            'input[type="number"]'
        );

    numberInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            const min =
                this.getAttribute("min");

            const max =
                this.getAttribute("max");

            let value =
                parseInt(this.value, 10);

            if (Number.isNaN(value)) return;

            if (
                min !== null &&
                value < Number(min)
            ) {
                this.value = min;
            }

            if (
                max !== null &&
                value > Number(max)
            ) {
                this.value = max;
            }

        });

    });

});


/* =========================================================
   11. BOOKING FORM - BASIC VALIDATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm =
        document.getElementById("bookingForm");

    if (!bookingForm) return;

    const phone =
        document.getElementById("phone");

    const email =
        document.getElementById("email");

    /* Phone validation */

    if (phone) {

        phone.addEventListener("blur", function () {

            if (
                this.value &&
                !/^[6-9]\d{9}$/.test(this.value)
            ) {

                this.setCustomValidity(
                    "Please enter a valid 10-digit Indian mobile number."
                );

            } else {

                this.setCustomValidity("");

            }

        });

        phone.addEventListener("input", function () {
            this.setCustomValidity("");
        });

    }

    /* Email validation */

    if (email) {

        email.addEventListener("blur", function () {

            if (
                this.value &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)
            ) {

                this.setCustomValidity(
                    "Please enter a valid email address."
                );

            } else {

                this.setCustomValidity("");

            }

        });

        email.addEventListener("input", function () {
            this.setCustomValidity("");
        });

    }

});


/* =========================================================
   12. PREVENT DOUBLE CLICK ON NON-BOOKING FORMS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("form").forEach(function (form) {

        if (form.id === "bookingForm") return;

        form.addEventListener("submit", function () {

            const button =
                form.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );

            if (!button) return;

            setTimeout(function () {

                button.disabled = true;

            }, 0);

        });

    });

});


/* =========================================================
   13. EXTERNAL LINKS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
    ).forEach(function (link) {

        const currentHost =
            window.location.hostname;

        try {

            const linkURL =
                new URL(
                    link.href,
                    window.location.href
                );

            if (
                linkURL.hostname &&
                linkURL.hostname !== currentHost
            ) {

                link.target = "_blank";

                link.rel = "noopener noreferrer";

            }

        } catch (error) {

            console.warn(
                "Invalid external link:",
                link.href
            );

        }

    });

});


/* =========================================================
   14. BACK TO TOP BUTTON
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop =
        document.querySelector(
            "#backToTop, .back-to-top"
        );

    if (!backToTop) return;

    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});


/* =========================================================
   15. AUTO CURRENT YEAR
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const yearElements =
        document.querySelectorAll(
            "#currentYear, .current-year"
        );

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent =
            currentYear;

    });

});


/* =========================================================
   16. WHATSAPP BUTTON
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const whatsappNumber =
        "916363448110";

    const whatsappButtons =
        document.querySelectorAll(
            '[data-whatsapp], .whatsapp-button, .whatsapp-float'
        );

    whatsappButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const href =
                button.getAttribute("href");

            /* If button already has a WhatsApp URL,
               allow normal behaviour */

            if (
                href &&
                href.includes("wa.me")
            ) {
                return;
            }

            event.preventDefault();

            const message =
                "Hello VISHTHARA, I would like to know more about your travel packages.";

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });

});


/* =========================================================
   17. PREVENT ACCIDENTAL FORM RESUBMISSION
   ========================================================= */

window.addEventListener(
    "pageshow",
    function (event) {

        if (event.persisted) {

            document
                .querySelectorAll(
                    'button[type="submit"]'
                )
                .forEach(function (button) {

                    button.disabled = false;

                });

        }

    }
);


/* =========================================================
   18. ERROR HANDLING
   ========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.warn(
            "VISHTHARA website error:",
            event.message
        );

    }
);


/* =========================================================
   19. BRAND CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cVISHTHARA",
    "font-size:24px;font-weight:bold;"
);

console.log(
    "Travel • Tours • Experiences"
);

console.log(
    "WhatsApp: +91 63634 48110"
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */