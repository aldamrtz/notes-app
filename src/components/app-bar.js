import styleSheet from '../styles/app-bar.css.js';
const noteIcon = new URL('../assets/note.png', import.meta.url).href;

export class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  static get observedAttributes() {
    return ['search-note'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'search-note') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const showSearch = this.hasAttribute('search-note');

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
      <nav>
        <h1>
          <img src="${noteIcon}" alt="Notes App Icon" width="24" height="24" style="vertical-align: middle; margin-right: 10px;" />
          Notes App
        </h1>
        ${
          showSearch
            ? `<input type="search" placeholder="Cari catatan..." aria-label="Search notes" />`
            : ''
        }
      </nav>
    `;

    if (showSearch) {
      const searchInput = this.shadowRoot.querySelector('input[type="search"]');
      searchInput.addEventListener('input', (e) => {
        this.dispatchEvent(
          new CustomEvent('search-changed', {
            detail: { query: e.target.value },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  }
}

customElements.define('app-bar', AppBar);
