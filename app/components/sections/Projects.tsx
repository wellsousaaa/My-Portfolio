import ProjectContainer from "@/app/components/ProjectContainer";

const project1 = {
  title: "Voxely — Build, Edit and Share!",
  description: <><i>Voxely</i> é um web app que eu desenvolvi para criação e compartilhamento de modelos 3D baseados em voxels. Os usuários podem construir modelos detalhados usando blocos tridimensionais e compartilhar suas criações com a comunidade. A plataforma também oferece funcionalidades de visualização em <i>realidade aumentada (AR)</i>.</>,
  list: [
    <>Construído em React e Supabase permitindo uma experiência fluída e compatilhamento fácil de modelos 3D.</>,
    <>Implementação de funcionalidades de AR usando a biblioteca <i>Three.js</i> para visualização 3D.</>,
    <>Desenvolvido para Web e disponível na <i>Play Store</i> como aplicativo Android!</>
  ],
  tags: [
    "React",
    "PWA",
    "Android",
    "Supabase",
    "PostgreSQL",
    "Three.js",
    "Realidade Aumentada"
  ],
  src: "/assets/Voxely.webp",
  alt: "Imagem do projeto Voxely"
}

const project2 = {
  title: "Medital - Encaminhamento Médico",
  description: <>Medital é uma plataforma de encaminhamento médico que direciona os pacientes para a unidade de saúde mais adequada com base na especialidade, distância e a gravidade do caso. O site foi concorrente na Feira de Ciências e Engenharia de Guarulhos de 2022 (FECEG)</>,
  list: [
    <>Integrado todo o banco de dados do DATASUS na plataforma.</>,
    <>Sistema de priorização de atendimento baseado na gravidade do caso, otimizando o tempo de resposta.</>,
    <>Desenvolvido com NextJS e MongoDB para garantir alta performance e escalabilidade.</>
  ],
  tags: [
    "NextJS",
    "MongoDB",
    "NodeJS",
    "Rest API",
    "DATASUS",
    "Healthcare"
  ],
  src: "/assets/Medital.webp",
  alt: "Imagem do projeto Medital"
}

export default function Projects() {
  return (
    <section className="mb-20 mt-50 flex flex-col gap-20">
      <ProjectContainer {...project1} />
      <ProjectContainer  {...project2} className="flex-row-reverse" />
    </section>

  )
}