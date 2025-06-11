const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    position: fixed;
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0;
    background-color: #fffaf5;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(4px);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .title {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    color: #4B3F3F;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .loader {
    display: flex;
    gap: 12px;
  }

  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #86A788;
    opacity: 0.7;
    transform-origin: center bottom;
  }

  .dot:nth-child(2) {
    background: #91A8C5;
  }

  .dot:nth-child(3) {
    background: #ff00004d;
  }
`);
export default sheet;
