import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo } from "react";
import ModelDetails from "./model-details";

export type ModelKind = "run" | "chair" | "leg" | "arm";
function Rod({
  a,
  b,
  r = 0.045,
  color = "#858c89",
}: {
  a: [number, number, number];
  b: [number, number, number];
  r?: number;
  color?: string;
}) {
  const start = new THREE.Vector3(...a),
    end = new THREE.Vector3(...b),
    delta = end.clone().sub(start);
  const q = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    delta.clone().normalize(),
  );
  return (
    <mesh position={start.add(end).multiplyScalar(0.5)} quaternion={q}>
      <cylinderGeometry args={[r, r, delta.length(), 16]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
    </mesh>
  );
}
function Box({
  p,
  s,
  c,
}: {
  p: [number, number, number];
  s: [number, number, number];
  c: string;
}) {
  return (
    <RoundedBox
      position={p}
      args={s}
      radius={Math.min(...s) * 0.28}
      smoothness={4}
    >
      <meshStandardMaterial color={c} metalness={0.35} roughness={0.45} />
    </RoundedBox>
  );
}
function Socket({ color }: { color: string }) {
  return (
    <group position={[0, 1, 0]}>
      <mesh>
        <latheGeometry
          args={[
            [
              new THREE.Vector2(0.19, -0.35),
              new THREE.Vector2(0.2, -0.25),
              new THREE.Vector2(0.235, -0.06),
              new THREE.Vector2(0.275, 0.15),
              new THREE.Vector2(0.29, 0.35),
            ],
            64,
          ]}
        />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          color={color}
          metalness={0.45}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.29, 0.022, 12, 48]} />
        <meshStandardMaterial color="#343a36" />
      </mesh>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.19, 0.16, 0.09, 32]} />
        <meshStandardMaterial color="#aeb4b0" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
export function Product({
  kind,
  color,
  option,
}: {
  kind: ModelKind;
  color: string;
  option: boolean;
}) {
  const blade = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.07, 0.66);
    shape.bezierCurveTo(-0.12, 0.05, -0.63, -0.48, -0.46, -0.91);
    shape.bezierCurveTo(-0.31, -1.19, 0.12, -1.22, 0.58, -1.15);
    shape.lineTo(0.58, -1.04);
    shape.bezierCurveTo(0.2, -1.08, -0.19, -1.08, -0.27, -0.87);
    shape.bezierCurveTo(-0.4, -0.51, 0.12, 0.1, 0.1, 0.66);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
      steps: 1,
    });
  }, []);
  if (kind === "chair")
    return (
      <group position={[0, -0.45, 0]} rotation={[0, -0.3, 0]}>
        {[-1, 1].map((side) => (
          <group
            key={side}
            position={[side * 0.72, 0.25, 0]}
            rotation={[0, 0, side * (option ? 0.14 : 0)]}
          >
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.72, 0.055, 12, 64]} />
              <meshStandardMaterial color="#232723" roughness={0.9} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.62, 0.021, 8, 64]} />
              <meshStandardMaterial color={color} metalness={0.7} />
            </mesh>
            {Array.from({ length: 16 }, (_, i) => {
              const t = (i * Math.PI) / 8;
              return (
                <Rod
                  key={i}
                  a={[0, 0, 0]}
                  b={[0, Math.cos(t) * 0.66, Math.sin(t) * 0.66]}
                  r={0.009}
                />
              );
            })}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.075, 0.075, 0.16, 20]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        ))}
        <Box p={[0, 0.45, 0]} s={[1.1, 0.12, 0.85]} c="#262c29" />
        <Box p={[0, 0.95, -0.39]} s={[1.08, 0.93, 0.1]} c={color} />
        {[-0.51, 0.51].map((x) => (
          <group key={x}>
            <Rod a={[x, 0.44, -0.4]} b={[x, 1.43, -0.4]} color={color} />
            <Rod a={[x, 0.38, -0.4]} b={[x, -0.28, 0.75]} color={color} />
            <Rod a={[x, -0.28, 0.75]} b={[x, -0.43, 1.02]} />
            <Rod a={[x, 0.37, 0.42]} b={[x, -0.42, 0.51]} color={color} />
            <mesh position={[x, -0.43, 0.58]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.16, 0.04, 10, 32]} />
              <meshStandardMaterial color="#323833" />
            </mesh>
            {!option && (
              <Box p={[x, 0.83, 0.04]} s={[0.12, 0.09, 0.75]} c="#343b36" />
            )}
          </group>
        ))}
        <Box p={[0, -0.44, 0.9]} s={[0.9, 0.08, 0.3]} c="#414943" />
        <Rod a={[-0.6, 0.25, 0]} b={[0.6, 0.25, 0]} />
      </group>
    );
  if (kind === "arm")
    return (
      <group rotation={[0, 0, -0.12]}>
        <Socket color={color} />
        <Rod a={[0, 0.62, 0]} b={[0, 0.05, 0]} r={0.12} />
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#6b756e" metalness={0.8} />
        </mesh>
        <Box p={[0, -0.35, 0]} s={[0.34, 0.52, 0.21]} c={color} />
        {[0, 1, 2, 3].map((i) => (
          <group key={i}>
            <Rod
              a={[-0.13 + i * 0.09, -0.56, 0]}
              b={[-0.13 + i * 0.09, -0.82, option ? 0.14 : 0]}
              r={0.036}
            />
            <Rod
              a={[-0.13 + i * 0.09, -0.82, option ? 0.14 : 0]}
              b={[-0.13 + i * 0.09, option ? -0.88 : -1.04, option ? 0.3 : 0]}
              r={0.032}
            />
          </group>
        ))}
        <Rod a={[-0.15, -0.3, 0]} b={[-0.34, -0.5, 0.1]} r={0.047} />
        <Rod a={[-0.34, -0.5, 0.1]} b={[-0.3, -0.68, 0.19]} r={0.04} />
      </group>
    );
  return (
    <group rotation={[0, -0.45, 0]}>
      <Socket color={color} />
      {kind === "run" ? (
        <>
          <mesh geometry={blade} position={[0, -0.03, -0.09]}>
            <meshStandardMaterial
              color="#333a35"
              roughness={0.32}
              metalness={0.55}
            />
          </mesh>
          <Rod a={[0, 0.6, 0.13]} b={[0, 0.24, 0.13]} color={color} r={0.055} />
          {option && (
            <Box p={[0.38, -1.18, 0]} s={[0.48, 0.045, 0.23]} c={color} />
          )}
        </>
      ) : (
        <>
          <Rod a={[0, 0.62, 0]} b={[0, -0.72, 0]} r={0.075} />
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.17, 0.11, 0.91, 32]} />
            <meshStandardMaterial
              color={option ? color : "#c2c9c2"}
              metalness={0.4}
              roughness={0.35}
            />
          </mesh>
          <mesh position={[0, -0.85, 0.2]} scale={[0.22, 0.15, 0.46]}>
            <sphereGeometry args={[1, 32, 24]} />
            <meshStandardMaterial color="#333c35" roughness={0.55} />
          </mesh>
          <Box p={[0, -0.97, 0.2]} s={[0.39, 0.05, 0.73]} c={color} />
        </>
      )}
    </group>
  );
}
export default function ModelViewer({
  kind,
  color,
  option,
  auto = true,
  reset = 0,
  highlight = -1,
}: {
  kind: ModelKind;
  color: string;
  option: boolean;
  auto?: boolean;
  reset?: number;
  highlight?: number;
}) {
  return (
    <Canvas
      key={reset}
      camera={{ position: [3, 1.9, 4.7], fov: 36 }}
      dpr={[1, 1.5]}
      aria-label="Modelo tridimensional interativo"
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 5, 3]} intensity={3} />
      <directionalLight position={[-3, 2, -2]} color="#b5ef65" intensity={2} />
      <Suspense fallback={null}>
        <Product kind={kind} color={color} option={option} />
        <ModelDetails kind={kind} color={color} highlight={highlight} />
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.5}
          scale={8}
          blur={2.5}
          far={3}
        />
      </Suspense>
      <OrbitControls
        autoRotate={auto}
        autoRotateSpeed={1.1}
        enablePan={false}
        minDistance={2.5}
        maxDistance={8}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
