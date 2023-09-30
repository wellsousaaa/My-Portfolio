import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Esse é o meu Portfólio! Aqui você pode ver detalhes sobre mim e meus projetos."
        />
        <link rel="apple-touch-icon" href="/assets/well.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Wendell de Sousa - Portfólio</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
