import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ConstellationLines({ positions, count }: { positions: Float32Array; count: number }) {
  const lineRef = useRef<THREE.LineSegments>(null!);
  const threshold = 0.6;

  const lineGeometry = useMemo(() => {
    const pairs: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold && pairs.length < 600) {
          pairs.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pairs, 3));
    return geo;
  }, [positions, count]);

  return (
    <lineSegments ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#3B82F6" transparent opacity={0.12} />
    </lineSegments>
  );
}

function Particles({ count = 2500, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + (Math.random() - 0.5) * 0.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.05;
    mesh.current.rotation.x = Math.sin(t * 0.03) * 0.1;

    // Breathing effect
    const breathe = 1 + Math.sin(t * 1.5) * 0.15;
    if (materialRef.current) {
      materialRef.current.size = 0.02 * breathe;
      materialRef.current.opacity = 0.6 + Math.sin(t * 1.5) * 0.2;
    }

    // Mouse influence
    const targetX = mouse.current.y * 0.3;
    const targetY = mouse.current.x * 0.3;
    mesh.current.rotation.x += (targetX - mesh.current.rotation.x) * 0.02;
    mesh.current.rotation.z += (targetY - mesh.current.rotation.z) * 0.02;
  });

  return (
    <group>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.02}
          color="#3B82F6"
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <ConstellationLines positions={positions} count={count} />
    </group>
  );
}

export default function ParticleGlobe() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 6] as [number, number, number], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  );
}
