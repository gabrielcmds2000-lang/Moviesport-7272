import { useLocation } from "wouter";
import { useState, lazy, Suspense } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  MoveUpRight,
  RotateCcw,
  Pause,
  Play,
  Check,
  Accessibility,
  Layers3,
  Scan,
  ChevronDown,
  Download,
  Orbit,
} from "lucide-react";
import { knowledge } from "../data/knowledge";
import type { ModelKind } from "../components/product-model";
import KnowledgePanels, {
  ComparisonStatus,
} from "../components/knowledge-panels";
const DemoMap = lazy(() => import("../components/demo-map"));
const ModelViewer = lazy(() => import("../components/product-model"));
const products: {
  id: ModelKind;
  name: string;
  short: string;
  tag: string;
  description: string;
  parts: string[];
  use: string;
  option: string;
  standard: string;
}[] = [
  {
    id: "run",
    name: "Prótese de corrida",
    short: "Sprint",
    tag: "01 / PERFORMANCE",
    description:
      "Uma lâmina curva que armazena e devolve parte da energia a cada passada. Uma conexão entre engenharia e movimento.",
    parts: [
      "Encaixe individualizado",
      "Lâmina elástica",
      "Adaptador de conexão",
    ],
    use: "Corrida e atividades esportivas",
    option: "Sola de destaque",
    standard: "Lâmina essencial",
  },
  {
    id: "chair",
    name: "Cadeira de rodas modular",
    short: "Flex",
    tag: "02 / MOBILIDADE",
    description:
      "Uma estrutura com componentes adaptáveis. Explore a diferença visual entre uma configuração cotidiana e uma inspiração esportiva.",
    parts: ["Assento e encosto", "Rodas de propulsão", "Apoio para os pés"],
    use: "Mobilidade cotidiana e esporte adaptado",
    option: "Esportiva · rodas inclinadas",
    standard: "Urbana · apoio de braços",
  },
  {
    id: "leg",
    name: "Prótese de perna",
    short: "Everyday",
    tag: "03 / AUTONOMIA",
    description:
      "Encaixe, estrutura de conexão e pé protético se unem para apoiar o movimento no dia a dia. O ajuste real é sempre individual.",
    parts: ["Encaixe", "Estrutura de conexão", "Pé protético"],
    use: "Caminhada e atividades cotidianas",
    option: "Revestimento colorido",
    standard: "Acabamento neutro",
  },
  {
    id: "arm",
    name: "Prótese de braço e mão",
    short: "Grip",
    tag: "04 / INTERAÇÃO",
    description:
      "Um modelo simplificado de membro superior, com palma e dedos articulados. Explore duas poses para entender o movimento de preensão.",
    parts: ["Encaixe de antebraço", "Conector do punho", "Mão articulada"],
    use: "Interação e atividades cotidianas",
    option: "Mão em preensão",
    standard: "Mão aberta",
  },
];
const colors = [
  { name: "Verde-lima", hex: "#b5ef65" },
  { name: "Azul", hex: "#65b8ee" },
  { name: "Coral", hex: "#ed886e" },
  { name: "Branco", hex: "#e5e8e0" },
];
export default function Home() {
  const [path] = useLocation();
  const area = path === "/" ? "inicio" : path.slice(1);
  const areaNames: Record<string, string> = {
    projeto: "O projeto",
    modelos: "Modelos 3D",
    comparar: "Compare",
    guia: "Guia de produtos",
    mapa: "Mapa demonstrativo",
  };
  const [highlight, setHighlight] = useState(-1);
  const [kind, setKind] = useState<ModelKind>(() => {
      const product = new URLSearchParams(window.location.search).get(
        "produto",
      );
      return products.some((p) => p.id === product)
        ? (product as ModelKind)
        : "run";
    }),
    [color, setColor] = useState(colors[0].hex),
    [option, setOption] = useState(false),
    [auto, setAuto] = useState(true),
    [reset, setReset] = useState(0),
    [saved, setSaved] = useState(false);
  const p = products.find((x) => x.id === kind)!;
  function choose(k: ModelKind) {
    setHighlight(-1);
    setKind(k);
    setOption(false);
    setSaved(false);
  }
  function download() {
    const guide = knowledge[kind];
    const text = `MOVI ESPORT — Ficha conceitual\n\n${p.name}\n${p.description}\nUso: ${p.use}\nCor: ${colors.find((c) => c.hex === color)?.name}\nConfiguração: ${option ? p.option : p.standard}\nComponentes: ${p.parts.join(", ")}\nComo funciona: ${guide.mechanism}\nBenefícios: ${guide.benefit}\nLimitações: ${guide.limit}\nCuidados: ${guide.care.join("; ")}\n\nModelo educativo simplificado. Não é um molde para fabricação, prescrição ou dispositivo aprovado. Avaliação e adaptação por profissionais são indispensáveis.\n\nFontes: https://www.who.int/news-room/fact-sheets/detail/assistive-technology\nhttps://www.paralympic.org/feature/cutting-edge-technology-behind-para-sports`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `movi-esport-${kind}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  }
  return (
    <>
      <header id="topo">
        <a className="brand" href="/">
          <span className="brand-icon">m</span>movi<span>esport</span>
          <small>®</small>
        </a>
        <nav>
          <a
            href="/projeto"
            aria-current={area === "projeto" ? "page" : undefined}
          >
            O projeto
          </a>
          <a
            href="/modelos"
            aria-current={area === "modelos" ? "page" : undefined}
          >
            Modelos 3D
          </a>
          <a
            href="/comparar"
            aria-current={area === "comparar" ? "page" : undefined}
          >
            Compare
          </a>
          <a href="/guia" aria-current={area === "guia" ? "page" : undefined}>
            Guia
          </a>
          <a href="/mapa" aria-current={area === "mapa" ? "page" : undefined}>
            Mapa
          </a>
        </nav>
        <a className="nav-cta" href="/modelos">
          Explore o movimento <ArrowUpRight size={16} />
        </a>
      </header>
      <main className={`page-${area}`}>
        {area !== "inicio" && (
          <div className="page-breadcrumb">
            <a href="/">Início</a>
            <span>/</span>
            <span>{areaNames[area]}</span>
          </div>
        )}

        {area === "inicio" && (
          <>
            <section className="hero">
              <div className="eyebrow">
                <span /> TECNOLOGIA QUE INCLUI. MOVIMENTO QUE TRANSFORMA.
              </div>
              <h1>
                O movimento é<br />
                para <em>todo mundo.</em>
                <span className="spark">✳</span>
              </h1>
              <p>
                Novas possibilidades começam com um novo olhar.
                <br />
                Explore próteses e soluções de mobilidade, do seu jeito.
              </p>
              <a className="button" href="/modelos">
                Entre no laboratório 3D <MoveUpRight size={17} />
              </a>
              <div className="hero-note">
                <Orbit size={13} /> Interativo. Personalizável. Feito para
                explorar.
              </div>
              <div className="hero-side">
                DESIGN PARA A AUTONOMIA / EST. 2026
              </div>
            </section>
          </>
        )}
        {area === "inicio" && (
          <section className="area-directory">
            <span className="eyebrow">CADA ÁREA, UMA NOVA DESCOBERTA</span>
            <h2>
              Por onde você quer <em>começar?</em>
            </h2>
            <div>
              {[
                {
                  url: "/projeto",
                  title: "O projeto",
                  text: "A ideia, a inclusão e as perguntas essenciais.",
                },
                {
                  url: "/modelos",
                  title: "Modelos 3D",
                  text: "Explore e personalize os quatro produtos.",
                },
                {
                  url: "/comparar",
                  title: "Compare",
                  text: "Analise duas soluções lado a lado.",
                },
                {
                  url: "/guia",
                  title: "Guia",
                  text: "Entenda usos, materiais, cuidados e limites.",
                },
                {
                  url: "/mapa",
                  title: "Mapa",
                  text: "Explore o mapa demonstrativo do Campo Limpo.",
                },
              ].map((item, i) => (
                <a key={item.url} href={item.url}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <ArrowUpRight size={21} />
                </a>
              ))}
            </div>
          </section>
        )}
        {area === "modelos" && (
          <>
            <section id="laboratorio" className="lab-section">
              <div className="section-top">
                <div>
                  <span className="eyebrow">
                    O FUTURO, POR TODOS OS ÂNGULOS
                  </span>
                  <h2>
                    Seu movimento.
                    <br />
                    <em>Sua configuração.</em>
                  </h2>
                </div>
                <p>
                  Gire, aproxime e personalize.
                  <br />
                  Conheça a ideia por trás de cada componente.
                </p>
              </div>
              <div className="product-tabs">
                {products.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => choose(x.id)}
                    className={kind === x.id ? "active" : ""}
                  >
                    <span>{x.tag.slice(0, 2)}</span>
                    {x.name}
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </div>
              <div className="lab">
                <div className="viewport">
                  <div className="canvas-label">
                    <span className="live-dot" /> VISUALIZAÇÃO 3D{" "}
                    <span>MODELO CONCEITUAL</span>
                  </div>
                  <Suspense
                    fallback={
                      <div className="loading">Carregando experiência 3D…</div>
                    }
                  >
                    <ModelViewer
                      kind={kind}
                      color={color}
                      option={option}
                      auto={auto}
                      reset={reset}
                      highlight={highlight}
                    />
                  </Suspense>
                  <div className="model-name">
                    {p.short}
                    <span>™</span>
                  </div>
                  <div className="canvas-bottom">
                    <span>
                      <Orbit size={15} /> Arraste para girar · role para ampliar
                    </span>
                    <div>
                      <button
                        title={auto ? "Pausar rotação" : "Ativar rotação"}
                        aria-label={auto ? "Pausar rotação" : "Ativar rotação"}
                        onClick={() => setAuto(!auto)}
                      >
                        {auto ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        title="Restaurar visão"
                        aria-label="Restaurar visão"
                        onClick={() => setReset(reset + 1)}
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <aside className="config">
                  <span className="eyebrow">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="control">
                    <div className="control-label">
                      01 <b>Cor de destaque</b>
                      <span>{colors.find((c) => c.hex === color)?.name}</span>
                    </div>
                    <div className="swatches">
                      {colors.map((c) => (
                        <button
                          key={c.hex}
                          aria-label={c.name}
                          aria-pressed={color === c.hex}
                          onClick={() => {
                            setColor(c.hex);
                            setSaved(false);
                          }}
                          style={{ background: c.hex }}
                          className={color === c.hex ? "selected" : ""}
                        >
                          {color === c.hex && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="control">
                    <div className="control-label">
                      02 <b>Configuração</b>
                    </div>
                    <div className="options">
                      <button
                        className={!option ? "selected" : ""}
                        onClick={() => {
                          setOption(false);
                          setSaved(false);
                        }}
                      >
                        {p.standard}
                        {!option && <Check size={14} />}
                      </button>
                      <button
                        className={option ? "selected" : ""}
                        onClick={() => {
                          setOption(true);
                          setSaved(false);
                        }}
                      >
                        {p.option}
                        {option && <Check size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="parts">
                    <div className="control-label">
                      DESTAQUE UM COMPONENTE NO 3D
                    </div>
                    {p.parts.map((part, i) => (
                      <button
                        key={part}
                        className={highlight === i ? "part-highlight" : ""}
                        aria-pressed={highlight === i}
                        onClick={() => {
                          setHighlight(highlight === i ? -1 : i);
                          setAuto(false);
                        }}
                      >
                        <span>0{i + 1}</span>
                        {part}
                        <Layers3 size={13} />
                      </button>
                    ))}
                  </div>
                  <a
                    className="product-guide-link"
                    href={`/guia?produto=${kind}`}
                  >
                    Uso, materiais e especificações <ArrowUpRight size={14} />
                  </a>
                  <button className="download" onClick={download}>
                    {saved ? "Ficha baixada" : "Baixar minha configuração"}
                    {saved ? <Check size={15} /> : <Download size={15} />}
                  </button>
                </aside>
              </div>
              <p className="disclaimer">
                <Scan size={14} /> Modelos 3D educativos e simplificados. Não
                são moldes para fabricação nem substituem avaliação
                profissional.
              </p>
            </section>
          </>
        )}
        {area === "guia" && (
          <>
            <section className="guide-picker">
              <span className="eyebrow">
                ESCOLHA O PRODUTO QUE QUER CONHECER
              </span>
              <div className="product-tabs">
                {products.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => choose(x.id)}
                    className={kind === x.id ? "active" : ""}
                    aria-pressed={kind === x.id}
                  >
                    <span>{x.tag.slice(0, 2)}</span>
                    {x.name}
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </div>
              <a
                className="product-guide-link"
                href={`/modelos?produto=${kind}`}
              >
                Ver este produto em 3D <ArrowUpRight size={14} />
              </a>
            </section>
            <KnowledgePanels kind={kind} />
          </>
        )}
        {area === "projeto" && (
          <>
            <div className="ticker">
              <span>MAIS AUTONOMIA</span>
              <span>✳</span>
              <span>MAIS POSSIBILIDADES</span>
              <span>✳</span>
              <span>MAIS MOVIMENTO</span>
              <span>✳</span>
              <span>PARA TODOS</span>
            </div>
          </>
        )}
        {area === "projeto" && (
          <>
            <section id="projeto" className="project">
              <div>
                <span className="eyebrow">MUITO ALÉM DO EQUIPAMENTO</span>
                <h2>
                  Não é sobre limites.
                  <br />É sobre <em>possibilidades.</em>
                </h2>
              </div>
              <div>
                <p>
                  A tecnologia assistiva aproxima pessoas das atividades que
                  importam: estudar, trabalhar, praticar esportes e participar
                  da vida em comunidade.
                </p>
                <p>
                  O Movi Esport é um projeto escolar para conhecer essas
                  soluções de maneira visual e interativa. Cada pessoa tem
                  necessidades únicas — e o equipamento deve acompanhar essa
                  individualidade.
                </p>
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/assistive-technology"
                  target="_blank"
                  rel="noreferrer"
                >
                  Conheça a tecnologia assistiva · OMS{" "}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </section>
          </>
        )}
        {area === "projeto" && (
          <>
            <section className="principles">
              <article>
                <Accessibility />
                <span>01</span>
                <h3>Acesso é o começo.</h3>
                <p>
                  Inclusão envolve equipamentos, ambientes acessíveis e
                  oportunidades reais de participação.
                </p>
              </article>
              <article>
                <Layers3 />
                <span>02</span>
                <h3>Cada pessoa, um ajuste.</h3>
                <p>
                  Encaixe, conforto e funcionalidade precisam de avaliação,
                  adaptação e acompanhamento profissional.
                </p>
              </article>
              <article>
                <ArrowUpRight />
                <span>03</span>
                <h3>Esporte abre caminhos.</h3>
                <p>
                  Próteses e cadeiras esportivas são pensadas para atividades
                  específicas, não como uma solução única.
                </p>
              </article>
            </section>
          </>
        )}
        {area === "comparar" && (
          <>
            <section id="comparar" className="comparison">
              <div className="center">
                <span className="eyebrow">
                  DIFERENTES CAMINHOS. A MESMA LIBERDADE.
                </span>
                <h2>
                  Conheça. Compare.
                  <br />
                  <em>Amplie seu olhar.</em>
                </h2>
                <p>
                  O melhor equipamento não é o mais complexo. É o adequado à
                  pessoa e à atividade.
                </p>
              </div>
              <ComparisonStatus />
              <p className="table-note">
                Comparação educativa de finalidades, não de desempenho clínico.
                Cadeira de rodas é um recurso de mobilidade, não uma prótese.
              </p>
            </section>
          </>
        )}
        {area === "projeto" && (
          <>
            <section className="faq">
              <div>
                <span className="eyebrow">CURIOSIDADE MOVE O MUNDO</span>
                <h2>
                  Boas <em>perguntas.</em>
                  <br />
                  Novas perspectivas.
                </h2>
                <p>Para entender antes de escolher.</p>
              </div>
              <div>
                {[
                  {
                    q: "O que é uma prótese?",
                    a: "É um dispositivo que substitui, total ou parcialmente, uma parte do corpo ausente. O tipo e o ajuste dependem das necessidades de cada pessoa.",
                  },
                  {
                    q: "Como funciona uma lâmina de corrida?",
                    a: "A geometria curva e os materiais elásticos permitem armazenar e devolver parte da energia durante a passada. O modelo aqui ilustra a forma, não simula forças ou desempenho.",
                  },
                  {
                    q: "Posso fabricar um produto com estes modelos?",
                    a: "Não. São representações educativas sem medidas, ensaios ou validação de segurança. Equipamentos reais exigem projeto técnico, avaliação clínica e profissionais especializados.",
                  },
                  {
                    q: "Todas as pessoas usam o mesmo equipamento?",
                    a: "Não. Atividade, conforto, medidas, ambiente e preferências influenciam a escolha. Adaptação, treinamento e acompanhamento são importantes.",
                  },
                  {
                    q: "Onde posso pesquisar mais?",
                    a: "Consulte as fontes abaixo: a Organização Mundial da Saúde explica a tecnologia assistiva; o Comitê Paralímpico Internacional apresenta tecnologias utilizadas no esporte.",
                  },
                ].map((f) => (
                  <details key={f.q}>
                    <summary>
                      {f.q}
                      <ChevronDown size={17} />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        )}
        {area === "mapa" && (
          <Suspense
            fallback={
              <section className="loading">Carregando área do mapa…</section>
            }
          >
            <DemoMap />
          </Suspense>
        )}
        {area === "projeto" && (
          <>
            <section className="closing">
              <span className="eyebrow">
                UM PROJETO SOBRE PESSOAS, NÃO SOBRE LIMITES.
              </span>
              <h2>
                O próximo movimento
                <br />
                começa com <em>você.</em>
              </h2>
              <a className="button" href="/modelos">
                Explore as possibilidades <ArrowUpRight size={17} />
              </a>
            </section>
          </>
        )}
      </main>
      <footer>
        <a className="brand" href="/">
          <span className="brand-icon">m</span>movi<span>esport</span>
        </a>
        <span>Projeto escolar · Tecnologia, esporte e inclusão</span>
        <div>
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/assistive-technology"
            target="_blank"
            rel="noreferrer"
          >
            Fonte: OMS <ArrowUpRight size={12} />
          </a>
          <a
            href="https://www.paralympic.org/feature/cutting-edge-technology-behind-para-sports"
            target="_blank"
            rel="noreferrer"
          >
            Fonte: IPC <ArrowUpRight size={12} />
          </a>
          <a href="#topo">
            Voltar ao topo{" "}
            <ArrowDown size={12} style={{ transform: "rotate(180deg)" }} />
          </a>
        </div>
      </footer>
    </>
  );
}
