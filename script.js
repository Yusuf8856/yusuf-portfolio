const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("navMenu");

menuBtn.onclick = () => {
  if (navMenu.style.display === "flex") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "flex";
  }
};

// THEME SWITCHER
const themeSelect = document.getElementById("theme-switcher");
const savedTheme = localStorage.getItem("theme") || "blue";

document.body.className = savedTheme;
themeSelect.value = savedTheme;

themeSelect.onchange = () => {
  document.body.className = themeSelect.value;
  localStorage.setItem("theme", themeSelect.value);
};

/* FINAL WORKING CERTIFICATE MODAL JS */

// Open modal
function openCertificate(imageSrc) {
  const modal = document.getElementById("certModal");
  const img = document.getElementById("certImage");

  img.src = imageSrc;
  modal.style.display = "flex";
}

// Close on X
document.getElementById("closeModal").onclick = function () {
  document.getElementById("certModal").style.display = "none";
};

// Close when clicking outside modal-inner
window.addEventListener("click", function (e) {
  const modal = document.getElementById("certModal");
  const modalInner = document.querySelector(".modal-inner");

  if (e.target === modal) {
    modal.style.display = "none";
  }
});
// Close on ESC key
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("certModal").style.display = "none";
  }
});

//for sending message through email

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "block"; // Show spinner

    let params = {
      from_name: this.from_name.value,
      from_email: this.from_email.value,
      message: this.message.value,
      time: new Date().toLocaleString(),
    };

    // 1️⃣ SEND MESSAGE TO YOU
    emailjs
      .send("service_gnyxxzb", "template_o649pj2", params)
      .then(() => {
        // 2️⃣ SEND AUTO-REPLY TO USER
        emailjs.send("service_gnyxxzb", "template_g4052bf", {
          from_name: params.from_name,
          from_email: params.from_email,
        });

        spinner.style.display = "none"; // Hide spinner
        alert("Message sent! A confirmation email has been sent to you.");
        this.reset();
      })
      .catch((error) => {
        spinner.style.display = "none"; // Hide spinner
        alert("Failed to send message. Please try again.");
        console.error(error);
      });
  });
