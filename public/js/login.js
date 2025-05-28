export async function handleLogin(e) {
  e.preventDefault();

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
}
