import Photo from "../media/photo.jpg";

const Header = () => {
  return (
    <header id="top">
      <div className="header-content">
        <h2> ★ Wendell de Sousa</h2>
        <img loading="lazy" src={Photo} />
      </div>
    </header>
  );
};

export default Header;
