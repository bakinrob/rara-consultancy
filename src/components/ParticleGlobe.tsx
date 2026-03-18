import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HelixRibbon({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const strand1Ref = useRef<THREE.Points>(null);
  const strand2Ref = useRef<THREE.Points>(null);
  const connectorsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);

  const STRAND_COUNT = 1200;
  const CONNECTOR_COUNT = 200;
  const GLOW_COUNT = 600;

  const strand1Positions = useMemo(() => {
    const pos = new Float32Array(STRAND_COUNT * 3);
    for (let i = 0; i < STRAND_COUNT; i++) {
      const t = (i / STRAND_COUNT) * Math.PI * 6;
      const y = (i / STRAND_COUNT) * 6 - 3;
      pos[i * 3] = Math.cos(t) * 0.8;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(t) * 0.8;
    }
    return pos;
  }, []);

  const strand2Positions = useMemo(() => {
    const pos = new Float32Array(STRAND_COUNT * 3);
    for (let i = 0; i < STRAND_COUNT; i++) {
      const t = (i / STRAND_COUNT) * Math.PI * 6 + Math.PI;
      const y = (i / STRAND_COUNT) * 6 - 3;
      pos[i * 3] = Math.cos(t) * 0.8;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(t) * 0.8;
    }
    return pos;
  }, []);

  const connectorPositions = useMemo(() => {
    const pos = new Float32Array(CONNECTOR_COUNT * 3);
    for (let i = 0; i < CONNECTOR_COUNT; i++) {
      const t = (i / CONNECTOR_COUNT) * Math.PI * 6;
      const y = (i / CONNECTOR_COUNT) * 6 - 3;
      const lerp = (i % 2 === 0) ? 0.3 : 0.7;
      const angle1 = t;
      const angle2 = t + Math.PI;
      pos[i * 3] = Math.cos(angle1) * 0.8 * (1 - lerp) + Math.cos(angle2) * 0.8 * lerp;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle1) * 0.8 * (1 - lerp) + Math.sin(angle2) * 0.8 * lerp;
    }
    return pos;
  }, []);

  const glowPositions = useMemo(() => {
    const pos = new Float32Array(GLOW_COUNT * 3);
    for (let i = 0; i < GLOW_COUNT; i++) {
      const t = (i / GLOW_COUNT) * Math.PI * 6;
      const y = (i / GLOW_COUNT) * 6 - 3;
      const radius = 1.2 + Math.sin(i * 0.4) * 0.3;
      pos[i * 3] = Math.cos(t * 0.7) * radius;
      pos[i * 3 + 1] = y + Math.sin(i * 0.2) * 0.15;
      pos[i * 3 + 2] = Math.sin(t * 0.7) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.15 + mx * 0.3;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.1 + my * 0.15;
      groupRef.current.rotation.z = Math.sin(elapsed * 0.2) * 0.05;
    }

    // Animate strand positions for breathing effect
    if (strand1Ref.current) {
      const geo = strand1Ref.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < STRAND_COUNT; i++) {
        const t = (i / STRAND_COUNT) * Math.PI * 6;
        const y = (i / STRAND_COUNT) * 6 - 3;
        const breathe = 0.8 + Math.sin(elapsed * 1.5 + y * 0.8) * 0.12;
        posAttr.setXYZ(
          i,
          Math.cos(t + elapsed * 0.3) * breathe,
          y,
          Math.sin(t + elapsed * 0.3) * breathe
        );
      }
      posAttr.needsUpdate = true;
    }

    if (strand2Ref.current) {
      const geo = strand2Ref.current.geometry;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < STRAND_COUNT; i++) {
        const t = (i / STRAND_COUNT) * Math.PI * 6 + Math.PI;
        const y = (i / STRAND_COUNT) * 6 - 3;
        const breathe = 0.8 + Math.sin(elapsed * 1.5 + y * 0.8) * 0.12;
        posAttr.setXYZ(
          i,
          Math.cos(t + elapsed * 0.3) * breathe,
          y,
          Math.sin(t + elapsed * 0.3) * breathe
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={strand1Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={STRAND_COUNT} array={strand1Positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#2563eb"
          size={0.035}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={strand2Ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={STRAND_COUNT} array={strand2Positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#38bdf8"
          size={0.035}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={connectorsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={CONNECTOR_COUNT} array={connectorPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#7dd3fc"
          size={0.022}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={GLOW_COUNT} array={glowPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          color="#bae6fd"
          size={0.015}
          transparent
          opacity={0.2}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
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
        camera={{ position: [0, 0, 5.8] as [number, number, number], fov: 42 }}
        dpr={[1, 1.6]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[2.4, 2.8, 3.1]} intensity={12} color="#e0f2fe" />
        <pointLight position={[-2.6, -1.4, 2.4]} intensity={4.5} color="#2563eb" />
        <HelixRibbon mouse={mouse} />
      </Canvas>
    </div>
  );
}
