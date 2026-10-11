// Interactive Before & After Smile Slider
class SmileComparison {
  constructor() {
    this.container = document.querySelector('.comparison-container');
    this.afterPane = document.querySelector('.comparison-after');
    this.handle = document.querySelector('.comparison-slider-handle');

    if (!this.container || !this.afterPane || !this.handle) return;

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
      this.afterPane.style.width = `${percent}%`;
      this.handle.style.left = `${percent}%`;
    };

    // Mouse & Touch events
    const startDrag = () => { this.isDragging = true; };
    const stopDrag = () => { this.isDragging = false; };

    this.handle.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        moveSlider(e.clientX);
      }
    });

    // Touch support for smartphones
    this.handle.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches[0]) {
        moveSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    // Interactive hover slide when hovering over container without click
    this.container.addEventListener('mousemove', (e) => {
      if (!this.isDragging) {
        moveSlider(e.clientX);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SmileComparison();
});
