import "../styles/Profile.css";
import photo from "../media/my_photo.jpg";
import sassImage from "../media/sass.jpg";
import nodeImage from "../media/node.jpg";
import mysqlImage from "../media/mysql.jpg";
import htmlImage from "../media/html.jpg";
import mernImage from "../media/mern.jpg";
import reactImage from "../media/react.jpg";
import star from "../media/star.png";
import programming from "../media/programming.webp";

const Gallery = ({ children }) => {
  return (
    <div>
      <div className="gallery-container">
        <div className="gallery-carousel">
          {children.map((c, i) => {
            return (
              <div
                style={{
                  transform: `rotateY(${
                    (360 / children.length) * i || 0
                  }deg) translateZ(175px)`,
                }}
              >
                {children[i]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  return (
    <section className="profile-container">
      <img
        className="first-star"
        loading="lazy"
        src={star}
        style={{
          width: 50,
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
        <h1> Javascript Developer &#38; Designer </h1>
        <img loading="lazy" className="my-photo" src={photo} />
        <h2>Olá, eu sou Wendell. Tudo bem?</h2>
        <p className="desc">
          Desde que eu comecei a programar eu percebi que era algo que eu amava,
          estudando Desenvolvimento de Sistemas eu sempre dou o meu melhor nos
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
            style={{ height: 225, marginTop: 25, imageRendering: "pixelated" }}
            src={programming}
          />
          <div style={{ marginTop: 40 }}>
            <Gallery>
              {/* <img loading="lazy"
                src={
                  "https://www.todoespacoonline.com/w/wp-content/uploads/2014/05/sass-logo-new.jpg"
                }
                className="gallery-item"
              />
              <img loading="lazy"
                src={
                  "https://adrianalonso.es/wp-content/uploads/2014/09/nodejs.png"
                }
                className="gallery-item"
              />
              <img loading="lazy"
                src={
                  "https://miro.medium.com/max/2560/1*bqdmbAOzM9bO-U6TG5P1Mw.jpeg"
                }
                className="gallery-item"
              />
              <img loading="lazy"
                src={
                  "http://www.yeebaplay.com.br/blog/wp-content/uploads/2016/06/mysql-logo.png"
                }
                className="gallery-item"
              />
              <img loading="lazy"
                src={
                  "https://journocode.com/wp-content/uploads/2016/06/htmlCssJS-1140x515.jpg"
                }
                className="gallery-item"
              />
              <img loading="lazy"
                src={
                  "https://res.cloudinary.com/practicaldev/image/fetch/s--NVDOwrTz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/3etytcr4pv76w2tqjrtf.jpeg"
                }
                className="gallery-item"
              /> */}
              <img loading="lazy" src={sassImage} className="gallery-item" />
              <img loading="lazy" src={nodeImage} className="gallery-item" />
              <img loading="lazy" src={reactImage} className="gallery-item" />
              <img loading="lazy" src={mysqlImage} className="gallery-item" />
              <img loading="lazy" src={htmlImage} className="gallery-item" />
            </Gallery>
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
              <img
                loading="lazy"
                style={{
                  width: 100,
                  borderRadius: 10,
                  marginRight: 25,
                }}
                src={sassImage}
              />

              <i style={{ maxWidth: 400 }}>
                SASS são Folhas de Estilo com Sintaxe Espetacular. Com Sass é
                possível criar estilizações incríveis para as páginas de uma
                maneira moderna.
              </i>
            </div>
          </div>
        </div>
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
