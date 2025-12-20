// ================= CONFIG =================
const API = "http://localhost:5000/api";

// ================= LOAD TEST LIST =================
async function loadTests() {
  console.log("loadTests() called");

  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      alert("Please login first. Token missing.");
      return;
    }

    const res = await fetch(`${API}/tests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Status:", res.status);

    const data = await res.json();
    console.log("Response data:", data);

    const list = document.getElementById("testList");
    if (!list) return;

    list.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      list.innerHTML = "<li>No tests found</li>";
      return;
    }

    data.forEach((t) => {
      list.innerHTML += `
        <li>
          <strong>${t.title}</strong>
          <button onclick="startTest('${t._id}', '${t.title}')">
            Start
          </button>
        </li>
      `;
    });
  } catch (err) {
    console.error("Frontend error:", err);
    alert("Error loading tests. Check console.");
  }
}

// ================= START TEST =================
function startTest(testId, title) {
  // 🔥 CLEAN the ID (VERY IMPORTANT)
  const cleanId = testId.trim();

  localStorage.setItem("testId", cleanId);
  localStorage.setItem("testTitle", title.trim());

  console.log("Saved testId:", cleanId);

  window.location.href = "take-test.html";
}


// ================= LOAD QUESTIONS =================
async function loadQuestions() {
  const testId = localStorage.getItem("testId")?.trim();
  const token = localStorage.getItem("token");

  if (!testId || !token) {
    alert("Missing test or login info");
    return;
  }

  document.getElementById("testTitle").innerText =
    localStorage.getItem("testTitle") || "Test";

  try {
    const res = await fetch(`${API}/tests/${testId}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    const questions = text ? JSON.parse(text) : [];
    const form = document.getElementById("questionForm");

    form.innerHTML = "";

    questions.forEach((q, index) => {
      form.innerHTML += `
        <div class="card">
          <p>${index + 1}. ${q.question}</p>
          ${q.options
            .map(
              (opt, i) => `
            <label>
              <input type="radio" name="q${index}" value="${i}" />
              ${opt}
            </label>
          `
            )
            .join("")}
        </div>
      `;
    });
  } catch (err) {
    console.error("Error loading questions:", err);
    alert("Failed to load questions");
  }
}

// ================= SUBMIT TEST =================
async function submitTest() {
  const testId = localStorage.getItem("testId");
  const token = localStorage.getItem("token");

  if (!testId || !token) {
    alert("Missing test or login info");
    return;
  }

  const answers = [];
  const questions = document.querySelectorAll(
    "[name^='q']"
  );
  const total = new Set(
    Array.from(questions).map((q) => q.name)
  ).size;

  for (let i = 0; i < total; i++) {
    const selected = document.querySelector(
      `input[name="q${i}"]:checked`
    );
    answers.push(selected ? Number(selected.value) : -1);
  }

  try {
    const res = await fetch(`${API}/tests/${testId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers }),
    });

    const result = await res.json();

    document.getElementById(
      "result"
    ).innerText = `Score: ${result.score} / ${result.total}`;
  } catch (err) {
    console.error("Submit error:", err);
    alert("Failed to submit test");
  }
}

// ================= AUTO INIT =================
if (window.location.pathname.includes("tests.html")) {
  loadTests();
}

if (window.location.pathname.includes("take-test.html")) {
  loadQuestions();
}
