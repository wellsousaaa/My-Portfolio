import "/styles/Contact.css";
import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AiOutlineLinkedin,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineGithub,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";

const HALF_HOUR = 1800000;

export default function Contact({urls}) {
  const [loading, setLoading] = useState(false);

  const handleStatus = (state) => {
    const message =
      state === "ERROR"
        ? "😥 Não foi possivel enviar o seu email. Tente novamente mais tarde por favor..."
        : "😁 Seu email foi enviado com sucesso. Muito obrigado pela interação! ";

    const color =
      state === "ERROR" ? "rgba(244, 67, 54, 0.75)" : "rgba(31, 197, 31, 0.75)";

    setLoading(false)

    if(state === "ERROR") toast.error(message);
    else toast.success(message)
  };

  const submitForm = (ev) => {
    ev.preventDefault();

    const lastDate = localStorage.getItem("form_date");
    const newDate =(new Date()).getTime();

    if(lastDate && newDate - lastDate < HALF_HOUR) {
      return toast.error("🕓 Você já enviou uma mensagem recentemente, aguarde mais tarde...");
    }

    localStorage.setItem("form_date", newDate);

    if (document.contactForm.length !== 5) return toast.error("Aconteceu um erro! 😳");

    for (let i = 0; i < document.contactForm.length - 1; i++) {
      console.dir(document.contactForm[i].value);
      if (document.contactForm[i].value.trim(" ") === "") {
        document.contactForm[i].focus();
        return toast.error("👀 Preencha todos os campos corretamente...");
      }

      if (document.contactForm[3].value.length < 20) {
        document.contactForm[3].focus();
        document.contactForm[3].style.border = "1px solid red";
        return toast.error("Essa mensagem é muito curta! Tente enviar outra...");
      }
    }

    if (document.contactForm === "")
      setLoading(true);
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

  return (
    <>
      
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

          style={{ minWidth: "50vw", width: "fit-content", textAlign: "center" }} 
        />
        <div className="c-col" style={{margin: "auto"}}>
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
              href={urls[0]}
              target="_blank"
              className="flex social-icon facebook"
            >
              <AiOutlineFacebook />
              <p>Facebook</p>
            </a>
            <a
              href={urls[1]}
              target="_blank"
              className="flex social-icon instagram"
            >
              <AiOutlineInstagram />
              <p>Instagram</p>
            </a>
            <a
              href={urls[2]}
              target="_blank"
              className="flex social-icon github"
            >
              <AiOutlineGithub />
              <p>Github</p>
            </a>
            <a
              href={urls[3]}
              target="_blank"
              className="flex social-icon linkedin"
            >
              <AiOutlineLinkedin />
              <p>Linkedin</p>
            </a>
            <a
              href={urls[4]}
              target="_blank"
              className="flex social-icon telegram"
            >
              <FaTelegramPlane />
              <p>Telegram</p>
            </a>
          </div>
        </div>
    </>
  );
}
