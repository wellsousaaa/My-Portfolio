import dynamic from 'next/dynamic';

const Project = dynamic(() => import("../common/Project.jsx"), {
  ssr: false,
});

const star = "/assets/star.png";
const Voxely = "/assets/Voxely.webp";
const fnafImage = "/assets/FNAF_WEB.webp";
const ecommerceImage = "/assets/ecommerce.webp";
const kiddingImage = "/assets/kidding.jpg";
const dixitImage = "/assets/dixit.jpg";

const images = {
  Voxely,
  fnafImage,
  ecommerceImage,
  kiddingImage,
  dixitImage
}


const projects = [
  {
    img: "Voxely",
    title: "Voxely — Build, Edit and Share!",
    url: "https://voxely.netlify.app",
    git: "https://play.google.com/store/apps/details?id=app.voxely.twa",
    description: "Construa, explore, compartilhe e experimente suas criações de voxel art (pixels 3D) com realidade aumentada!",
    tech: ["ReactJS", "PWA/TWA", "ThreeJS", "Firebase", "Realidade Aumentada"],
    description: "Construa, explore, compartilhe e experimente suas criações de voxel art (pixels 3D) com realidade aumentada!"
  },
 
  {
    img: "fnafImage",
    title: "Five Nights at Freddy's Web",
    url: "https://wellsousaaa.github.io/Five-Nights-at-Freddys-Web/",
    git: "https://github.com/wellsousaaa/Five-Nights-at-Freddys-Web.git",
    tech: ["ReactJS", "Redux", "Sass", "HTML/CSS"],
    description:
      "Uma versão do famoso jogo FNAF (2014) que eu recriei para ser jogado no navegador! A aplicação foi feita em React-Redux.",
  },
  {
    img: "ecommerceImage",
    title: "Online Store  E-Commerce",
    url: "https://store-plus.netlify.app/",
    git: "https://github.com/wellsousaaa/ecommerce-frontend-plus",
    tech: ["ReactJS", "NodeJS", "HTML/CSS", "MySQL", "Sass"],
    description:
      "Essa é uma demo de uma loja online que eu criei. O site é responsivo, é reativo e integra a API de pagamentos Stripe!",
  },
  {
    img: "kiddingImage",
    title: "Kidding - Aprendendo Inglês",
    url: "*",
    git: "*",
    tech: ["HTML/CSS", "Javascript", "FECEG", "Sass", "Bootstrap"],
    description:
      "Kidding é um site educacional que ensina inglês para crianças de 4 à 7 anos de idade. O site foi concorrente na Feira de Ciências e Engenharia de Guarulhos de 2020 (FECEG).",
  },
  {
    img: "dixitImage",
    title: "Dixit Multiplayer Online",
    url: "https://dixitfrontend.herokuapp.com/",
    git: "https://github.com/wellsousaaa/dixit-frontend",
    tech: ["ReactJS", "NodeJS", "Socket.IO", "MySQL"],
    description:
      "Essa é uma versão multiplayer online do jogo de mesa Dixit. Dixit é um jogo de cartas muito divertido, cada ação de um jogador afeta a página do outro.",
  },
];

export default function Projects() {

  return (
      <>
        <div style={{ overflowX: "hidden" }} className="projects-list">
          <h2>Lista:</h2>
          {projects.map((props, i) => {
            return (
              <Project key={props.title} imgSrc={images[props.img]} {...props} inverted={i % 2 === 1} />
            );
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
      </>
  );
}
