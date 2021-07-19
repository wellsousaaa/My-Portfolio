import React from 'react';
import Game from './Game.jsx';
import Photo from "/assets/photo.jpg";

// const Photo = null;

const Header = () => {
  return (
    <div className="top-container">
    <header id="top">
      <div className="header-content">
        <h2> ★ Wendell de Sousa</h2>
        <img loading="lazy" src={Photo} />
      </div>
    </header>
      <Game />
    </div>
  );
};

export default Header;
