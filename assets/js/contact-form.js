// Contact form via EmailJS.
// The *_PLACEHOLDER strings are replaced by GitHub Actions at deploy time
// (see .github/workflows/deploy.yml). Keep them exactly as written.
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form || typeof emailjs === "undefined") return;

  emailjs.init("EMAILJS_PUBLIC_KEY_PLACEHOLDER");

  var messageDiv = document.getElementById("form-message");
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitHtml = submitBtn.innerHTML;

  function show(type, text) {
    messageDiv.innerHTML = '<div class="alert ' + (type === "ok" ? "is-ok" : "is-err") + '">' + text + "</div>";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var fname = document.getElementById("fname").value.trim();
    var lname = document.getElementById("lname").value.trim();
    var email = document.getElementById("email").value.trim();
    var phoneEl = document.getElementById("phone");
    var phone = phoneEl ? phoneEl.value.trim() : "";
    var message = document.getElementById("message").value.trim();

    if (!fname || !lname || !email || !message) {
      show("err", "Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      show("err", "Please enter a valid email address.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    messageDiv.innerHTML = "";

    var currentDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });

    var templateParams = {
      from_fname: fname,
      from_lname: lname,
      from_email: email,
      from_phone: phone || "Not provided",
      message: message,
      current_date: currentDate
    };

    emailjs
      .send("EMAILJS_SERVICE_ID_PLACEHOLDER", "EMAILJS_TEMPLATE_ID_PLACEHOLDER", templateParams)
      .then(function () {
        show("ok", "Message sent. Thank you, I will get back to you soon.");
        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        show("err", "Failed to send message. Please try again later.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitHtml;
      });
  });
})();
