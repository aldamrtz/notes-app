const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  nav {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #86a788;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;
    color: #fffaf5;
    margin-bottom: 50px;
  }

  nav h1 {
    margin: 0;
    font-weight: 600;
    font-size: 1.5rem;
    user-select: none;
    display: flex;
    align-items: center;
  }

  input[type='search'] {
    font-size: 1rem;
    padding: 12px 12px;
    border-radius: 4px;
    border: none;
    outline: none;
    width: 250px;
    max-width: 100%;
    box-sizing: border-box;
    height: 35px;
    background-color: #fffaf5;
  }

  input[type='search']::placeholder {
    color: #4b3f3f;
    opacity: 0.5;
  }

  @media (max-width: 600px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
      padding: 16px;
      gap: 12px;
    }

    input[type='search'] {
      width: 100%;
    }

    nav h1 {
      font-size: 1.2rem;
    }
  }
`);

export default sheet;
