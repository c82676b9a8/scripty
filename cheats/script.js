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
  
})


