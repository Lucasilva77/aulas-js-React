import "./App.css";
import Cards from "./componentes/Cards/cards";

export default function App() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      <Cards
        titulo="Card 1"
        texto="AI-generated reports, emails, and business documents so they sound clear and professional."
        mostrarLink={true}
        link="https://www.espn.com.br/futebol/brasileirao/artigo/_/id/15596411/neto-diz-flamengo-vai-virar-bayern-se-corinthians-e-outros-times-nao-se-organizarem-ninguem-mais-vai-ganhar-brasileirao-e-libertadores"
      />
      <Cards
        titulo="Card 2"
        texto="Write faster with AI-assisted tools for essays, reports, and emails."
        link="https://ge.globo.com/futebol/times/sao-paulo/"
        mostrarLink={false}
      />
      <Cards
        titulo="Card 3"
        texto="Improve clarity, style, and tone using AI suggestions."
        mostrarLink={true}
        link="https://www.google.com/search?q=22658298698&rlz=1C1GCEU_pt-BRBR1096BR1096&sourceid=chrome&ie=UTF-8"
      />
      <Cards
        titulo="Card 4"
        texto="Generate professional content quickly and efficiently."
        link="https://www.nike.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=Google_Search_NIKE-INST-ROAS&gad_source=1&gad_campaignid=17563577644&gbraid=0AAAAADob9lMt5Ps1dgKgFcpnSqaqY1mvY&gclid=CjwKCAjw2brFBhBOEiwAVJX5GDMAReWx1D0ID4uT5D2mmudVMayATrcfxIXqVQF9YE4tUZyKTBkUFBoCH-4QAvD_BwE&utm_referrer=https://www.google.com/"
        mostrarLink={false}
      />
    </div>
  );
}

