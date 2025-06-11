const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    display: block;
    height: 100%;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .note {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fffaf5;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-left: 5px solid var(--border-color, #86A788);
    opacity: 1;
  }

  .note-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .note h3 {
    margin: 0;
    color: #4B3F3F;
    font-size: 1.2rem;
    flex: 1;
    padding-right: 10px;
  }

  .note-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 130px;
  }

  .note-content p {
    margin: 0 0 8px 0;
    flex-grow: 1;
    color: #4B3F3F;
  }

  .note-content .note-date {
    color: #4B3F3F;
    margin: 0;
    align-self: flex-start;
  }

  .archive-btn {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1.0rem;
    padding: 0;
    margin: 0;
    transition: color 0.3s ease, transform 0.2s ease;
  }

  .archive-btn i.bi-archive,
  .archive-btn i.bi-archive-fill {
    color: var(--icon-color, #86A788);
    transition: color 0.3s ease, transform 0.2s ease;
  }

  .archive-btn:hover i.bi-archive {
    color: #91A8C5;
    transform: scale(1.2);
  }

  .archive-btn:hover i.bi-archive-fill {
    color: #86A788;
    transform: scale(1.2);
  }

  .note p {
    color: #4B3F3F;
  }

  .note small {
    display: block;
    margin-bottom: 8px;
    color: #91A8C5;
  }

  .delete-btn {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;
    color: #E97171;
    transition: color 0.3s ease;
  }

  .delete-btn:hover {
    color: #ff00004d;
  }
`);
export default sheet;
