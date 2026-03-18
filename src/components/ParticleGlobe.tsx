import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const haloRef = useRef<THREE.Points>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  const corePositions = useMemo(() => {
    const positions = new Float32Array(2200 * 3);
    for (let i = 0; i < 2200; i++) {
      const radius = 1.15 + Math.sin(i * 0.33) * 0.14 + (i % 11) * 0.003;
      const angle = i * 0.16;
      const lift = Math.sin(i * 0.12) * 0.62;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = lift * 0.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  const haloPositions = useMemo(() => {
    const positions = new Float32Array(950 * 3);
    for (let i = 0; i < 950; i++) {
      const orbit = 1.85 + (i % 7) * 0.05;
      const angle = i * 0.27;
      positions[i * 3] = Math.cos(angle) * orbit;
      positions[i * 3 + 1] = Math.sin(angle * 1.8) * 0.9;
      positions[i * 3 + 2] = Math.sin(angle) * orbit;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const mouseX = mouse.current.x;
    const mouseY = mouse.current.y;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.18;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.6) * 0.16 + mouseY * 0.08;
      pointsRef.current.rotation.z += (mouseX * 0.22 - pointsRef.current.rotation.z) * 0.04;
      pointsRef.current.position.y = Math.sin(elapsed * 0.8) * 0.06;
    }

    if (haloRef.current) {
      haloRef.current.rotation.y = -elapsed * 0.12;
      haloRef.current.rotation.x = Math.cos(elapsed * 0.42) * 0.12;
      haloRef.current.rotation.z += (mouseX * 0.14 - haloRef.current.rotation.z) * 0.03;
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.y = elapsed * 0.28;
      ringGroupRef.current.rotation.x = Math.sin(elapsed * 0.32) * 0.18 + mouseY * 0.12;
      ringGroupRef.current.position.x += (mouseX * 0.18 - ringGroupRef.current.position.x) * 0.05;
      ringGroupRef.current.position.y += (mouseY * 0.16 - ringGroupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group>
      <group ref={ringGroupRef}>
        <mesh rotation={[0.9, 0.2, 0.1]}>
          <torusGeometry args={[1.78, 0.016, 32, 220]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[0.2, 1.1, 0.7]}>
          <torusGeometry args={[1.34, 0.02, 32, 220]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.48} />
        </mesh>
        <mesh rotation={[1.45, 0.4, 1.3]}>
          <torusGeometry args={[0.98, 0.018, 32, 220]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.22} />
        </mesh>
      </group>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={corePositions.length / 3} array={corePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#0f172a"
          size={0.028}
          transparent
          opacity={0.92}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={haloPositions.length / 3} array={haloPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#38bdf8"
          size={0.018}
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh scale={1.18}>
        <sphereGeometry args={[0.94, 48, 48]} />
        <meshBasicMaterial color="#dbeafe" transparent opacity={0.08} wireframe />
      </mesh>
    </group>
  );
}

export default function ParticleGlobe() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 1.6]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[2.4, 2.8, 3.1]} intensity={12} color="#e0f2fe" />
        <pointLight position={[-2.6, -1.4, 2.4]} intensity={4.5} color="#2563eb" />
        <ParticleField mouse={mouse} />
      </Canvas>
    </div>
  );
}
