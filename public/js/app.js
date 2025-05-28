import { showRegisterForm, showLoginForm } from "./formNavigation.js";
import { handleRegister } from "./register.js";
import { handleLogin } from "./login.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado y analizado");

  document.getElementById("showRegister").addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterForm();
  });

  document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    showLoginForm();
  });

  document
    .getElementById("registerForm")
    .addEventListener("submit", handleRegister);
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
});
