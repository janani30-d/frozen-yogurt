/* =========================================================
   FROZEN YOGURT SHOP
   PART 4 — JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const rtlToggle = document.getElementById("rtlToggle");
const darkModeToggle = document.getElementById("darkModeToggle");

const navDropdown = document.querySelector(".nav-dropdown");
const navDropdownToggle = document.querySelector(".nav-dropdown-toggle");

const htmlElement = document.documentElement;
const bodyElement = document.body;


/* =========================================================
   RESPONSIVE BREAKPOINT
========================================================= */

const responsiveBreakpoint = 1100;


/* =========================================================
   CHECK TABLET / MOBILE
========================================================= */

function isResponsiveMode() {

    return window.innerWidth <= responsiveBreakpoint;

}


/* =========================================================
   HAMBURGER MENU
========================================================= */

function openMenu() {

    if (!mainNav || !menuToggle) return;

    mainNav.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

}


function closeMenu() {

    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

}


function toggleMenu() {

    if (!mainNav) return;

    if (mainNav.classList.contains("active")) {

        closeMenu();

    } else {

        openMenu();

    }

}


/* =========================================================
   HAMBURGER CLICK
========================================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        toggleMenu();

    });

}


/* =========================================================
   HOME DROPDOWN
   DESKTOP + TABLET + MOBILE
========================================================= */

function openDropdown() {

    if (!navDropdown || !navDropdownToggle) return;

    navDropdown.classList.add("open");

    navDropdownToggle.setAttribute(
        "aria-expanded",
        "true"
    );
}


function closeDropdown() {

    if (!navDropdown || !navDropdownToggle) return;

    navDropdown.classList.remove("open");

    navDropdownToggle.setAttribute(
        "aria-expanded",
        "false"
    );
}


function toggleDropdown() {

    if (!navDropdown) return;

    if (navDropdown.classList.contains("open")) {

        closeDropdown();

    } else {

        openDropdown();

    }
}


/* =========================================================
   HOME DROPDOWN CLICK
   TABLET + MOBILE
========================================================= */

if (navDropdownToggle) {

    navDropdownToggle.addEventListener(
        "click",
        function (event) {

            /* Prevent button from doing anything else */
            event.preventDefault();
            event.stopPropagation();

            /* Only toggle dropdown in responsive mode */
            if (isResponsiveMode()) {

                toggleDropdown();

            }

        }
    );

}

/* =========================================================
   HOME DROPDOWN LINKS
========================================================= */

if (navDropdown) {

    const dropdownLinks =
        navDropdown.querySelectorAll(
            ".nav-dropdown-menu a"
        );

    dropdownLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                /*
                 * Allow the browser to follow the link.
                 * Do NOT close the menu immediately.
                 */

                event.stopPropagation();

            }
        );

    });
}





/* =========================================================
   CLOSE DROPDOWN WHEN CLICKING HOME LINKS
========================================================= */

if (navDropdown) {

    const dropdownLinks =
        navDropdown.querySelectorAll(
            ".nav-dropdown-menu a"
        );

    dropdownLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeDropdown();

                closeMenu();

            }
        );

    });

}


/* =========================================================
   CLOSE MENU WHEN NORMAL NAV LINK IS CLICKED
========================================================= */

if (mainNav) {

    const normalLinks =
        mainNav.querySelectorAll(
            ".nav-link"
        );

    normalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });

}


/* =========================================================
   CLICK OUTSIDE MENU
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!mainNav || !menuToggle) return;

        const clickedInsideNav =
            mainNav.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedMenuButton
        ) {

            closeMenu();

            closeDropdown();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMenu();

            closeDropdown();

        }

    }
);


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
         * When returning to desktop,
         * remove mobile menu states.
         */

        if (!isResponsiveMode()) {

            closeMenu();

            closeDropdown();

        }

    }
);


/* =========================================================
   RTL MODE
========================================================= */

function enableRTL() {

    htmlElement.setAttribute(
        "dir",
        "rtl"
    );

    if (rtlToggle) {

        rtlToggle.setAttribute(
            "aria-label",
            "Switch to LTR mode"
        );

        rtlToggle.setAttribute(
            "title",
            "LTR Mode"
        );

    }

    localStorage.setItem(
        "frozenYogurtDirection",
        "rtl"
    );

}


function enableLTR() {

    htmlElement.setAttribute(
        "dir",
        "ltr"
    );

    if (rtlToggle) {

        rtlToggle.setAttribute(
            "aria-label",
            "Switch to RTL mode"
        );

        rtlToggle.setAttribute(
            "title",
            "RTL Mode"
        );

    }

    localStorage.setItem(
        "frozenYogurtDirection",
        "ltr"
    );

}


function toggleRTL() {

    const currentDirection =
        htmlElement.getAttribute("dir");

    if (currentDirection === "rtl") {

        enableLTR();

    } else {

        enableRTL();

    }

}


/* =========================================================
   RTL BUTTON CLICK
========================================================= */

if (rtlToggle) {

    rtlToggle.addEventListener(
        "click",
        function () {

            toggleRTL();

        }
    );

}


/* =========================================================
   DARK MODE
========================================================= */

function enableDarkMode() {

    bodyElement.classList.add(
        "dark-mode"
    );

    if (darkModeToggle) {

        const icon =
            darkModeToggle.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-moon"
            );

            icon.classList.add(
                "fa-sun"
            );

        }

        darkModeToggle.setAttribute(
            "aria-label",
            "Disable dark mode"
        );

        darkModeToggle.setAttribute(
            "title",
            "Light Mode"
        );

    }

    localStorage.setItem(
        "frozenYogurtTheme",
        "dark"
    );

}


function disableDarkMode() {

    bodyElement.classList.remove(
        "dark-mode"
    );

    if (darkModeToggle) {

        const icon =
            darkModeToggle.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "fa-sun"
            );

            icon.classList.add(
                "fa-moon"
            );

        }

        darkModeToggle.setAttribute(
            "aria-label",
            "Enable dark mode"
        );

        darkModeToggle.setAttribute(
            "title",
            "Dark Mode"
        );

    }

    localStorage.setItem(
        "frozenYogurtTheme",
        "light"
    );

}


function toggleDarkMode() {

    if (
        bodyElement.classList.contains(
            "dark-mode"
        )
    ) {

        disableDarkMode();

    } else {

        enableDarkMode();

    }

}


/* =========================================================
   DARK MODE BUTTON CLICK
========================================================= */

if (darkModeToggle) {

    darkModeToggle.addEventListener(
        "click",
        function () {

            toggleDarkMode();

        }
    );

}


/* =========================================================
   LOAD SAVED SETTINGS
========================================================= */

function loadSavedSettings() {

    /* -----------------------------------------
       RTL
    ----------------------------------------- */

    const savedDirection =
        localStorage.getItem(
            "frozenYogurtDirection"
        );


    if (savedDirection === "rtl") {

        enableRTL();

    } else {

        enableLTR();

    }


    /* -----------------------------------------
       DARK MODE
    ----------------------------------------- */

    const savedTheme =
        localStorage.getItem(
            "frozenYogurtTheme"
        );


    if (savedTheme === "dark") {

        enableDarkMode();

    } else {

        disableDarkMode();

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

loadSavedSettings();


/* =========================================================
   INITIAL ARIA STATE
========================================================= */

if (menuToggle) {

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (navDropdownToggle) {

    navDropdownToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =========================================================
   END
========================================================= */








/* =========================================================
   HOME 2 - HERO SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.getElementById("home2Hero");

    if (!hero) return;

    const slides = hero.querySelectorAll(".home2-hero-slide");
    const dots = hero.querySelectorAll(".home2-hero-dot");

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let sliderInterval;

    const slideDuration = 5000;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentSlide = index;
    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextSlide() {

        let nextIndex = currentSlide + 1;

        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }

        showSlide(nextIndex);
    }


    /* =====================================================
       START AUTO SLIDER
    ===================================================== */

    function startSlider() {

        stopSlider();

        sliderInterval = setInterval(function () {
            nextSlide();
        }, slideDuration);
    }


    /* =====================================================
       STOP AUTO SLIDER
    ===================================================== */

    function stopSlider() {

        if (sliderInterval) {
            clearInterval(sliderInterval);
            sliderInterval = null;
        }
    }


    /* =====================================================
       DOT CLICK
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {

            showSlide(index);

            startSlider();

        });

    });


    /* =====================================================
       PAUSE WHILE HOVERING
    ===================================================== */

    hero.addEventListener("mouseenter", function () {
        stopSlider();
    });

    hero.addEventListener("mouseleave", function () {
        startSlider();
    });


    /* =====================================================
       TOUCH / MOBILE SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    hero.addEventListener(
        "touchstart",
        function (event) {

            touchStartX = event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    hero.addEventListener(
        "touchend",
        function (event) {

            touchEndX = event.changedTouches[0].screenX;

            const swipeDistance = touchEndX - touchStartX;

            /* Swipe left → next slide */

            if (swipeDistance < -50) {

                nextSlide();
                startSlider();

            }

            /* Swipe right → previous slide */

            if (swipeDistance > 50) {

                let previousIndex = currentSlide - 1;

                if (previousIndex < 0) {
                    previousIndex = slides.length - 1;
                }

                showSlide(previousIndex);
                startSlider();

            }

        },
        { passive: true }
    );


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showSlide(0);

    startSlider();

});






/* =========================================================
   HOME 2 - OUR STORY - STATS COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const storySection = document.getElementById("home2Story");

    if (!storySection) return;

    const counters = storySection.querySelectorAll(".counter");

    if (!counters.length) return;


    /* =====================================================
       FORMAT NUMBER
    ===================================================== */

    function formatNumber(number) {

        return number.toLocaleString("en-IN");

    }


    /* =====================================================
       ANIMATE COUNTER
    ===================================================== */

    function animateCounter(counter) {

        const target = Number(counter.getAttribute("data-target"));

        if (isNaN(target)) return;

        const duration = 1800;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);


            /*
             * Ease-out effect
             * Starts fast and slows down near the end.
             */

            const easedProgress =
                1 - Math.pow(1 - progress, 3);


            const currentValue =
                Math.floor(target * easedProgress);


            counter.textContent =
                formatNumber(currentValue);


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    formatNumber(target);

            }

        }


        requestAnimationFrame(updateCounter);

    }


    /* =====================================================
       OBSERVER
    ===================================================== */

    let counterStarted = false;


    const counterObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (
                    entry.isIntersecting &&
                    !counterStarted
                ) {

                    counterStarted = true;


                    counters.forEach(function (counter) {

                        animateCounter(counter);

                    });


                    counterObserver.disconnect();

                }

            });

        },
        {
            threshold: 0.25
        }
    );


    counterObserver.observe(storySection);

});









/* =========================================================
   HOME 2 - SWEET MOMENTS GALLERY SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.getElementById("home2SweetGallery");

    if (!gallery) return;


    const track = document.getElementById(
        "home2SweetGalleryTrack"
    );

    const prevButton = document.getElementById(
        "home2SweetGalleryPrev"
    );

    const nextButton = document.getElementById(
        "home2SweetGalleryNext"
    );

    const dotsContainer = document.getElementById(
        "home2SweetGalleryDots"
    );


    if (
        !track ||
        !prevButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }


    const items = Array.from(
        track.querySelectorAll(
            ".home2-sweet-gallery-item"
        )
    );


    if (!items.length) return;


    let currentPage = 0;

    let visibleItems = 6;

    let totalPages = 1;


    /* =====================================================
       GET NUMBER OF VISIBLE ITEMS
    ===================================================== */

    function getVisibleItems() {

        const width = window.innerWidth;

        if (width <= 360) {
            return 2;
        }

        if (width <= 767) {
            return 2;
        }

        if (width <= 833) {
            return 4;
        }

        if (width <= 1100) {
            return 4;
        }

        return 6;
    }


    /* =====================================================
       CREATE DOTS
    ===================================================== */

    function createDots() {

        visibleItems = getVisibleItems();

        totalPages = Math.ceil(
            items.length / visibleItems
        );

        /*
         * Make sure the current page still exists
         * after resizing.
         */

        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        if (currentPage < 0) {
            currentPage = 0;
        }


        dotsContainer.innerHTML = "";


        for (let i = 0; i < totalPages; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.className =
                "home2-sweet-gallery-dot" +
                (i === currentPage ? " active" : "");

            dot.setAttribute(
                "aria-label",
                "Gallery slide " + (i + 1)
            );


            dot.addEventListener(
                "click",
                function () {

                    currentPage = i;

                    updateSlider();

                }
            );


            dotsContainer.appendChild(dot);
        }
    }


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updateSlider() {

        if (!items.length) return;


        /*
         * Get the real item width including gap.
         */

        const itemWidth =
            items[0].getBoundingClientRect().width;


        const computedStyle =
            window.getComputedStyle(track);


        const gap =
            parseFloat(computedStyle.gap) || 0;


        const moveDistance =
            (itemWidth + gap) *
            visibleItems *
            currentPage;


        /*
         * RTL moves in the opposite direction.
         */

        const isRTL =
            document.documentElement.dir === "rtl";


        if (isRTL) {

            track.style.transform =
                `translateX(${moveDistance}px)`;

        } else {

            track.style.transform =
                `translateX(-${moveDistance}px)`;
        }


        /*
         * Update dots.
         */

        const dots =
            dotsContainer.querySelectorAll(
                ".home2-sweet-gallery-dot"
            );


        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        });


        /*
         * Disable buttons at beginning/end.
         */

        prevButton.disabled =
            currentPage === 0;

        nextButton.disabled =
            currentPage === totalPages - 1;


        prevButton.setAttribute(
            "aria-disabled",
            currentPage === 0
        );

        nextButton.setAttribute(
            "aria-disabled",
            currentPage === totalPages - 1
        );
    }


    /* =====================================================
       NEXT
    ===================================================== */

    nextButton.addEventListener(
        "click",
        function () {

            if (currentPage < totalPages - 1) {

                currentPage++;

                updateSlider();
            }
        }
    );


    /* =====================================================
       PREVIOUS
    ===================================================== */

    prevButton.addEventListener(
        "click",
        function () {

            if (currentPage > 0) {

                currentPage--;

                updateSlider();
            }
        }
    );


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                function () {

                    createDots();

                    updateSlider();

                },
                150
            );
        }
    );


    /* =====================================================
       RTL CHANGE SUPPORT
    ===================================================== */

    const rtlToggle =
        document.getElementById("rtlToggle");


    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            function () {

                setTimeout(
                    function () {

                        updateSlider();

                    },
                    50
                );
            }
        );
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    createDots();

    updateSlider();

});









/* =========================================================
   TOPPINGS & EXTRAS — CATEGORY FILTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const toppingTabs = document.querySelectorAll(".menu-toppings-tab");
    const toppingCards = document.querySelectorAll(".menu-topping-card");

    if (!toppingTabs.length || !toppingCards.length) {
        return;
    }


    /* -----------------------------------------------------
       FILTER FUNCTION
    ----------------------------------------------------- */

    function filterToppings(category) {

        toppingCards.forEach(function (card) {

            const cardCategory = card.getAttribute("data-category");

            if (category === "all" || cardCategory === category) {

                card.classList.remove("is-hidden");

            } else {

                card.classList.add("is-hidden");

            }

        });

    }


    /* -----------------------------------------------------
       TAB CLICK
    ----------------------------------------------------- */

    toppingTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const selectedCategory = tab.getAttribute("data-category");


            /* Remove active state */

            toppingTabs.forEach(function (item) {
                item.classList.remove("active");
            });


            /* Add active state */

            tab.classList.add("active");


            /* Filter cards */

            filterToppings(selectedCategory);

        });

    });


    /* -----------------------------------------------------
       INITIAL STATE
       SHOW ALL TOPPINGS
    ----------------------------------------------------- */

    filterToppings("all");

});









// =========================================================
// SECTION 8 — FRANCHISE FAQ ACCORDION
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".fr-faq-item");

    if (!faqItems.length) return;


    faqItems.forEach(function (item) {

        const question = item.querySelector(".fr-faq-question");

        if (!question) return;


        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            // Close all other FAQ items
            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherQuestion =
                        otherItem.querySelector(".fr-faq-question");

                    if (otherQuestion) {
                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }

            });


            // Toggle current FAQ
            if (isActive) {

                item.classList.remove("active");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});














/* =========================================================
   LOCATION PAGE — FIND A STORE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("locationSearchForm");
    const searchInput = document.getElementById("locationSearch");
    const currentLocationButton = document.getElementById("useCurrentLocation");


    /* =====================================================
       SEARCH LOCATION
    ===================================================== */

    if (searchForm && searchInput) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const locationValue = searchInput.value.trim();

            if (!locationValue) {

                searchInput.focus();

                searchInput.style.borderColor = "var(--primary-dark)";

                setTimeout(function () {
                    searchInput.style.borderColor = "";
                }, 1500);

                return;
            }


            /*
             * Replace this section later with your
             * actual location search / map functionality.
             */

            console.log("Searching location:", locationValue);

        });

    }


    /* =====================================================
       USE CURRENT LOCATION
    ===================================================== */

    if (currentLocationButton) {

        currentLocationButton.addEventListener("click", function () {

            if (!navigator.geolocation) {

                alert("Location services are not supported by your browser.");

                return;
            }


            const originalHTML = currentLocationButton.innerHTML;


            currentLocationButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i>' +
                '<span>Finding Your Location...</span>';

            currentLocationButton.disabled = true;


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;


                    console.log("Latitude:", latitude);
                    console.log("Longitude:", longitude);


                    /*
                     * For now, show the coordinates in the
                     * search field.
                     *
                     * This can later be connected to a
                     * real store locator / map API.
                     */

                    if (searchInput) {

                        searchInput.value =
                            latitude.toFixed(4) +
                            ", " +
                            longitude.toFixed(4);

                    }


                    currentLocationButton.innerHTML =
                        '<i class="fa-solid fa-check"></i>' +
                        '<span>Location Found</span>';


                    setTimeout(function () {

                        currentLocationButton.innerHTML = originalHTML;

                        currentLocationButton.disabled = false;

                    }, 1800);

                },


                function (error) {

                    console.log("Location error:", error);


                    let errorMessage =
                        "Unable to get your location.";


                    if (error.code === 1) {

                        errorMessage =
                            "Please allow location access to use this feature.";

                    } else if (error.code === 2) {

                        errorMessage =
                            "Your location could not be determined.";

                    } else if (error.code === 3) {

                        errorMessage =
                            "Location request timed out.";

                    }


                    alert(errorMessage);


                    currentLocationButton.innerHTML = originalHTML;

                    currentLocationButton.disabled = false;

                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }

            );

        });

    }

});













/* =========================================================
   SECTION 7 — LOCATION FAQ
   PART 4 — FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".loc-faq-item");

    if (!faqItems.length) return;


    faqItems.forEach(function (item) {

        const question = item.querySelector(".loc-faq-question");

        if (!question) return;


        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            /* =============================================
               CLOSE ALL OTHER FAQ ITEMS
            ============================================= */

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherQuestion =
                        otherItem.querySelector(".loc-faq-question");

                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


            /* =============================================
               TOGGLE CURRENT FAQ
            ============================================= */

            if (isActive) {

                item.classList.remove("active");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});











/* =========================================================
   SCROLL TO TOP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;


    /* =====================================================
       SHOW / HIDE BUTTON
    ===================================================== */

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});