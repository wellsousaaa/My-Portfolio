import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

type ProjectProps = {
  title: string;
  description: ReactNode;
  links?: { label: string; url: string }[];
  list?: ReactNode[];
  tags?: string[];
  src?: string;
  alt?: string;
  className?: string;
  mini?: boolean;
};

export default function ProjectContainer({
  title,
  description,
  links = [],
  list = [],
  tags = [],
  src = "/assets/Voxely.webp",
  alt = "Imagem do projeto",
  className = "",
  mini = false,
}: ProjectProps) {
  return (
    <article
      className={cn(
        "flex flex-col w-11/12 mx-auto gap-6 border rounded-3xl overflow-hidden hover:shadow-md transition-all",
        !mini && "md:flex-row md:w-10/12 md:gap-10",
        className
      )}
    >
      <img
        className={cn(
          "w-full h-48 saturate-150 object-cover",
          !mini && "md:w-2/5 md:h-auto md:order-last"
        )}
        src={src}
        alt={alt}
      />

      <div className={cn("flex-1 p-5", !mini && "md:p-8")}>
        <h3 className={cn("text-2xl mb-3 text-center md:text-left ", !mini && "md:text-3xl md:mb-4")}>{title}</h3>

        <div className={cn("text-justify mb-2 text-sm", !mini && "md:text-base")}>{description}</div>

        {list.length > 0 && (
          <ul className={cn("list-disc ml-6 mt-2 text-xs", !mini && "md:ml-8 md:text-sm")}>
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        <div className="mt-2">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag} className="mt-2 mr-2 text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className={cn("flex flex-col gap-2 mt-5", !mini && "sm:flex-row")}>
          {links && links.map((link) => (
            <InteractiveHoverButton
              key={link.label}
              className={cn("w-full md:w-max", !mini && "sm:mr-4")}
              onClick={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement)?.blur();
                window.open(link.url, "_blank", "noopener,noreferrer");
              }}
            >
              {link.label}
            </InteractiveHoverButton>
          ))}

        </div>
      </div>
    </article>
  );
}