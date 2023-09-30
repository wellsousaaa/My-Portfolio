import dynamic from "next/dynamic";

const Project = dynamic(() => import("../common/Project.jsx"), {
  ssr: false,
});

const star = "/assets/star.png";

const images = {
  Voxely:
    "https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/Voxely.webp",
  Medital:
    "https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/Medital.webp",
  fnafImage:
    "https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/FNAF_WEB.webp",
  ecommerceImage:
    "https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/ecommerce.webp",
  kiddingImage:
    "https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/kidding.jpg",
};

const projects = [
  {
    img: "Voxely",
    title: "Voxely — Build, Edit and Share!",
    url: "https://voxely.netlify.app",
    git: "https://play.google.com/store/apps/details?id=app.voxely.twa",
    description:
      "Construa, explore, compartilhe e experimente suas criações de voxel art (pixels 3D) com realidade aumentada!",
    tech: [
      "React.js",
      "PWA/TWA",
      "Three.js",
      "Firebase",
      "Realidade Aumentada",
    ],
  },
  {
    title: "Medital - Encaminhamento Médico",
    img: "Medital",
    url: "https://medital.vercel.app",
    git: "https://medital.vercel.app",
    description:
      "Medital é uma plataforma de encaminhamento médico que direciona os pacientes para a unidade de saúde mais adequada com base na especialidade, distância e a gravidade do caso. O site foi concorrente na Feira de Ciências e Engenharia de Guarulhos de 2022 (FECEG)",
    tech: ["React.js", "Next.js", "MongoDB", "API", "ChatBot"],
  },

  {
    img: "fnafImage",
    title: "Five Nights at Freddy's Web",
    url: "https://wellsousaaa.github.io/Five-Nights-at-Freddys-Web/",
    git: "https://github.com/wellsousaaa/Five-Nights-at-Freddys-Web.git",
    tech: ["React.js", "Redux", "Sass", "HTML/CSS"],
    description:
      "Uma versão do famoso jogo FNAF (2014) que eu recriei para ser jogado no navegador! A aplicação foi feita em React-Redux.",
  },
  {
    img: "ecommerceImage",
    title: "Online Store  E-Commerce",
    url: "https://store-plus.netlify.app/",
    git: "https://github.com/wellsousaaa/ecommerce-frontend-plus",
    tech: ["React.js", "Node.js", "HTML/CSS", "MySQL", "Sass"],
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
];

export default function Projects() {
  return (
    <>
      <div style={{ overflowX: "hidden" }} className="projects-list">
        {/* <h2>Lista:</h2> */}
        {projects.map((props, i) => {
          return (
            <Project
              key={props.title}
              imgSrc={images[props.img]}
              {...props}
              inverted={i % 2 === 1}
            />
          );
        })}
      </div>

      <div className="companies">
        <h2>Serviços realizados para:</h2>
        <div className="companies-list">
          <img
            loading="lazy"
            draggable="false"
            src="/assets/logos/esphere.webp"
            alt="esphere"
            title="Esphere"
            data-aos="fade-up"
            data-aos-delay="100"
          />
          <img
            loading="lazy"
            draggable="false"
            src="/assets/logos/smart.webp"
            alt="smart"
            title="Smart Control Pro"
            data-aos="fade-up"
            data-aos-delay="200"
          />
          <img
            loading="lazy"
            draggable="false"
            src="/assets/logos/wisebets.webp"
            alt="wisebets"
            title="WiseBets"
            data-aos="fade-up"
            data-aos-delay="300"
          />
          <img
            loading="lazy"
            draggable="false"
            src="/assets/logos/rifa321.webp"
            alt="rifa321"
            title="Rifa 321"
            data-aos="fade-up"
            data-aos-delay="400"
          />
          <img
            loading="lazy"
            draggable="false"
            src="/assets/logos/rifaclick.webp"
            alt="RifaClick"
            title="Rifa Click"
            data-aos="fade-up"
            data-aos-delay="500"
          />
          <img
            loading="lazy"
            draggable="false"
            src="/assets/logos/menuflow.webp"
            alt="Menuflow"
            title="Menuflow"
            data-aos="fade-up"
            data-aos-delay="600"
          />
        </div>
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
