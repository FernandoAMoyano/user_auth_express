const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", function (e) {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

showLogin.addEventListener("click", function (e) {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});
