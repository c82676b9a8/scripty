document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');
    const loginContainer = document.getElementById('login-container');
    const menuContainer = document.getElementById('menu-container');
    let cooldown = false;

    const API_URL = 'https://api.jsonbin.io/v3/b/6881eeb57b4b8670d8a67ea9/latest';
    const API_KEY = '$2a$10$D9MnBNmGXxinptCs1jFHUuAxy9eG2DDpq4JW/0zwUCuS06Wn9OS8u';

    async function fetchUserData() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'X-Master-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch user data');
            const users = await response.json();
            return users;
        } catch (err) {
            errorMsg.textContent = 'Server error, try again later.';
            throw err;
        }
    }

    function startCooldown() {
        cooldown = true;
        document.getElementById('login-btn').disabled = true;
        setTimeout(() => {
            cooldown = false;
            document.getElementById('login-btn').disabled = false;
        }, 5000);
    }

    if (cooldown) return;

    errorMsg.textContent = '';

    if (!username || !password) {
        errorMsg.textContent = 'Please fill in both fields.';
        return;
    }

    try {
        const users = await fetchUserData();
        const userEntry = Object.values(users.record).find(
            (user) => user.username === username && user.password === password
        );

        if (userEntry) {
            loginContainer.style.display = 'none';
            menuContainer.style.display = 'block';
        } else {
            errorMsg.textContent = 'Invalid username or password.';
            startCooldown();
        }
    } catch {
    }
});

document.getElementById('download-btn').addEventListener('click', () => {
    window.location.href = 'run.bat';
});
