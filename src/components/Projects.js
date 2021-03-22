import "../styles/Projects.css";
import star from "../media/star.png";
import fnafImage from "../media/FNAF.webp";
import ecommerceImage from "../media/ecommerce.webp";
import kiddingImage from "../media/kidding.jpg";
import dixitImage from "../media/dixit.jpg";
import { useState, useEffect } from "react";

import Project from "./Project";

let carouselInterval = null;

const projects = [
  {
    img: ecommerceImage,
    title: "Online Store  E-Commerce",
    url: "https://store-plus.netlify.app/",
    git: "https://github.com/wellsousaaa/ecommerce-frontend-plus",
    tech: ["ReactJS", "NodeJS", "HTML/CSS", "MySQL", "Sass"],
    description: `Essa é uma demo de uma loja online que eu criei. O site é responsivo, é reativo e integra a API de pagamentos Stripe!`,
  },
  {
    img: fnafImage,
    title: "Five Nights at Freddy's Web",
    url: "https://five-nights-at-freddys.herokuapp.com/",
    git: "https://github.com/wellsousaaa/Five-Nights-at-Freddys-Web.git",
    tech: ["ReactJS", "Redux", "Sass", "HTML/CSS"],
    description: `Uma versão do famoso jogo FNAF (2014) que eu recriei para ser jogado no navegador! A aplicação foi feita em React-Redux.`,
  },
  {
    img: kiddingImage,
    title: "Kidding - Aprendendo Inglês",
    url: "*",
    git: "*",
    tech: ["HTML/CSS", "Javascript", "FECEG", "Sass", "Bootstrap"],
    description: `Kidding é um site educacional que ensina inglês para crianças de 4 à 7 anos de idade. O site foi concorrente na Feira de Ciências e Engenharia de Guarulhos de 2020 (FECEG).`,
  },
  {
    img: dixitImage,
    title: "Dixit Multiplayer Online",
    url: "https://dixitfrontend.herokuapp.com/",
    git: "https://github.com/wellsousaaa/dixit-frontend",
    tech: ["ReactJS", "NodeJS", "Socket.IO", "MySQL"],
    description: `Essa é uma versão multiplayer online do jogo de mesa Dixit. Dixit é um jogo de cartas muito divertido, cada ação de um jogador afeta a página do outro.`,
  },
];

const Carousel = ({ children }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    carouselInterval = setInterval(() => {
      setIndex((i) => (i === children.length - 1 ? 0 : i + 1));
    }, 15000);

    return () => {
      clearInterval(carouselInterval);
      carouselInterval = null;
    };
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-item">{children[index]}</div>
      <div className="indexes">
        {children.map((c, i) => {
          return <div className={`index ${i === index ? "i-active" : ""}`} />;
        })}
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <section>
      <p className="title" style={{ marginBottom: 25 }} id="projects">
        &#126; Alguns de meus projetos &#126;
      </p>
      <Carousel>
        <div className="project-item">
          <img loading="lazy" src={fnafImage} />
          <div className="project-text">
            <h2>Five Nights At Freddy's Web</h2>
            <p>
              Uma versão do famoso jogo FNAF (2014) que eu recriei para ser
              jogado no navegador! A aplicação foi feita em React-Redux, você
              pode ver por esse link: <br />
              <a
                target="_blank"
                style={{ color: "inherit" }}
                href="https://five-nights-at-freddys.herokuapp.com/"
              >
                https://five-nights-at-freddys.herokuapp.com/
              </a>
            </p>
          </div>
        </div>
        <div className="project-item">
          <img loading="lazy" src={ecommerceImage} />
          <div className="project-text">
            <h2>E-commerce Completo</h2>
            <p>
              Essa é uma demo de uma loja online que eu criei. O site é
              responsivo, é reativo e integra a API de pagamentos Stripe!
            </p>
          </div>
        </div>
      </Carousel>

      <div style={{ overflowX: "hidden" }} className="projects-list">
        <h2>Lista:</h2>
        {projects.map((props, i) => {
          return <Project {...props} inverted={i % 2 === 1} />;
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          loading="lazy"
          src={star}
          style={{
            width: 50,
            margin: "25px auto",
            imageRendering: "pixelated",
          }}
        />
      </div>
    </section>
  );
}
