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
