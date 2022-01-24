import React, {useState, useEffect} from 'react';

let carouselInterval = null;

export default function Main() {
  return (<Carousel>
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
          <div className="indexes">
            {children.map((c, i) => {
              return <div key={i} className={`index ${i === index ? "i-active" : ""}`} />;
            })}
          </div>
        </div>
      );
    };
    
