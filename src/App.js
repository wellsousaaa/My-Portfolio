import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Game from "./components/Game";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  const topButtonRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      )
        topButtonRef.current.style.display = "block";
      else {
        topButtonRef.current.style.display = "none";
      }
    });
  });
  return (
    <>
      <button
        style={{ display: "none" }}
        ref={topButtonRef}
        className="top-button"
        onClick={() => {
          window.location.hash = window.location.hash == "" ? "#top" : "#";
        }}
      >
        &#8593;
      </button>
      <div className="top-container">
        <Header />
        <Game />
      </div>
      <Profile />
      <Projects />
      <Contact />
    </>
  );
}
