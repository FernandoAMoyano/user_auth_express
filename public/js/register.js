export async function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const username = document.getElementById("registerUsername").value;

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
}
