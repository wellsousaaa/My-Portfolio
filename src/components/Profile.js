import Gallery from "./react-components/sections/Profile.jsx";

export default function Profile() {
  return (
    <section class="profile-container">
      <img
        class="first-star"
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
      <div id="profile" class="f-col" style={{ margin: "75px auto auto auto" }}>
        <h1> Javascript Developer &#38; Designer </h1>
        <img loading="lazy" class="my-photo" src="/assets/my_photo.jpg" />
        <h2>Olá, eu sou Wendell. Tudo bem?</h2>
        <p class="desc">
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
            class="wendell-programming"
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
              <img
                loading="lazy"
                style={{
                  width: "100px",
                  borderRadius: "10px",
                  marginRight: "25px",
                }}
                src="/assets/sass.jpg"
                alt="Sass"
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
