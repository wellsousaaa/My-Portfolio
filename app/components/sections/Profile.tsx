import { Highlighter } from "@/components/ui/highlighter";
import CodeIcons from "@/app/components/CodeIcons";
import { AuroraText } from "@/components/ui/aurora-text";
import { ImageCollection } from "@/app/components/ImageCollection";


export default function Profile() {
  return (
    <section className="w-10/12 mx-auto">

      <div className="flex items-center justify-center gap-5 flex-col-reverse md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <div className="title-name font-bold text-6xl">
            <h2 className="mx-auto">
              <AuroraText>Sou Well</AuroraText>
            </h2>
          </div>

          <p className="max-w-100 mt-3 text-center md:text-left">
            Me chamo Wendell Sousa, moro em São Paulo e trabalho como desenvolvedor Full-Stack. Sou
            graduado em <Highlighter animationDuration={200} action="underline" color="#87CEFA"><i>Análise e Desenvolvimento de Sistemas</i></Highlighter>.
          </p>
        </div>
        <img
          src="/assets/photo.jpg"
          className="rounded-full w-60"
          alt="Minha foto"
        />
      </div>


      <div className="mt-10 md:mt-20">
        <p className="text-justify md:text-center mb-8 max-w-[700px] mx-auto">
          Desde o meu primeiro contato com desenvolvimento de software, percebi
          que era aquilo que eu realmente curtia — criar coisas, resolver
          problemas e transformar ideias em algo real...
        </p>

        <CodeIcons />
      </div>

      <h2 className="text-center text-xl mt-15 mb-10">Serviços realizados</h2>

      <div className="flex-col md:flex-row flex justify-center items-center gap-10 mb-20">
        <div className="max-w-[400px]">
          <ImageCollection />
        </div>


        <div className="text-center md:text-left flex flex-col gap-5 max-w-[400px]">
          <p>
            Trabalho profissionalmente desde 2020 para diversas empresas, desenvolvendo aplicações, sites e
            servidores.
          </p>
          <p>
            Em cada projeto, sempre tento colocar um pouco de mim: <i>dedicação, cuidado e vontade de fazer algo que realmente funcione bem.</i>

          </p>
          <p>
            Gosto de estudar, experimentar novas tecnologias e entender como elas
            podem melhorar a vida das pessoas.
          </p>
        </div>

      </div>
    </section >
  );
}
