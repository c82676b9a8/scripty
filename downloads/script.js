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

const ADMIN_UID = "geFvGxBvYsUEBrT0ZPKBXRZ9gOr1";

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
      authForm?.classList.add("hidden");
      userProfile?.classList.remove("hidden");
      if (openBtn) openBtn.textContent = "ACCOUNT";

      if (emailEl) emailEl.textContent = user.email || "";
      if (uidEl) uidEl.textContent = user.uid || "";

      if (adminControls) {
        if (user.uid === ADMIN_UID) adminControls.classList.remove("hidden");
        else adminControls.classList.add("hidden");
      }
    } else {
      authForm?.classList.remove("hidden");
      userProfile?.classList.add("hidden");
      if (openBtn) openBtn.textContent = "LOGIN";
      adminControls?.classList.add("hidden");
    }
  });

  // --- Download buttons (safe placeholders) ---
  document.getElementById('btn-cs2')?.addEventListener('click', () => {
      // CS2 Download Link
      window.location.href = "https://github.com/c82676b9a8/scripty/raw/main/cheats/assets/files/CS2external.exe";
  });
  
  document.getElementById('btn-discord')?.addEventListener('click', () => {
      // Discord Download Link
      window.location.href = "https://github.com/c82676b9a8/scripty/raw/refs/heads/main/assets/files/loader.exe";
  });

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
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
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
