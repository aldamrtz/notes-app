import styleSheet from '../styles/note-form.css.js';

export class NoteForm extends HTMLElement {
  static get observedAttributes() {
    return ['min-title-length', 'min-body-length'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._minTitleLength = 3;
    this._minBodyLength = 5;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'min-title-length') {
      const val = parseInt(newValue);
      this._minTitleLength = isNaN(val) ? 3 : val;
    } else if (name === 'min-body-length') {
      const val = parseInt(newValue);
      this._minBodyLength = isNaN(val) ? 5 : val;
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('min-title-length')) {
      this.setAttribute('min-title-length', this._minTitleLength);
    }
    if (!this.hasAttribute('min-body-length')) {
      this.setAttribute('min-body-length', this._minBodyLength);
    }

    this.shadowRoot.adoptedStyleSheets = [styleSheet];
    this.render();

    const form = this.shadowRoot.querySelector('form');
    const titleInput = this.shadowRoot.querySelector('#title');
    const bodyInput = this.shadowRoot.querySelector('#body');
    const titleError = this.shadowRoot.querySelector('#title-error');
    const bodyError = this.shadowRoot.querySelector('#body-error');
    const titleLabel = this.shadowRoot.querySelector('label[for="title"]');
    const bodyLabel = this.shadowRoot.querySelector('label[for="body"]');

    const minTitleLength = this._minTitleLength;
    const minBodyLength = this._minBodyLength;

    const setError = (input, label, errorElem, message) => {
      errorElem.textContent = message;
      input.classList.add('input-error');
      label.classList.add('label-error');
    };

    const clearError = (input, label, errorElem) => {
      errorElem.textContent = '';
      input.classList.remove('input-error');
      label.classList.remove('label-error');
    };

    titleInput.addEventListener('input', () => {
      const value = titleInput.value.trim();
      if (!value) {
        setError(titleInput, titleLabel, titleError, 'Judul wajib diisi.');
      } else if (value.length < minTitleLength) {
        setError(
          titleInput,
          titleLabel,
          titleError,
          `Judul minimal ${minTitleLength} karakter.`
        );
      } else {
        clearError(titleInput, titleLabel, titleError);
      }
    });

    bodyInput.addEventListener('input', () => {
      const value = bodyInput.value.trim();
      if (!value) {
        setError(bodyInput, bodyLabel, bodyError, 'Isi catatan wajib diisi.');
      } else if (value.length < minBodyLength) {
        setError(
          bodyInput,
          bodyLabel,
          bodyError,
          `Isi catatan minimal ${minBodyLength} karakter.`
        );
      } else {
        clearError(bodyInput, bodyLabel, bodyError);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      let valid = true;

      if (!title) {
        setError(titleInput, titleLabel, titleError, 'Judul wajib diisi.');
        valid = false;
      } else if (title.length < minTitleLength) {
        setError(
          titleInput,
          titleLabel,
          titleError,
          `Judul minimal ${minTitleLength} karakter.`
        );
        valid = false;
      } else {
        clearError(titleInput, titleLabel, titleError);
      }

      if (!body) {
        setError(bodyInput, bodyLabel, bodyError, 'Isi catatan wajib diisi.');
        valid = false;
      } else if (body.length < minBodyLength) {
        setError(
          bodyInput,
          bodyLabel,
          bodyError,
          `Isi catatan minimal ${minBodyLength} karakter.`
        );
        valid = false;
      } else {
        clearError(bodyInput, bodyLabel, bodyError);
      }

      if (!valid) return;

      this.dispatchEvent(
        new CustomEvent('note-submitted', {
          detail: { title, body },
          bubbles: true,
          composed: true,
        })
      );

      form.reset();
      clearError(titleInput, titleLabel, titleError);
      clearError(bodyInput, bodyLabel, bodyError);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="form-container">
        <form>
          <div class="input-group">
            <input id="title" type="text" placeholder=" " required />
            <label for="title">Judul catatan</label>
            <span id="title-error" class="error-message"></span>
          </div>
  
          <div class="input-group">
            <textarea id="body" rows="6" placeholder=" " required></textarea>
            <label for="body">Isi catatan</label>
            <span id="body-error" class="error-message"></span>
          </div>
  
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>
    `;
  }
}

customElements.define('note-form', NoteForm);
