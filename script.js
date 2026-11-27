
// =========================
// HIMANSHU PUJARI PORTFOLIO
// COMPLETE JAVASCRIPT
// =========================


// =========================
// EMAILJS INITIALIZATION
// =========================

emailjs.init({
    publicKey: "sVyBzZdf3Z_7X4rkk",
    blockHeadless: true,
    limitRate: {
        id: "himanshu-portfolio-contact",
        throttle: 10000
    }
});


// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function(link) {
        link.addEventListener("click", function() {
            navLinks.classList.remove("active");
        });
    });
}


// =========================
// AUTOMATIC CURRENT YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================
// DARK MODE / LIGHT MODE
// =========================

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


// =========================
// SECURE CONTACT FORM
// EMAILJS INTEGRATION
// =========================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {

    let isSending = false;
    let lastSubmitTime = 0;

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (isSending) return;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const honeypot = document.getElementById("website");

        const submitBtn = contactForm.querySelector(
            'button[type="submit"]'
        );

        // Honeypot Spam Protection

        if (honeypot && honeypot.value.trim() !== "") {
            formStatus.textContent =
                "Unable to process your request.";
            return;
        }

        // Input Validation

        if (!name || !email || !message) {
            formStatus.textContent = "Please fill all fields!";
            return;
        }

        if (
            name.length > 60 ||
            email.length > 254 ||
            message.length > 2000
        ) {
            formStatus.textContent =
                "Input exceeds allowed length.";
            return;
        }

        // Email Validation

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formStatus.textContent =
                "Please enter a valid email address!";
            return;
        }

        // Submission Cooldown

        const now = Date.now();

        if (now - lastSubmitTime < 10000) {
            formStatus.textContent =
                "Please wait before sending another message.";
            return;
        }

        if (typeof emailjs === "undefined") {
            formStatus.textContent =
                "Email service is unavailable. Please try again.";
            return;
        }

        isSending = true;

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
        }

        formStatus.textContent = "Sending your message...";
        formStatus.style.color = "#60a5fa";

        // Email Template Parameters

        const templateParams = {
            name: name,
            email: email,
            message: message,
            time: new Date().toLocaleString("en-IN")
        };

        try {

            await emailjs.send(
                "service_z06lkc5",
                "template_2dx1p7h",
                templateParams
            );

            lastSubmitTime = Date.now();

            formStatus.textContent =
                "Thank you " + name +
                "! Your message has been sent successfully.";

            formStatus.style.color = "#22c55e";

            contactForm.reset();

        } catch (error) {

            console.error("Contact form submission failed:", error);

            formStatus.textContent =
                "Message could not be sent. Please try again later.";

            formStatus.style.color = "#ef4444";

        } finally {

            isSending = false;

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            }

        }

    });
}
