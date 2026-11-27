
/* =========================
   HIMANSHU PUJARI PORTFOLIO
   COMPLETE JAVASCRIPT
========================= */


/* =========================
   EMAILJS INITIALIZATION
========================= */

emailjs.init({
    publicKey: "sVyBzZdf3Z_7X4rkk",
    blockHeadless: true,
    limitRate: {
        id: "portfolio-contact",
        throttle: 10000
    }
});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuBtn.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });


    /* Close Menu After Clicking Link */

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuBtn.innerHTML = '<i class="fas fa-bars">';

            menuBtn.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        themeToggle.innerHTML = isLight
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

    });

}


/* =========================
   FOOTER CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

let lastSubmissionTime = 0;

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* =========================
           HONEYPOT SPAM PROTECTION
        ========================= */

        const honeypot = document.getElementById("website");

        if (honeypot && honeypot.value.trim() !== "") {

            contactForm.reset();

            if (formStatus) {
                formStatus.textContent = "Message submitted.";
            }

            return;
        }


        /* =========================
           GET FORM DATA
        ========================= */

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();


        /* =========================
           BASIC VALIDATION
        ========================= */

        if (!name || !email || !message) {

            if (formStatus) {
                formStatus.textContent =
                    "Please fill in all fields.";
            }

            return;
        }


        /* =========================
           LENGTH VALIDATION
        ========================= */

        if (name.length > 60) {

            if (formStatus) {
                formStatus.textContent =
                    "Name is too long.";
            }

            return;
        }


        if (email.length > 254) {

            if (formStatus) {
                formStatus.textContent =
                    "Email address is too long.";
            }

            return;
        }


        if (message.length > 2000) {

            if (formStatus) {
                formStatus.textContent =
                    "Message is too long.";
            }

            return;
        }


        /* =========================
           EMAIL VALIDATION
        ========================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            if (formStatus) {
                formStatus.textContent =
                    "Please enter a valid email address.";
            }

            return;
        }


        /* =========================
           COOLDOWN PROTECTION
        ========================= */

        const currentTime = Date.now();

        if (currentTime - lastSubmissionTime < 10000) {

            if (formStatus) {
                formStatus.textContent =
                    "Please wait before sending another message.";
            }

            return;
        }


        /* =========================
           EMAILJS CHECK
        ========================= */

        if (typeof emailjs === "undefined") {

            if (formStatus) {
                formStatus.textContent =
                    "Email service is currently unavailable.";
            }

            return;
        }


        /* =========================
           PREPARE EMAIL PARAMETERS
        ========================= */

        const templateParams = {
            name: name,
            email: email,
            message: message
        };


        /* =========================
           SUBMIT EMAIL
        ========================= */

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.innerHTML
            : "";


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';

        }


        if (formStatus) {
            formStatus.textContent = "Sending your message...";
        }


        lastSubmissionTime = currentTime;


        try {

            await emailjs.send(
                "service_z06lkc5",
                "template_2dx1p7h",
                templateParams
            );


            /* =========================
               SUCCESS
            ========================= */

            if (formStatus) {

                formStatus.textContent =
                    "Your message has been sent successfully!";

            }

            contactForm.reset();


        } catch (error) {

            console.error("EmailJS Error:", error);


            /* =========================
               ERROR
            ========================= */

            if (formStatus) {

                formStatus.textContent =
                    "Unable to send your message. Please try again later.";

            }

        } finally {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML = originalButtonText;

            }

        }

    });

}


/* =========================
   END OF PORTFOLIO SCRIPT
========================= */
