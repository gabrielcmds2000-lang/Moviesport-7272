import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Info,
  MinusCircle,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import type { ModelKind } from "./product-model";
import { knowledge, materials, sources } from "../data/knowledge";
const tabs = [
  "Visão geral",
  "Uso e especificações",
  "Materiais",
  "Vantagens e limites",
  "Perguntas frequentes",
];
export default function KnowledgePanels({ kind }: { kind: ModelKind }) {
  const [tab, setTab] = useState(0);
  const p = knowledge[kind];
  return (
    <section className="knowledge-section" id="informacoes">
      <div className="section-top">
        <div>
          <span className="eyebrow">INFORMAÇÃO QUE FAZ DIFERENÇA</span>
          <h2>
            Por dentro de <em>cada solução.</em>
          </h2>
        </div>
        <span className="context-chip">Em foco: {p.name}</span>
      </div>
      <div className="info-tabs" aria-label="Áreas de informação">
        {tabs.map((t, i) => (
          <button
            key={t}
            aria-pressed={tab === i}
            onClick={() => setTab(i)}
            className={tab === i ? "active" : ""}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="knowledge-window" aria-live="polite">
        <div className="window-bar">
          <span className="live-dot" />
          <span>{tabs[tab]}</span>
          <small>{p.name} / GUIA EDUCATIVO</small>
        </div>
        {tab === 0 && (
          <div className="info-grid">
            <article>
              <span className="eyebrow">O QUE É</span>
              <h3>{p.name}</h3>
              <p>{p.overview}</p>
            </article>
            <article>
              <span className="eyebrow">COMO FUNCIONA</span>
              <h3>Da estrutura ao movimento</h3>
              <p>{p.mechanism}</p>
            </article>
            <div className="info-callout">
              <Info size={20} />
              <p>
                O modelo é uma representação conceitual. As cores são
                personalizáveis; elas não indicam material, certificação ou
                qualidade. A escolha real exige avaliação individual.
              </p>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div className="info-grid">
            <article>
              <span className="eyebrow">FINALIDADE</span>
              <h3>Onde entra no dia a dia</h3>
              <p>{p.use}</p>
              <h4>Cuidados e acompanhamento</h4>
              <ul>
                {p.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>
            <article>
              <span className="eyebrow">FICHA CONCEITUAL</span>
              <dl>
                {p.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <div>
                  <dt>Medidas, peso e carga máxima</dt>
                  <dd>
                    Não especificados. Dependem do equipamento real e de
                    validação técnica.
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        )}
        {tab === 2 && (
          <>
            <div className="material-intro">
              <h3>Do que pode ser feito?</h3>
              <p>
                Materiais comuns nesta categoria — não uma lista de fabricação
                do modelo. Nenhuma combinação abaixo está validada para
                produção.
              </p>
            </div>
            <div className="material-grid">
              {materials
                .filter((m) => p.materials.includes(m.id))
                .map((m) => (
                  <article key={m.id}>
                    <span className="eyebrow">{m.where}</span>
                    <h3>{m.name}</h3>
                    <p>{m.process}</p>
                    <div className="tradeoff good">
                      <CheckCircle2 size={16} />
                      <div>
                        <b>Pontos positivos</b>
                        <p>{m.good}</p>
                      </div>
                    </div>
                    <div className="tradeoff">
                      <MinusCircle size={16} />
                      <div>
                        <b>Limitações</b>
                        <p>{m.bad}</p>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </>
        )}
        {tab === 3 && (
          <div className="info-grid">
            <article>
              <CheckCircle2 className="lime-icon" />
              <h3>Possibilidades</h3>
              <p>{p.benefit}</p>
            </article>
            <article>
              <MinusCircle className="lime-icon" />
              <h3>Limitações e atenção</h3>
              <p>{p.limit}</p>
            </article>
            <div className="info-callout">
              <ShieldCheck size={22} />
              <p>
                Adequação não é uma nota de desempenho. Conforto, ambiente,
                manutenção, objetivos e acesso à reabilitação devem ser
                considerados em conjunto.
              </p>
            </div>
          </div>
        )}
        {tab === 4 && (
          <div className="product-faq">
            {[
              ...p.faq,
              [
                "Posso imprimir ou fabricar este modelo?",
                "Não. Não há medidas, tolerâncias, ensaios ou aprovação clínica. O 3D é apenas educativo.",
              ],
              [
                "Como começar a buscar atendimento?",
                "Procure uma equipe de reabilitação ou uma UBS para orientação sobre a rede local. Confirme especialidade, avaliação, adaptação e acompanhamento antes de escolher um serviço.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        )}
      </div>
      <div className="source-row">
        <span>Pesquise além do modelo:</span>
        {sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
            {s.title}
            <ArrowUpRight size={12} />
          </a>
        ))}
      </div>
    </section>
  );
}
export function ComparisonStatus() {
  const [left, setLeft] = useState<ModelKind>("run"),
    [right, setRight] = useState<ModelKind>("leg");
  const a = knowledge[left],
    b = knowledge[right];
  const rows: [string, string, string][] = [
    ["Finalidade", a.use, b.use],
    ["Mecanismo", a.specs[1][1], b.specs[1][1]],
    [
      "Materiais possíveis",
      materials
        .filter((m) => a.materials.includes(m.id))
        .map((m) => m.name)
        .join(" · "),
      materials
        .filter((m) => b.materials.includes(m.id))
        .map((m) => m.name)
        .join(" · "),
    ],
    ["Ponto positivo", a.benefit, b.benefit],
    ["Limitação", a.limit, b.limit],
    ["Ajuste individual", "Necessário", "Necessário"],
    [
      "Dados técnicos validados",
      "Não disponíveis neste conceito",
      "Não disponíveis neste conceito",
    ],
  ];
  return (
    <div className="status-window">
      <div className="window-bar">
        <span className="live-dot" />
        <span>PAINEL DE COMPARAÇÃO</span>
        <small>SEM PREÇOS OU NOTAS CLÍNICAS</small>
      </div>
      <div className="compare-selectors">
        <label htmlFor="compare-left">
          Solução A
          <select
            id="compare-left"
            value={left}
            onChange={(e) => setLeft(e.target.value as ModelKind)}
          >
            {Object.entries(knowledge).map(([id, k]) => (
              <option key={id} value={id}>
                {k.name}
              </option>
            ))}
          </select>
        </label>
        <span>×</span>
        <label htmlFor="compare-right">
          Solução B
          <select
            id="compare-right"
            value={right}
            onChange={(e) => setRight(e.target.value as ModelKind)}
          >
            {Object.entries(knowledge).map(([id, k]) => (
              <option key={id} value={id}>
                {k.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {left === right && (
        <p className="same-note">
          Você selecionou a mesma solução. Escolha outra para comparar
          diferenças.
        </p>
      )}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Critério</th>
              <th>{a.name}</th>
              <th>{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, x, y]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{x}</td>
                <td>{y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="status-foot">
        <ShieldCheck size={16} />
        <span>
          Status dos dois modelos: conceituais · avaliação profissional
          necessária · sem certificação ou medidas de fabricação.
        </span>
      </div>
    </div>
  );
}
