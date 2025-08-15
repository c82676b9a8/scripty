const cooldownTime = 5000; // 5 seconds cooldown
let lastAttempt = 0;

async function login(username, password) {
  const now = Date.now();
  if (now - lastAttempt < cooldownTime) {
    alert("Please wait 5 seconds before trying again.");
    return;
  }
  lastAttempt = now;

  const response = await fetch('https://api.jsonbin.io/v3/b/6881eeb57b4b8670d8a67ea9/latest', {
    headers: {
      'X-Master-Key': '$2a$10$D9MnBNmGXxinptCs1jFHUuAxy9eG2DDpq4JW/0zwUCuS06Wn9OS8u'
    }
  });
  const data = await response.json();
  const users = data.record;

  for (const key in users) {
    const user = users[key];
    if (user.username === username && user.password === password) {
      showMenu();
      return;
    }
  }
  alert("Invalid username or password");
}

function showMenu() {
  document.body.innerHTML = `
    <h1>Welcome!</h1>
    <p>Download your file below:</p>
    <a href="run.bat" download>Download run.bat</a>
  `;
}
