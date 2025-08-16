document.getElementById('login-btn').addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');
    const loginContainer = document.getElementById('login-container');
    const menu = document.getElementById('menu');

    let cooldown = false;

    async function fetchUserData() {
        try {
            const response = await fetch('/users');  // Your backend proxy endpoint
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
        const userEntry = Object.values(users).find(
            (user) => user.username === username && user.password === password
        );

        if (userEntry) {
            // Login success
            loginContainer.style.display = 'none';
            menu.style.display = 'block';
        } else {
            errorMsg.textContent = 'Invalid username or password.';
            startCooldown();
        }
    } catch {
        // errorMsg already set in fetchUserData()
    }
});

document.getElementById('download-btn').addEventListener('click', () => {
    window.location.href = 'run.bat';  // Download run.bat file
});
