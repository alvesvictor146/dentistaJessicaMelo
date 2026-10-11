// Custom Cursor (Mouse Follow) with Smooth Lerp
class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.custom-cursor-dot');
    this.ring = document.querySelector('.custom-cursor-ring');
    
    if (!this.dot || !this.ring) return;

    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.ringPos = { x: this.mouse.x, y: this.mouse.y };
    this.lerpFactor = 0.16;
    
    this.init();
  }

  init() {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Direct placement for dot
      this.dot.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px)`;
    });

    // Check hover states
    const interactiveElements = 'a, button, input, select, textarea, .treatment-tilt-card, .comparison-slider-handle, .floating-whatsapp-btn, .hero-floating-tooth';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    // Animate ring with lerp
    this.render();
  }

  render() {
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * this.lerpFactor;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * this.lerpFactor;

    this.ring.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px)`;
    requestAnimationFrame(() => this.render());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});
