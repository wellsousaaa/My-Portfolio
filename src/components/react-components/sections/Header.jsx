import React from 'react';
import Game from './Game.jsx';
const Photo = "/assets/well.png";

const Header = () => {
  return (
    <div className="top-container">
    <header id="top">
      <div className="header-content">
        <h2> ★ Meu Portfólio</h2>
        <img loading="lazy" src={Photo} />
      </div>
    </header>
      <Game />
    </div>
  );
};

export default Header;
