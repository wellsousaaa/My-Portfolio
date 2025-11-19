import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

type ProjectProps = {
  title: string;
  description: ReactNode;
  list?: ReactNode[];
  tags?: string[];
  src?: string;
  alt?: string;
  className?: string;
};

export default function ProjectContainer({
  title,
  description,
  list = [],
  tags = [],
  src = "/assets/Voxely.webp",
  alt = "Imagem do projeto",
  className = "",
}: ProjectProps) {
  return (
    <article
      className={cn(
        "flex w-10/12 mx-auto gap-10 border rounded-3xl overflow-hidden hover:shadow-xl transition-all",
        className
      )}
    >
      <div className="flex-1 p-8">
        <h3 className="text-3xl mb-4">{title}</h3>

        <div className="text-justify mb-2">{description}</div>

        {list.length > 0 && (
          <ul className="list-disc ml-8 mt-2 text-sm">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        <div className="mt-2">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag} className="mt-2 mr-2">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-5">
          <InteractiveHoverButton>Acessar o site!</InteractiveHoverButton>
          <InteractiveHoverButton>Baixar o aplicativo!</InteractiveHoverButton>
        </div>
      </div>

      <img
        className="w-2/5 saturate-150 object-cover"
        src={src}
        alt={alt}
      />
    </article>
  );
}