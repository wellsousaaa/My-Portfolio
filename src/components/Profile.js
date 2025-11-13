import { AiFillStar } from "react-icons/ai";
import Gallery from "./react-components/sections/Profile.jsx";
const photo = "/assets/photo.jpeg";

const stars = [
  {
    id: 1,
    name: "React.js / Next.js",
    stars: 5,
  },
  {
    id: 2,
    name: "Node.js",
    stars: 5,
  },
  {
    id: 3,
    name: "MongoDB / Firebase",
    stars: 5,
  },
  {
    id: 4,
    name: "MySQL / PostgreSQL",
    stars: 4,
  },
  {
    id: 5,
    name: "PHP / Laravel",
    stars: 4,
  },
];

export default function Profile() {
  return (
    <section className="profile-container">
      <img
        className="first-star"
        alt="Estrela"
        loading="lazy"
        src="/assets/star.png"
        style={{
          width: "50px",
          position: "absolute",
          margin: "-25px auto auto auto",
          imageRendering: "pixelated",
        }}
      />
      <div
        id="profile"
        className="f-col"
        style={{ margin: "75px auto auto auto" }}
      >
        <h1> Full Stack Developer</h1>
        {/* <img
          loading="lazy"
          alt="Wendell de Sousa"
          className="my-photo"
          src={photo}
        /> */}
        <h2>Olá, eu sou Wendell. Tudo bem?</h2>
        <p className="desc">
          Moro em São Paulo e sou programador e freelancer formado em
          Desenvolvimento de Sistemas, desde que eu comecei a estudar
          programação eu percebi que era algo que eu amava! <br /> <br />
          Trabalho profissionalmente desde 2020, desenvolvendo aplicações, sites
          e servidores como estagiário e freelancer. Sempre dou o meu melhor nos
          projetos que faço porque sei que dedicação é uma parte importante de
          um trabalho bem feito! Gosto de estudar sobre as tecnologias que
          utilizo sempre lendo as documentações e me informando. Estou sempre em
          busca de novos desafios e disposto a aprimorar meus conhecimentos!
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap-reverse",
            width: "100%",
          }}
        >
          <img
            loading="lazy"
            className="wendell-programming"
            style={{
              height: "225px",
              marginTop: "25px",
              imageRendering: "pixelated",
            }}
            src="/assets/programming.webp"
            alt="Eu programando..."
          />
          <div style={{ marginTop: 40 }}>
            <Gallery />

            <div
              style={{
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                textAlign: "justify",
                maxWidth: "90%",
              }}
            >
              <table>
                <tbody>
                  {stars.map((i, ix) => (
                    <tr
                      key={i.id}
                      data-aos="fade-up"
                      data-aos-delay={`${ix * 2}00`}
                    >
                      <td>{i.name}</td>
                      <td className="stars-container">
                        {[...Array(i.stars)].map((_, idx) => (
                          <span
                            key={idx}
                            data-aos="fade-up"
                            data-aos-delay={`${idx * (ix + 1)}00`}
                          >
                            <AiFillStar />
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="/assets/star.png"
          style={{
            width: "50px",
            margin: "25px auto",
            imageRendering: "pixelated",
          }}
          alt="Estrela"
        />
      </div>
    </section>
  );
}
