document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
       ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const navLinks = document.querySelectorAll(".site-nav a");

    if (menuToggle && siteNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = siteNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.classList.toggle("active", isOpen);

            const menuIcon = menuToggle.querySelector("i");
            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars", !isOpen);
                menuIcon.classList.toggle("fa-xmark", isOpen);
            }

            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });


        /* Close menu after clicking a link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                siteNav.classList.remove("open");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const menuIcon = menuToggle.querySelector("i");
                if (menuIcon) {
                    menuIcon.classList.add("fa-bars");
                    menuIcon.classList.remove("fa-xmark");
                }
                menuToggle.setAttribute("aria-label", "Open navigation menu");

            });

        });

    }


    /* =========================================
       HEADER SCROLL EFFECT
       ========================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        };

        window.addEventListener("scroll", updateHeader);

        updateHeader();

    }


    /* =========================================
       SMOOTH SCROLLING
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            (header ? header.offsetHeight : 0) +
            120;

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =========================================
       CURRENT YEAR
       ========================================= */

    const yearElements =
        document.querySelectorAll("[data-current-year]");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });

});