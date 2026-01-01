const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2tmN4GXEAogsflSlZ7bRNwd2g8KkunKQvrPkoKNhKwM7cA5c6cYlxnXN-qBti5HGz/exec"; 
let userData = {};

// ---------------- LOGIN ----------------
function submitLogin() {
  const username = document.getElementById("username").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("loginEmail").value;

  if (!username || !contact) {
    alert("Username and Contact Number are required!");
    return;
  }

  userData = { username, contact, email };

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ type: "login", ...userData }),
    // IMPORTANT: omit headers to avoid preflight
  })
  .then(res => res.text())
  .then(() => {
    alert("Login successful!");
    document.getElementById("loginModal").style.display = "none";
  })
  .catch(err => alert("Error: " + err));
}

// ---------------- HERO ORDER ----------------
document.getElementById("order-now").addEventListener("click", function() {
  if (!userData.username || !userData.contact) {
    alert("Please login first!");
    return;
  }

  const data = { type: "order", ...userData, boxType: "Hero Order" };

  fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
    .then(res => res.text())
    .then(() => alert("Thanks for your interest! We’ll contact you soon."))
    .catch(err => alert("Error: " + err));
});

// ---------------- FRUIT BOX ORDERS ----------------
document.querySelectorAll('.order-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    if (!userData.username || !userData.contact) {
      alert("Please login first!");
      return;
    }

    const boxType = this.previousElementSibling.previousElementSibling.textContent;
    const data = { type: "order", ...userData, boxType };

    fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
      .then(res => res.text())
      .then(() => alert("Your order has been placed! We’ll contact you soon."))
      .catch(err => alert("Error: " + err));
  });
});

// ---------------- CONTACT FORM ----------------
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const data = {
    type: "contact",
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
    .then(res => res.text())
    .then(() => alert("Thank you for reaching out! We will get back to you soon."))
    .catch(err => alert("Error: " + err));
});
