import { BlurFade } from "@/components/ui/blur-fade"

/* eslint-disable @next/next/no-img-element */
type Company = {
  src: string
  title: string
  alt: string
}

const companies: Company[] = [
  {
    src: "https://wendelldesousa.netlify.app/assets/logos/esphere.webp",
    title: "Esphere",
    alt: "Logotipo da Esphere",
  },
  {
    src: "https://wendelldesousa.netlify.app/assets/logos/smart.webp",
    title: "Smart",
    alt: "Logotipo da Smart",
  },
  {
    src: "https://wendelldesousa.netlify.app/assets/logos/wisebets.webp",
    title: "WiseBets",
    alt: "Logotipo da WiseBets",
  },
  {
    src: "https://wendelldesousa.netlify.app/assets/logos/rifa321.webp",
    title: "Rifa321",
    alt: "Logotipo da Rifa321",
  },
  {
    src: "https://wendelldesousa.netlify.app/assets/logos/rifaclick.webp",
    title: "RifaClick",
    alt: "Logotipo da RifaClick",
  },
  {
    src: "https://wendelldesousa.netlify.app/assets/logos/menuflow.webp",
    title: "MenuFlow",
    alt: "Logotipo da MenuFlow",
  },
]

export function ImageCollection() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {companies.map(({ src, title, alt }, idx) => (
          <BlurFade key={title} delay={0.25 + idx * 0.05} inView>
            <img
              className="mb-4 size-full rounded-lg object-contain shadow-sm border"
              src={src}
              alt={alt}
              title={title}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  )
}
