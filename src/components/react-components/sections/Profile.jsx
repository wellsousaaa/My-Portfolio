import React from 'react';
const sassImage = "/assets/sass.jpg";
const nodeImage = "/assets/node.jpg";
const mysqlImage = "/assets/mysql.jpg";
const htmlImage = "/assets/html.jpg";
const mernImage = "/assets/mern.jpg";
const reactImage = "/assets/react.jpg";

const Gallery = ({ children }) => {
  return (
    <div>
      <div className="gallery-container">
        <div className="gallery-carousel">
          {children.map((c, i) => {
            return (
              <div
                key={i}
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
