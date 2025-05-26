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

      try {
        const res = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

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

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: POST,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        alert(data.message);
        window.location.href = "/protected";
      } else {
        alert(data.error);
      }

      const data = await res.json();
    } catch (error) {
      alert("Error al iniciar sesion");
    }
  });
});
