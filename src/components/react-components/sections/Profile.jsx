import React from 'react';
import "/styles/Profile.css";
import sassImage from "/assets/sass.jpg";
import nodeImage from "/assets/node.jpg";
import mysqlImage from "/assets/mysql.jpg";
import htmlImage from "/assets/html.jpg";
import mernImage from "/assets/mern.jpg";
import reactImage from "/assets/react.jpg";

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
    <Gallery>
    <img loading="lazy" src={sassImage} className="gallery-item" />
    <img loading="lazy" src={nodeImage} className="gallery-item" />
    <img loading="lazy" src={reactImage} className="gallery-item" />
    <img loading="lazy" src={mysqlImage} className="gallery-item" />
    <img loading="lazy" src={htmlImage} className="gallery-item" />
  </Gallery>
  )
}
