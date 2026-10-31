// Interactive Before & After Smile Slider
class SmileComparison {
  constructor() {
    this.container = document.querySelector('.comparison-container');
    this.overlayPane = document.querySelector('.comparison-before');
    this.handle = document.querySelector('.comparison-slider-handle');

    if (!this.container || !this.overlayPane || !this.handle) return;

    this.isDragging = false;
    this.init();
  }

  init() {
    const moveSlider = (clientX) => {
      const rect = this.container.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;

      // Constrain within 5% to 95%
      pos = Math.max(0.05, Math.min(0.95, pos));

      const percent = pos * 100;
      this.overlayPane.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      this.overlayPane.style.webkitClipPath = `inset(0 ${100 - percent}% 0 0)`;
      this.handle.style.left = `${percent}%`;
    };

    // Mouse & Touch events
    const startDrag = (e) => {
      this.isDragging = true;
      if (e.clientX !== undefined) {
        moveSlider(e.clientX);
      } else if (e.touches && e.touches[0]) {
        moveSlider(e.touches[0].clientX);
      }
    };
    const stopDrag = () => { this.isDragging = false; };

    this.handle.addEventListener('mousedown', startDrag);
    this.container.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        moveSlider(e.clientX);
      }
    });

    // Touch support for smartphones
    this.handle.addEventListener('touchstart', startDrag, { passive: true });
    this.container.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches[0]) {
        moveSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    // Interactive hover slide when hovering over container on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
      this.container.addEventListener('mousemove', (e) => {
        if (!this.isDragging) {
          moveSlider(e.clientX);
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SmileComparison();
});
