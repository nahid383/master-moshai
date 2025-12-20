const API = "http://localhost:5000/api";

// REGISTER
async function register() {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("r-name").value,
      email: document.getElementById("r-email").value,
      password: document.getElementById("r-password").value,
      role: "student",
      language: "en"
    }),
  });

  const data = await res.json();
  alert(data.message || "Registered successfully");
}

// LOGIN
async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("l-email").value,
      password: document.getElementById("l-password").value,
    }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}
