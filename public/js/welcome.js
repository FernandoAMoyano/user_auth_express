export function showWelcomeMessage() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username") || "usuario";
  const welcomeMsg = document.getElementById("welcome-message");
  if (welcomeMsg) {
    welcomeMsg.textContent = `Hola, ${username}`;
  }
}

showWelcomeMessage();
