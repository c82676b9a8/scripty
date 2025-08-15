const form = document.getElementById("login-form");
const message = document.getElementById("message");
const loginBtn = document.getElementById("login-btn");

let cooldown = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cooldown) {
    message.textContent = "⏳ Please wait before trying again...";
    return;
  }

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  message.style.color = "#000";
  message.textContent = "🔍 Checking credentials...";

  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/6881eeb57b4b8670d8a67ea9", {
      headers: {
        "X-Master-Key": "$2a$10$D9MnBNmGXxinptCs1jFHUuAxy9eG2DDpq4JW/0zwUCuS06Wn9OS8u"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user database");
    }

    const data = await response.json();
    const users = data.record;

    // Search for a user with matching username and password
    let found = false;
    for (const userId in users) {
      const user = users[userId];
      if (user.username === username && user.password === password) {
        found = true;
        break;
      }
    }

    if (found) {
      message.style.color = "green";
      message.textContent = "✅ Login successful!";
    } else {
      message.style.color = "red";
      message.textContent = "❌ Invalid username or password.";
    }
  } catch (err) {
    message.style.color = "red";
    message.textContent = "⚠️ Error: " + err.message;
  }

  // Start 5-second cooldown
  cooldown = true;
  loginBtn.disabled = true;
  let seconds = 5;

  const interval = setInterval(() => {
    loginBtn.textContent = `Wait ${seconds}s`;
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      loginBtn.disabled = false;
      loginBtn.textContent = "Login";
      cooldown = false;
    }
  }, 1000);
});
