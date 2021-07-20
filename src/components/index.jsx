import React, {useEffect, useRef} from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

export default function App () {
    const topButtonRef = useRef();

    useEffect(() => {
          AOS.init({ duration: 500 });
  
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

          return () => {
              window.removeEventListener("scroll");
          }
    }, []);


    return (
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
    )
}