// Early-access sign-ups. Set FORM_ENDPOINT to the form service URL
// (for example a Formspree endpoint) to start collecting sign-ups.
const FORM_ENDPOINT = "https://formspree.io/f/xwlvqaal";

const form = document.getElementById("signup-form");
const statusLine = document.getElementById("form-status");
const button = form.querySelector('button[type="submit"]');
const buttonLabel = button.textContent;

if (!FORM_ENDPOINT) {
  button.disabled = true;
  button.textContent = "Sign-ups open shortly";
  statusLine.textContent = "We're switching sign-ups on this week. Please check back soon.";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!FORM_ENDPOINT) return;

  button.disabled = true;
  button.textContent = "Sending…";
  statusLine.className = "form-status";
  statusLine.textContent = "";

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    form.reset();
    statusLine.className = "form-status ok";
    statusLine.textContent = "You're on the list. We'll be in touch when your spot opens.";
  } catch (error) {
    statusLine.className = "form-status err";
    statusLine.textContent = "That didn't go through. Check your connection and try again.";
  } finally {
    button.disabled = false;
    button.textContent = buttonLabel;
  }
});
