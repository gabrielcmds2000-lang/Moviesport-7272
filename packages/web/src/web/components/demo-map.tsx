import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { MapPin, ArrowUpRight, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";
const points = [
  {
    name: "Ponto A · Próteses",
    type: "Próteses",
    position: [-23.632, -46.766] as [number, number],
    text: "Exemplo de serviço de avaliação e adaptação de próteses.",
  },
  {
    name: "Ponto B · Mobilidade",
    type: "Mobilidade",
    position: [-23.643, -46.754] as [number, number],
    text: "Exemplo de serviço de cadeiras de rodas e apoio postural.",
  },
  {
    name: "Ponto C · Reabilitação",
    type: "Reabilitação",
    position: [-23.622, -46.773] as [number, number],
    text: "Exemplo de acompanhamento e treinamento funcional.",
  },
];
function MapFocus({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 14, { duration: 0.7 });
  }, [map, position]);
  return (
    <button className="map-focus" onClick={() => map.flyTo(position, 14)}>
      Centralizar área
    </button>
  );
}
export default function DemoMap() {
  const [selected, setSelected] = useState(0),
    [filter, setFilter] = useState("Todos"),
    [loaded, setLoaded] = useState(false);
  const visible = points.filter((p) => filter === "Todos" || p.type === filter);
  return (
    <section id="mapa" className="map-section">
      <div className="section-top">
        <div>
          <span className="eyebrow">CONEXÕES PERTO DE VOCÊ</span>
          <h2>
            Uma rede de <em>possibilidades.</em>
          </h2>
        </div>
        <span className="context-chip">
          <MapPin size={14} /> Campo Limpo · São Paulo
        </span>
      </div>
      <div className="demo-alert">
        <Info size={19} />
        <div>
          <b>MAPA DEMONSTRATIVO — LOCAIS FICTÍCIOS</b>
          <p>
            A base geográfica é real, mas os três pontos são exemplos
            inventados. Não são lojas ou centros existentes, nem resultados de
            proximidade. Não use estes pontos para deslocamento.
          </p>
        </div>
      </div>
      <div className="map-grid">
        <div className="map-area">
          <MapContainer
            center={[-23.633, -46.763]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              eventHandlers={{ load: () => setLoaded(true) }}
            />
            {visible.map((p) => (
              <CircleMarker
                key={p.name}
                center={p.position}
                radius={selected === points.indexOf(p) ? 13 : 9}
                pathOptions={{
                  color: "#192511",
                  fillColor: "#b5ef65",
                  fillOpacity: 1,
                  weight: 3,
                }}
                eventHandlers={{ click: () => setSelected(points.indexOf(p)) }}
              >
                <Popup>
                  <b>{p.name}</b>
                  <p>{p.text}</p>
                  <strong>LOCAL FICTÍCIO · SOMENTE EXEMPLO</strong>
                </Popup>
              </CircleMarker>
            ))}
            <MapFocus position={points[selected].position} />
          </MapContainer>
          {!loaded && (
            <div className="map-loading">
              Carregando mapa externo… Se indisponível, use a busca real ao
              lado.
            </div>
          )}
        </div>
        <aside className="map-list">
          <span className="eyebrow">EXEMPLOS DE ATENDIMENTO</span>
          <div className="map-filters">
            {["Todos", "Próteses", "Mobilidade", "Reabilitação"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={filter === t ? "selected" : ""}
              >
                {t}
              </button>
            ))}
          </div>
          {visible.map((p) => (
            <button
              key={p.name}
              className={`place-card ${selected === points.indexOf(p) ? "selected" : ""}`}
              onClick={() => setSelected(points.indexOf(p))}
            >
              <MapPin size={19} />
              <span>
                <b>{p.name}</b>
                <small>Local fictício · {p.type}</small>
                <span>{p.text}</span>
              </span>
            </button>
          ))}
          <div className="real-search">
            <h3>Quer encontrar locais reais?</h3>
            <p>
              Abra uma busca externa e confirme endereço, serviços e
              acessibilidade diretamente com o estabelecimento. O Movi Esport
              não verificou esses resultados.
            </p>
            <a
              href="https://www.google.com/maps/search/pr%C3%B3teses+ortop%C3%A9dicas+Campo+Limpo+S%C3%A3o+Paulo/"
              target="_blank"
              rel="noreferrer"
            >
              Buscar no Google Maps <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
      </div>
      <div className="visit-checklist">
        <b>Antes de procurar um serviço</b>
        <span>Confirme a especialidade</span>
        <span>Pergunte sobre avaliação e ajustes</span>
        <span>Verifique acessibilidade</span>
        <span>Combine acompanhamento</span>
      </div>
    </section>
  );
}
