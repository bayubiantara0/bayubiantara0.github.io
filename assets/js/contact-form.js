// Initialize EmailJS
emailjs.init("EMAILJS_PUBLIC_KEY_PLACEHOLDER");

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const messageDiv = document.getElementById("form-message");

  // Validasi client-side
  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fname || !lname || !email || !message) {
    messageDiv.innerHTML =
      '<div style="color: red; font-weight: bold; padding: 10px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px;">Please fill in all required fields.</div>';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageDiv.innerHTML =
      '<div style="color: red; font-weight: bold; padding: 10px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px;">Please enter a valid email address.</div>';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  messageDiv.innerHTML = "";

  // Send email using EmailJS
  emailjs
    .sendForm(
      "EMAILJS_SERVICE_ID_PLACEHOLDER",
      "EMAILJS_TEMPLATE_ID_PLACEHOLDER",
      this
    )
    .then(function () {
      messageDiv.innerHTML =
        '<div style="color: green; font-weight: bold; padding: 10px; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px;">Message sent successfully! Thank you for contacting us.</div>';
      document.getElementById("contactForm").reset();
    })
    .catch(function (error) {
      console.error("EmailJS Error:", error);
      messageDiv.innerHTML =
        '<div style="color: red; font-weight: bold; padding: 10px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px;">Failed to send message. Please try again later.</div>';
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
});
