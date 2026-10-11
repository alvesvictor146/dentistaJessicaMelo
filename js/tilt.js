// 3D Hover Card Tilt Effect with Dynamic Specular Light
class CardTilt3D {
  constructor() {
    this.cards = document.querySelectorAll('.treatment-tilt-card, .review-card, .exp-main-img-card');
    this.init();
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position coordinates for glare reflection
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute 3D rotation angles
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -9; // max 9 deg
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CardTilt3D();
});
