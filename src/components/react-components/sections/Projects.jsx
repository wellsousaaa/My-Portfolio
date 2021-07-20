import React, {useEffect} from "react";
import "/styles/Projects.css";
import star from "/assets/star.png";
import fnafImage from "/assets/FNAF.webp";
import ecommerceImage from "/assets/ecommerce.webp";
import kiddingImage from "/assets/kidding.jpg";
import dixitImage from "/assets/dixit.jpg";

const images = {
  fnafImage,
  ecommerceImage,
  kiddingImage,
  dixitImage
}

import Project from "../common/Project.jsx";

export default function Projects({projects}) {

  return (
      <>
        <div style={{ overflowX: "hidden" }} className="projects-list">
          <h2>Lista:</h2>
          {projects.map((props, i) => {
            return <Project key={props.title} imgSrc={images[props.img]} {...props} inverted={i % 2 === 1} />;
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
