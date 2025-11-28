import LogoLoop from "@/components/LogoLoop";

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "https://portfolio.souwell.com/assets/logos/rifaclick.webp", alt: "Company 1", href: "https://company1.com" },
  { src: "https://portfolio.souwell.com/assets/logos/rifaclick.webp", alt: "Company 2", href: "https://company2.com" },
  { src: "https://portfolio.souwell.com/assets/logos/rifaclick.webp", alt: "Company 3", href: "https://company3.com" },
];

export default function CodeIcons() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Basic horizontal loop */}
      {/* <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      /> */}
    </div>
  );
}