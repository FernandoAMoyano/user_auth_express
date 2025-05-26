document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado y analizado");

  document.getElementById("showRegister").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
  });

  document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
  });

  /* Registro */
  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const username = document.getElementById("registerUsername").value;

      // Log para depuración
      console.log("Registro:", { email, password, username });

      if (!email || !password || !username) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password, username }),
          credentials: "include",
        });

        // Log para depuración
        console.log("Respuesta registro:", res);

        if (!res.ok) {
          const errorData = await res
            .json()
            .catch(() => ({ error: "Error desconocido" }));
          alert(errorData.error || "Error desconocido");
          return;
        }

        const data = await res.json();
        alert(data.message);
      } catch (error) {
        console.error("Error al registrar usuario", error);
        alert("Error al registrar usuario");
      }
    });

  /* Login */
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit login activado");

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        window.location.href = `welcome.html?username=${encodeURIComponent(
          data.username
        )}`;
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      alert("Error al iniciar sesión");
    }
  });
});

const params = new URLSearchParams(window.location.search);
const username = params.get("username") || "usuario";
document.getElementById("welcome-message").textContent = `Hola, ${username}`;
