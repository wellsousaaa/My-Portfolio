import React from 'react';

export default function Project({
  imgSrc,
  title,
  description,
  git,
  tech,
  url,
  inverted,
}) {
  return (
    <a
      href={url}
      target="_blank"
      style={{
        flexDirection: inverted ? "row-reverse" : "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
      className={"project"}
      data-aos={inverted ? "fade-left" : "fade-right"}
    >
      <img loading="lazy" src={imgSrc} />
      <div style={{ textAlign: inverted ? "right" : "left", maxWidth: "70%" }}>
        <i style={{ textAlign: inverted ? "right" : "left" }}>{title}</i>
        <p style={{ marginBottom: 10 }}>{description}</p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            justifyContent: inverted ? "flex-end" : "flex-start ",
          }}
        >
          
          <a
            target="_blank"
            style={{ wordWrap: "break-word", width: "100%" }}
            href={git}
          >
            {git}
          </a>
        </p>
        <div
          className="techs"
          style={{
            display: "flex",
            justifyContent: inverted ? "flex-end" : "flex-start",
            marginTop: 10,
            flexWrap: "wrap",
          }}
        >
          {tech.map((t) => (
            <div
              key={t}
              style={{
                margin: inverted ? "auto 0 auto 15px" : "auto 15px auto 0",
              }}
              className="tag"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}
