import Header from "../components/react-components/sections/Header.jsx";
import Contact from "../components/react-components/sections/Contact.jsx";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import { useEffect, useRef } from "react";

const urls = [
  "https://www.instagram.com/wellsousaaa/",
  "https://github.com/wellsousaaa",
  "https://www.linkedin.com/in/wendellsousaaa/",
  "https://t.me/wellsousaaa",
];

export default function App() {
  const topButtonRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      )
        topButtonRef.current.style.display = "block";
      else {
        topButtonRef.current.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <button
        style={{ display: "none" }}
        ref={topButtonRef}
        className="top-button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        &#8593;
      </button>
      <Header />
      <Profile />
      <Projects />
      <Contact urls={urls} />
    </>
  );
}
