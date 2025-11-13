import Header from "../components/react-components/sections/Header.jsx";
import Contact from "../components/react-components/sections/Contact.jsx";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import { useEffect, useRef } from "react";
import Game from "../components/Game.jsx";

const SCALE = 4;

const urls = [
  "https://www.instagram.com/wellsousaaa/",
  "https://github.com/wellsousaaa",
  "https://www.linkedin.com/in/wendellsousaaa/",
  "https://t.me/wellsousaaa",
];

export default function App() {
  const canvasContainerRef = useRef();
  // const topButtonRef = useRef();

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const handleScroll = () => {
  //     if (
  //       document.body.scrollTop > 50 ||
  //       document.documentElement.scrollTop > 50
  //     )
  //       topButtonRef.current.style.display = "block";
  //     else {
  //       topButtonRef.current.style.display = "none";
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <div
        style={{
          transform: "translateY(-60px)",
          maxWidth: "100vw",
          overflow: "hidden",
          minHeight: 135 * SCALE + 5,
        }}
        ref={canvasContainerRef}
      >
        <Game canvasContainerRef={canvasContainerRef} scale={SCALE} />
      </div>
      <Profile />
      {/* <button
        style={{ display: "none" }}
        ref={topButtonRef}
        className="top-button"
        onClick={() => {
          window.location.hash = "";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        &#8593;
      </button>
      <Header />
      <Profile />
      <Projects />
      <Contact urls={urls} /> */}
    </>
  );
}
