import { Html } from "@react-three/drei";
import type { ModelKind } from "./product-model";
const landmarks: Record<
  ModelKind,
  { name: string; p: [number, number, number]; r: number }[]
> = {
  run: [
    { name: "Encaixe e interface", p: [0, 1, 0], r: 0.35 },
    { name: "Lâmina e contato com o solo", p: [-0.16, -0.6, 0], r: 0.52 },
    { name: "Conexão estrutural", p: [0, 0.55, 0], r: 0.22 },
  ],
  leg: [
    { name: "Encaixe e interface", p: [0, 1, 0], r: 0.35 },
    { name: "Tubo e adaptadores", p: [0, -0.05, 0], r: 0.3 },
    { name: "Pé protético", p: [0, -0.88, 0.2], r: 0.4 },
  ],
  arm: [
    { name: "Encaixe e interface", p: [0, 1, 0], r: 0.35 },
    { name: "Punho e palma", p: [0, -0.25, 0], r: 0.29 },
    { name: "Dedos articulados", p: [0, -0.8, 0.12], r: 0.25 },
  ],
  chair: [
    { name: "Assento e encosto", p: [0, 0.4, -0.25], r: 0.56 },
    { name: "Rodas e aros de propulsão", p: [0.7, -0.2, 0], r: 0.75 },
    { name: "Apoio para os pés", p: [0, -0.88, 0.9], r: 0.45 },
  ],
};
function Bolt({ p }: { p: [number, number, number] }) {
  return (
    <mesh position={p} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.025, 0.025, 0.027, 6]} />
      <meshStandardMaterial color="#c4c9c4" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}
function Ring({ p, r = 0.18 }: { p: [number, number, number]; r?: number }) {
  return (
    <mesh position={p} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r, 0.015, 10, 48]} />
      <meshStandardMaterial color="#aab4ac" metalness={0.9} roughness={0.22} />
    </mesh>
  );
}
export default function ModelDetails({
  kind,
  color,
  highlight,
}: {
  kind: ModelKind;
  color: string;
  highlight: number;
}) {
  const mark = landmarks[kind][highlight];
  return (
    <group>
      {kind !== "chair" && (
        <>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.267, 0.175, 0.67, 48, 1, true]} />
            <meshStandardMaterial side={2} color="#292e2a" roughness={0.9} />
          </mesh>
          {[0.63, 0.58].map((y) => (
            <Ring key={y} p={[0, y, 0]} r={0.175} />
          ))}
          {[-0.11, 0.11].map((x) => (
            <Bolt key={x} p={[x, 0.62, 0.155]} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin((i * Math.PI) / 4) * 0.245,
                1.03,
                Math.cos((i * Math.PI) / 4) * 0.245,
              ]}
              rotation={[0, (i * Math.PI) / 4, 0]}
            >
              <boxGeometry args={[0.017, 0.37, 0.012]} />
              <meshStandardMaterial color={color} roughness={0.6} />
            </mesh>
          ))}
        </>
      )}
      {kind === "run" && (
        <>
          <mesh position={[0, 0.49, 0.1]}>
            <boxGeometry args={[0.24, 0.26, 0.04]} />
            <meshStandardMaterial color="#676f68" metalness={0.85} />
          </mesh>
          {[-0.075, 0.075].flatMap((x) =>
            [0.4, 0.56].map((y) => <Bolt key={`${x}-${y}`} p={[x, y, 0.13]} />),
          )}
          {Array.from({ length: 8 }, (_, i) => (
            <mesh key={i} position={[0.14 + i * 0.055, -1.165, 0.01]}>
              <boxGeometry args={[0.023, 0.026, 0.205]} />
              <meshStandardMaterial color="#7b847a" roughness={0.85} />
            </mesh>
          ))}
        </>
      )}
      {kind === "leg" && (
        <>
          <Ring p={[0, -0.66, 0]} r={0.12} />
          <Ring p={[0, 0.27, 0]} r={0.18} />
          {[-0.085, 0.085].map((x) => (
            <Bolt key={x} p={[x, 0.28, 0.15]} />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <mesh key={i} position={[0, -1, 0.0 + i * 0.09]}>
              <boxGeometry args={[0.37, 0.018, 0.026]} />
              <meshStandardMaterial color="#757e76" roughness={0.85} />
            </mesh>
          ))}
          <mesh position={[0, -0.76, 0.16]}>
            <boxGeometry args={[0.25, 0.045, 0.35]} />
            <meshStandardMaterial color={color} metalness={0.4} />
          </mesh>
        </>
      )}
      {kind === "arm" && (
        <>
          <Ring p={[0, -0.01, 0]} r={0.15} />
          {[-0.1, 0.1].flatMap((x) =>
            [-0.18, -0.48].map((y) => (
              <Bolt key={`${x}-${y}`} p={[x, y, 0.115]} />
            )),
          )}
          {[0, 1, 2, 3].map((i) => (
            <group key={i}>
              <mesh position={[-0.13 + i * 0.09, -0.56, 0]}>
                <sphereGeometry args={[0.046, 16, 16]} />
                <meshStandardMaterial color="#b7bdb6" metalness={0.8} />
              </mesh>
              <mesh position={[-0.13 + i * 0.09, -0.66, 0.042]}>
                <boxGeometry args={[0.054, 0.105, 0.024]} />
                <meshStandardMaterial color={color} metalness={0.4} />
              </mesh>
            </group>
          ))}
        </>
      )}
      {kind === "chair" && (
        <group position={[0, -0.45, 0]} rotation={[0, -0.3, 0]}>
          <mesh position={[0, 0.54, 0]}>
            <boxGeometry args={[1.04, 0.1, 0.8]} />
            <meshStandardMaterial color="#424c41" roughness={0.95} />
          </mesh>
          {[-0.43, 0.43].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.98, -0.325]}>
                <boxGeometry args={[0.025, 0.78, 0.025]} />
                <meshStandardMaterial color="#d0dac4" roughness={0.85} />
              </mesh>
              <Bolt p={[x, 0.59, 0.4]} />
              <mesh position={[x, 0.33, 0.44]} rotation={[0, 0, 0.3]}>
                <boxGeometry args={[0.08, 0.19, 0.07]} />
                <meshStandardMaterial color="#c0c6be" metalness={0.8} />
              </mesh>
            </group>
          ))}
          {[-1, 1].flatMap((side) =>
            Array.from({ length: 48 }, (_, i) => {
              const t = (i * Math.PI) / 24;
              return (
                <mesh
                  key={`${side}-${i}`}
                  position={[
                    side * 0.72,
                    0.25 + Math.cos(t) * 0.72,
                    Math.sin(t) * 0.72,
                  ]}
                  rotation={[t, 0, 0]}
                >
                  <boxGeometry args={[0.08, 0.022, 0.025]} />
                  <meshStandardMaterial color="#5b645b" roughness={0.9} />
                </mesh>
              );
            }),
          )}
          <mesh position={[0, 0.79, -0.315]}>
            <boxGeometry args={[0.95, 0.13, 0.025]} />
            <meshStandardMaterial color="#394235" roughness={0.8} />
          </mesh>
          {[-0.3, 0, 0.3].map((x) => (
            <mesh key={x} position={[x, -0.39, 0.9]}>
              <boxGeometry args={[0.025, 0.016, 0.26]} />
              <meshStandardMaterial color="#7a8477" />
            </mesh>
          ))}
        </group>
      )}
      {mark && (
        <group position={mark.p}>
          <mesh>
            <sphereGeometry args={[mark.r, 24, 16]} />
            <meshBasicMaterial
              color="#b5ef65"
              transparent
              opacity={0.12}
              depthWrite={false}
            />
          </mesh>
          <Html position={[0, mark.r + 0.12, 0]} center zIndexRange={[8, 0]}>
            <span className="component-label">
              0{highlight + 1} · {mark.name}
            </span>
          </Html>
        </group>
      )}
    </group>
  );
}
