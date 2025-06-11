const sheet = new CSSStyleSheet();
sheet.replaceSync(`
    .form-container {
        max-width: 85vw;
        margin: 25px auto;
        padding: 20px;
        background-color: #fffaf5;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-family: "Poppins", sans-serif;
    }

    .input-group {
        position: relative;
        width: 100%;
    }

    input, textarea {
        width: 100%;
        padding: 14px 12px;
        font-size: 1rem;
        border: 2px solid #86A788;
        border-radius: 6px;
        font-family: "Poppins", sans-serif;
        background-color: #fffaf5;
        box-sizing: border-box;
        outline: none;
        resize: vertical;
        transition: border-color 0.3s ease;
    }

    input::placeholder,
    textarea::placeholder {
        color: transparent;
    }

    label {
        position: absolute;
        top: 14px;
        left: 12px;
        font-size: 1rem;
        font-weight: bold;
        color: #86A788;
        pointer-events: none;
        background-color: #fffaf5;
        padding: 0 4px;
        transition: 0.3s ease all;
    }

    input:focus + label,
    input:not(:placeholder-shown) + label,
    textarea:focus + label,
    textarea:not(:placeholder-shown) + label {
        top: -8px;
        left: 8px;
        font-size: 0.8rem;
        color: #91A8C5;
        font-weight: 600;
    }

    input:not(:placeholder-shown):not(:focus):not(.input-error) + label,
    textarea:not(:placeholder-shown):not(:focus):not(.input-error) + label {
        color: #86A788;
        font-weight: 600;
    }

    input:focus, textarea:focus {
        border-color: #91A8C5;
        box-shadow: 0 0 8px rgba(145, 168, 197, 0.5);
    }

    .label-error {
        color: #E97171 !important;
    }

    .input-error {
        border-color: #E97171 !important;
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.3) !important;
    }

    .error-message {
        color: #E97171;
        font-size: 0.85rem;
        margin-top: 4px;
    }

    #title-error {
        display: block;
        margin-top: 8px;
    }

    button {
        background-color: #86A788;
        font-weight: bold;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #91A8C5;
    }

    @media (max-width: 600px) {
        .form-container {
        padding: 16px;
        margin: 20px;
        }

        input,
        textarea {
        font-size: 0.9rem;
        }

        label {
        font-size: 0.9rem;
        }

        button {
        font-size: 0.95rem;
        padding: 10px;
        }
    }

    @media (min-width: 601px) and (max-width: 1024px) {
        .form-container {
        padding: 20px;
        }

        input,
        textarea {
        font-size: 1rem;
        }

        label {
        font-size: 1rem;
        }
    }
`);
export default sheet;
