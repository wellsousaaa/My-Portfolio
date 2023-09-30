import React from "react";
const sassImage = "/assets/sass.jpg";
const nodeImage = "/assets/node.jpg";
const mysqlImage = "/assets/mysql.jpg";
const htmlImage = "/assets/html.jpg";
const phpImage = "/assets/php.png";
const reactImage = "/assets/react.jpg";
const mongoImage = "/assets/mongo.png";

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
      <img
        alt="Sass Logo"
        loading="lazy"
        src={sassImage}
        className="gallery-item"
      />
      <img
        alt="Node Logo"
        loading="lazy"
        src={nodeImage}
        className="gallery-item"
      />
      <img
        alt="React Logo"
        loading="lazy"
        src={reactImage}
        className="gallery-item"
      />
      <img
        alt="MySQL Logo"
        loading="lazy"
        src={mysqlImage}
        className="gallery-item"
      />
      <img
        alt="PHP Logo"
        loading="lazy"
        src={phpImage}
        className="gallery-item"
      />
      <img
        alt="HTML Logo"
        loading="lazy"
        src={htmlImage}
        className="gallery-item"
      />
      <img
        alt="MongoDB Logo"
        loading="lazy"
        src={mongoImage}
        className="gallery-item"
      />
    </Gallery>
  );
}
