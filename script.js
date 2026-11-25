
/* =========================
   HIMANSHU PUJARI PORTFOLIO
   COMPLETE JAVASCRIPT
========================= */


/* =========================
   EMAILJS INITIALIZATION
========================= */

emailjs.init({
    publicKey: "sVyBzZdf3Z_7X4rkk"
});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    // Close Menu After Clicking Link

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function(link) {
        link.addEventListener("click", function() {
            navLinks.classList.remove("active");
        });
    });
}


/* =========================
   AUTOMATIC CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   DARK MODE / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", function() {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "🌙 Dark Mode";
        } else {
            themeBtn.textContent = "☀️ Light Mode";
        }

    });
}


/* =========================
   CONTACT FORM + EMAILJS
========================= */

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("message").value.trim();

        const submitBtn = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Form Validation

        if (!name || !email || !message) {

            formStatus.textContent = "Please fill all fields!";

            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            formStatus.textContent = "Please enter a valid email address!";

            return;
        }

        // Check EmailJS

        if (typeof emailjs === "undefined") {

            formStatus.textContent =
                "Email service is not loaded. Please try again.";

            return;
        }

        // Disable Button While Sending

        submitBtn.disabled = true;

        submitBtn.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";

        formStatus.style.color = "#60a5fa";

        // EmailJS Template Parameters

        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        try {

            // Send Email

            await emailjs.send(
                "service_z06lkc5",
                "template_2dx1p7h",
                templateParams
            );

            // Success Message

            formStatus.textContent =
                "Thank you " + name +
                "! Your message has been sent successfully.";

            formStatus.style.color = "#22c55e";

            // Reset Form

            contactForm.reset();

        } catch (error) {

            // Error Message

            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Sorry! Message could not be sent. Please try again.";

            formStatus.style.color = "#ef4444";

        } finally {

            // Enable Button Again

            submitBtn.disabled = false;

            submitBtn.textContent = "Send Message";

        }

    });

}
