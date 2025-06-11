import styleSheet from '../styles/note-item.css.js';

export class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['archived'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._archived = false;
    this.shadowRoot.adoptedStyleSheets = [styleSheet];
  }

  set note(note) {
    this._note = note;
    this._archived = note.archived;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'archived') {
      this._archived = newValue === 'true';
      this.render();
    }
  }

  render() {
    const dateObj = new Date(this._note.createdAt);
    const formattedDate =
      dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) +
      ', ' +
      dateObj.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });

    const color = this._archived ? '#91A8C5' : '#86A788';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
      <div class="note" style="--border-color: ${color}; --icon-color: ${color};">
        <div class="note-header">
          <h3>${this._note.title}</h3>
          <button class="archive-btn" title="${
            this._archived ? 'Unarchive' : 'Archive'
          }">
            <i class="bi ${
              this._archived ? 'bi-archive-fill' : 'bi-archive'
            }"></i>
          </button>
          <button class="delete-btn" title="Hapus Catatan">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
  
        <div class="note-content">
          <p>${this._note.body}</p>
          <small class="note-date">${formattedDate}</small>
        </div>
  
        ${this._archived ? '<small><em>Catatan Diarsipkan</em></small>' : ''}
      </div>
    `;

    this.shadowRoot
      .querySelector('.archive-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('toggle-archive', {
            bubbles: true,
            composed: true,
            detail: { id: this._note.id },
          })
        );
      });

    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            bubbles: true,
            composed: true,
            detail: { id: this._note.id },
          })
        );
      });
  }
}

customElements.define('note-item', NoteItem);
