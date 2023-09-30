import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

export default function Main() {
  return (
    <div style={{ width: "95vw", margin: "auto" }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 15000 }}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="project-item">
            <img
              alt="Voxely"
              loading="lazy"
              src="https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/Voxely.webp"
            />
            <div className="project-text">
              <h2>Voxely — Voxel Art</h2>
              <p>
                Um{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  style={{ color: "inherit" }}
                  href="https://voxely.netlify.app"
                >
                  web app
                </a>{" "}
                que eu fiz para que qualquer um possa construir voxel art,
                compartilhar com seus amigos e visualizar em realidade
                aumentada! <br /> Com integração TWA o aplicativo está
                disponível na{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  style={{ color: "inherit" }}
                  href="https://play.google.com/store/apps/details?id=app.voxely.twa"
                >
                  Play Store
                </a>
                !
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-item">
            <img
              alt="Medital"
              loading="lazy"
              src="https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/Medital.webp"
            />
            <div className="project-text">
              <a
                rel="noreferrer"
                target="_blank"
                style={{ color: "inherit", textDecoration: "none" }}
                href="https://medital.vercel.app"
              >
                <h2>Medital - Encaminhamento Médico</h2>
              </a>

              <p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  style={{ color: "inherit" }}
                  href="https://medital.vercel.app"
                >
                  Medital
                </a>{" "}
                é uma plataforma de encaminhamento médico com base em dados
                oficiais disponibilizados no DATASUS. <br /> Direcionamos os
                pacientes para a unidade de saúde mais adequada com base na
                especialidade, distância e a gravidade do caso. O site foi
                concorrente na Feira de Ciências e Engenharia de Guarulhos de
                2022 {"(FECEG)"}
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-item">
            <img
              alt="Fnaf Web"
              loading="lazy"
              src="https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/FNAF_WEB.webp"
            />
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-item">
            <img
              alt="Store+"
              loading="lazy"
              src="https://raw.githubusercontent.com/wellsousaaa/My-Portfolio/main/public/assets/ecommerce.webp"
            />
            <div className="project-text">
              <h2>E-commerce Completo</h2>
              <p>
                Essa é uma demo de uma loja online que eu criei. O site é
                responsivo, é reativo e integra a API de pagamentos Stripe!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
