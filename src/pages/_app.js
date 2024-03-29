import AOS from "aos";
import "aos/dist/aos.css";

import "../styles/Contact.css";
import "../styles/Projects.css";
import "../styles/index.css";
import "../styles/Profile.css";
import "../styles/Game.css";
import "../styles/Scrollbar.css";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
