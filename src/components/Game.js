import "../styles/Game.css";
import { useEffect, useState, useRef } from "react";
import Player from "./Player";

import Profile from "../media/profile.png";
import Projects from "../media/projects.png";
import Contact from "../media/contact.png";
import Plus from "../media/plus.png";

import TouchButton from "./TouchButton";

let canChangeBackground = true;

function Game({contact}) {
  const userRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();
  const darkModeRef = useRef();

  useEffect(
    () => () => {
      canChangeBackground = true;
    },
    []
  );

  const goToSection = ({ target }) => {
    if (!canChangeBackground) return;
    window.location.hash = "";
    window.location.hash = `${target.className}`;
    canChangeBackground = false;
    setTimeout(() => {
      canChangeBackground = true;
    }, 1000);
  };

  const darkMode = () => {
    if (!canChangeBackground) return;
    window.location.hash = "darkmode";

    const root = document.documentElement;

    [
      {
        property: "--body-background",
        light: "rgb(255,255,255)",
        dark: "rgb(19, 19, 36)",
      },
      {
        property: "--body-font",
        light: "rgb(0,0,0)",
        dark: "rgb(255,255,255)",
      },
      {
        property: "--main-color",
        light: "rgb(0, 88, 248)",
        dark: "rgb(0, 24, 68)",
      },
      {
        property: "--tag-color",
        light: "rgba(99, 90, 129, 0.1)",
        dark: "rgba(99, 90, 129, 1)",
      },
    ].map(({ property, light, dark }) => {
      const actualProperty = getComputedStyle(root).getPropertyValue(property);
      root.style.setProperty(property, actualProperty === dark ? light : dark);
    });
    canChangeBackground = false;
    setTimeout(() => {
      canChangeBackground = true;
    }, 1000);
  };

  return (
    <div className="game-container">
      <div className="blocks-container">
        <div className="block">
          <img
            loading="lazy"
            ref={userRef}
            alt="Profile"
            title="Profile"
            src={Profile}
            className="profile"
            onClick={goToSection}
          />
        </div>
        <div className="block">
          <img
            loading="lazy"
            ref={projectsRef}
            alt="Projects"
            title="Projects"
            src={Projects}
            className="projects"
            onClick={goToSection}
          />
        </div>
    {contact ?
        <div ref={contactRef} className="block">
          <img
            loading="lazy"
            alt="Contact"
            title="Contact"
            src={Contact}
            className="contact"
            onClick={goToSection}
          />
        </div>
    : null
    }
        <div className="block">
          <img
            loading="lazy"
            ref={darkModeRef}
            alt="Plus"
            title="Plus"
            src={Plus}
            className="plus"
            onClick={darkMode}
          />
        </div>
      </div>

      <Player
        darkMode={darkMode}
        blocks={[userRef, projectsRef, contactRef, darkModeRef]}
      />

      <div
        className="flex"
        style={{
          justifyContent: "space-between",
          position: "absolute",
          width: "95vw",
          marginTop: "-50px",
        }}
      >
        <div className="flex">
          <TouchButton keyName={"ArrowLeft"} />
          <TouchButton keyName={"ArrowRight"} />
        </div>
        <TouchButton keyName={"ArrowUp"} />
      </div>
    </div>
  );
}

export default Game;
