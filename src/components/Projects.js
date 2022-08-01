import Carousel from "./react-components/common/Carousel.jsx";
import Projects from "./react-components/sections/Projects.jsx";

export default function ProjectsPage() {
  return (
    <section>
      <p class="title" style={{ marginBottom: 25 }} id="projects">
        &#126; Alguns de meus projetos &#126;
      </p>

      <Carousel />
      <Projects />
    </section>
  );
}
