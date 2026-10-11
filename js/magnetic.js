// Magnetic Buttons Effect
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn-magnetic, .floating-whatsapp-btn');
    this.init();
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Strength of magnetic attraction
        const pull = btn.classList.contains('floating-whatsapp-btn') ? 0.35 : 0.28;

        btn.style.transform = `translate(${x * pull}px, ${y * pull}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MagneticButtons();
});
