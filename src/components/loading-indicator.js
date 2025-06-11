import styleSheet from '../styles/loading-indicator.css.js';

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.adoptedStyleSheets = [styleSheet];

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="wrapper">
        <div class="title">Notes App</div>
        <div class="loader">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(wrapper);
  }

  connectedCallback() {
    this.animateDots();
  }

  animateDots() {
    const dots = this.shadowRoot.querySelectorAll('.dot');

    dots.forEach((dot, i) => {
      anime({
        targets: dot,
        translateY: [
          { value: -20, duration: 650, easing: 'easeOutQuad' },
          { value: 0, duration: 650, easing: 'easeInQuad' },
        ],
        opacity: [
          { value: 1, duration: 650, easing: 'linear' },
          { value: 0.7, duration: 650, easing: 'linear' },
        ],
        scale: [
          { value: 1.3, duration: 650, easing: 'easeOutQuad' },
          { value: 1, duration: 650, easing: 'easeInQuad' },
        ],
        delay: i * 200,
        loop: true,
        direction: 'alternate',
      });
    });
  }
}

customElements.define('loading-indicator', LoadingIndicator);
