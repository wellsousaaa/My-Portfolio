import "../styles/Contact.css";
import { useState } from "react";

import {
  AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineGithub,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
  const [messageBox, setMessageBox] = useState({
    message: null,
    color: null,
    display: false,
    loading: false,
  });

  const handleStatus = (state) => {
    const message =
      state === "ERROR"
        ? "Não foi possivel enviar o seu email. Tente novamente mais tarde por favor. :("
        : "Seu email foi enviado com sucesso. Muito obrigado pela interação! :D";

    const color =
      state === "ERROR" ? "rgba(244, 67, 54, 0.75)" : "rgba(31, 197, 31, 0.75)";

    setMessageBox({
      message,
      color,
      display: true,
      loading: false,
    });
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    if (document.contactForm.length !== 5) return;

    for (let i = 0; i < document.contactForm.length - 1; i++) {
      console.dir(document.contactForm[i].value);
      if (document.contactForm[i].value.trim(" ") === "") {
        document.contactForm[i].focus();
        return;
      }

      if (document.contactForm[3].value.length < 20) {
        document.contactForm[3].focus();
        document.contactForm[3].style.border = "1px solid red";
        return;
      }
    }

    if (document.contactForm === "")
      setMessageBox((m) => ({ ...m, display: false, loading: true }));
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        handleStatus("SUCESS");
      } else {
        handleStatus("ERROR");
      }
    };
    xhr.send(data);
  };

  const { display, message, color, loading } = messageBox;

  return (
    <>
      <div
        className={`alert`}
        style={{
          backgroundColor: color,
          transition: "all 200ms",
          opacity: display ? 1 : 0,
          visibility: display ? "visible" : "hidden",
          marginTop: display ? 0 : 25,
        }}
      >
        <span
          className="closebtn"
          onClick={() => {
            setMessageBox({ ...messageBox, display: false });
          }}
        >
          &times;
        </span>
        {message}
      </div>
      <section className="contact-container">
        <div className="c-col">
          <p id="contact" className="title" style={{ margin: "10px auto" }}>
            &#126; Contato &#126;
          </p>
          <div>
            <p className="contact-info">
              Se você quer entrar em contato comigo, conversar sobre algum
              projeto ou só bater um papo, preencha o formulário abaixo ou então
              entre em contato com alguma dos métodos abaixo :D
            </p>
          </div>
          <form
            className="contact-form"
            onSubmit={submitForm}
            name="contactForm"
            action="https://formspree.io/f/xpzoeryn"
            method="POST"
          >
            <label htmlFor="name">&middot; Seu nome: </label>
            <input required name="name" id="name" type="text" />

            <label htmlFor="email">&middot; Seu e-mail: </label>
            <input required name="email" id="email" type="email" />

            <label htmlFor="subject">&middot; O assunto da mensagem: </label>
            <input required name="subject" id="subject" type="text" />

            <label htmlFor="msg">&middot; Sua Mensagem: </label>
            <textarea required name="msg" id="msg"></textarea>

            <button className="contact-submit" disabled={loading}>
              Enviar
            </button>
          </form>
          <div className="flex social-container">
            <a
              href="https://www.facebook.com/wendell.sousa.75/"
              target="_blank"
              className="flex social-icon facebook"
            >
              <AiOutlineFacebook />
              <p>Facebook</p>
            </a>
            <a
              href="https://www.instagram.com/well.png/?hl=pt-br"
              target="_blank"
              className="flex social-icon instagram"
            >
              <AiOutlineInstagram />
              <p>Instagram</p>
            </a>
            <a
              href="https://github.com/wellsousaaa"
              target="_blank"
              className="flex social-icon github"
            >
              <AiOutlineGithub />
              <p>Github</p>
            </a>
            <a
              href="https://www.linkedin.com/in/wendellsousaaa/"
              target="_blank"
              className="flex social-icon linkedin"
            >
              <AiOutlineLinkedin />
              <p>Linkedin</p>
            </a>
            <a
              href="https://t.me/wellsousaaa"
              target="_blank"
              className="flex social-icon telegram"
            >
              <FaTelegramPlane />
              <p>Telegram</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
