import React, {useState, useEffect} from 'react';

let carouselInterval = null;

export default function Main() {
  return (<Carousel>
    <div className="project-item">
            <img loading="lazy" src="/assets/Voxely.webp" />
            <div className="project-text">
              <h2>Voxely — Voxel Art</h2>
              <p>
                Um web app que eu fiz para que qualquer um possa construir voxel art, compartilhar com seus amigos e visualizar em realidade aumentada! <br/> Com integração TWA o aplicativo está disponível na play store! <br /> <br/> 
                <a
                  target="_blank"
                  style={{ color: "inherit", marginLeft: 30 }}
                  href="https://play.google.com/store/apps/details?id=app.voxely.twa"
                >
                 Play Store
                </a>
                <br/>
                <a
                  target="_blank"
                  style={{ color: "inherit" }}
                  href="https://voxely.netlify.app"
                >
                 https://voxely.netlify.app/
                </a>
              </p>
            </div>
          </div>
          <div className="project-item">
            <img loading="lazy" src="/assets/Medital.webp" />
            <div className="project-text">
              <h2>Medital - Encaminhamento Médico</h2>
              <p>
              Medital é uma plataforma de encaminhamento médico com base em dados oficiais disponibilizados no DATASUS. <br/> Direcionamos os pacientes para a unidade de saúde mais adequada com base na especialidade, distância e a gravidade do caso.
              <br />
              <br />
              Confira funcionalidades de ChatBot e Pesquisa em <a href="https://medital.vercel.app">https://medital.vercel.app</a>
            
              </p>
            </div>
          </div>
          <div className="project-item">
            <img loading="lazy" src="/assets/FNAF_WEB.webp" />
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
            <img loading="lazy" src="/assets/ecommerce.webp" />
            <div className="project-text">
              <h2>E-commerce Completo</h2>
              <p>
                Essa é uma demo de uma loja online que eu criei. O site é
                responsivo, é reativo e integra a API de pagamentos Stripe!
              </p>
            </div>
          </div>
        </Carousel>
        )
}

function Carousel({ children }){
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
          <div className="indexes" style={{marginTop: 10}}>
            {children.map((c, i) => {
              return <div key={i} className={`index ${i === index ? "i-active" : ""}`} />;
            })}
          </div>
        </div>
      );
    };
    