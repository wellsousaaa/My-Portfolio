import { Highlighter } from "@/components/ui/highlighter";
import CodeIcons from "@/app/components/CodeIcons";
import { AuroraText } from "@/components/ui/aurora-text";
import { ImageCollection } from "@/app/components/ImageCollection";


export default function Profile() {
  return (
    <section className="w-10/12 mx-auto">
      <div className="flex items-center justify-center gap-5 mt-20">
        <div>
          <div className="title-name font-bold text-6xl">
            <h2>
              <AuroraText>Sou Well</AuroraText>
            </h2>
          </div>
          {/* <Shuffle
            className="title-name font-bold text-9xl"
            text="Sou Well"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
          /> */}

          <p className="max-w-100 mt-3">
            Moro em São Paulo e trabalho como desenvolvedor Full-Stack. Sou
            graduado em <Highlighter action="underline" color="#87CEFA"><i>Análise e Desenvolvimento de Sistemas</i></Highlighter>.
          </p>
        </div>
        <img
          src="/assets/photo.jpg"
          className="rounded-full w-60"
          alt="Minha foto"
        />
      </div>


      <div className="mt-20">
        <p className="text-center mb-8 max-w-[700px] mx-auto">
          Desde o meu primeiro contato com desenvolvimento de software, percebi
          que era aquilo que eu realmente curtia — criar coisas, resolver
          problemas e transformar ideias em algo real...
        </p>

        <CodeIcons />
      </div>

      <h2 className="text-center text-xl mt-15 mb-10">Serviços realizados</h2>

      <div className="flex justify-center items-center gap-10 mb-20">
        <div className="max-w-[400px]">
          <ImageCollection />
        </div>


        <div className="flex flex-col gap-5 max-w-[400px]">
          <p>
            Trabalho profissionalmente desde 2020 para diversas empresas, desenvolvendo aplicações, sites e
            servidores.
          </p>
          <p>
            Em cada projeto, sempre tento colocar um pouco de mim:
            dedicação, cuidado e vontade de fazer algo que realmente funcione bem.
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
