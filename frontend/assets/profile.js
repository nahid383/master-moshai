const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// Load grades on page load
window.onload = loadGrades;

async function loadGrades() {
  const res = await fetch(`${API}/academic/grades`);
  const grades = await res.json();

  const gradeSelect = document.getElementById("gradeSelect");

  grades.forEach((g) => {
    const option = document.createElement("option");
    option.value = g._id;
    option.textContent = g.name;
    gradeSelect.appendChild(option);
  });
}

// Load subjects by grade
async function loadSubjects() {
  const gradeId = document.getElementById("gradeSelect").value;
  const res = await fetch(`${API}/academic/subjects/${gradeId}`);
  const subjects = await res.json();

  const box = document.getElementById("subjects");
  box.innerHTML = "";

  subjects.forEach((s) => {
    box.innerHTML += `
      <label>
        <input type="checkbox" value="${s._id}" />
        ${s.name}
      </label><br/>
    `;
  });
}

// Create student profile
async function createProfile() {
  const grade = document.getElementById("gradeSelect").value;
  const subjects = Array.from(
    document.querySelectorAll("#subjects input:checked")
  ).map((i) => i.value);

  const res = await fetch(`${API}/student-profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ grade, subjects }),
  });

  const data = await res.json();
  document.getElementById("msg").innerText =
    data.message || "Profile created successfully 🎉";
}
