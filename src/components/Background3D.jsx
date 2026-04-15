import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/* ── Floating Torus ─────────────────────────────────────── */
function FloatingTorus({ position, rotation, color, speed = 1, scale = 1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.rotation.x = rotation[0] + t * 0.3;
    mesh.current.rotation.y = rotation[1] + t * 0.2;
    mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.4;
  });
  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]} scale={scale}>
      <torusGeometry args={[1, 0.35, 20, 60]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

/* ── Floating Icosahedron ───────────────────────────────── */
function FloatingIcosahedron({ position, color, speed = 1, scale = 1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.rotation.x = t * 0.25;
    mesh.current.rotation.y = t * 0.35;
    mesh.current.position.y = position[1] + Math.sin(t * 0.4 + 1) * 0.5;
  });
  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.22}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/* ── Floating Octahedron ────────────────────────────────── */
function FloatingOctahedron({ position, color, speed = 1, scale = 1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.rotation.x = t * 0.4;
    mesh.current.rotation.z = t * 0.2;
    mesh.current.position.y = position[1] + Math.sin(t * 0.6 + 2) * 0.3;
  });
  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.2}
        emissive={color}
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}

/* ── Floating Sphere (wireframe) ────────────────────────── */
function FloatingSphere({ position, color, speed = 1, scale = 1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.rotation.y = t * 0.3;
    mesh.current.position.y = position[1] + Math.sin(t * 0.45 + 3) * 0.6;
  });
  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]} scale={scale}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ── Floating Tetrahedron ───────────────────────────────── */
function FloatingTetrahedron({ position, color, speed = 1, scale = 1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t * 0.3;
    mesh.current.position.y = position[1] + Math.sin(t * 0.55 + 5) * 0.4;
  });
  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]} scale={scale}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
        emissive={color}
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}

/* ── Soft Glow Orb ──────────────────────────────────────── */
function GlowOrb({ position, color, scale = 1 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * 0.3) * 0.8;
    const s = scale + Math.sin(t * 0.7) * 0.06;
    mesh.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={mesh} position={[position[0], position[1], position[2]]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.055}
        emissive={color}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

/* ── Particle Field ─────────────────────────────────────── */
function Particles({ count = 140 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    points.current.rotation.y = t * 0.012;
    points.current.rotation.x = t * 0.007;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#00d4ff"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Full Scene ─────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]}  color="#00d4ff" intensity={2} />
      <pointLight position={[-10, -8, -5]} color="#7c3aed" intensity={1.5} />
      <pointLight position={[0, 5, -10]}   color="#3b82f6" intensity={1} />

      <Particles count={150} />

      {/* Glow orbs */}
      <GlowOrb position={[-8,  2, -5]} color="#00d4ff" scale={3.5} />
      <GlowOrb position={[ 9, -3, -8]} color="#7c3aed" scale={4}   />
      <GlowOrb position={[ 2,  4,-12]} color="#3b82f6" scale={3}   />

      {/* Left cluster */}
      <FloatingTorus       position={[-7,  1, -4]} rotation={[0.5, 0.3, 0]} color="#00d4ff" speed={0.7}  scale={1.6} />
      <FloatingIcosahedron position={[-9, -2.5,-6]}                          color="#7c3aed" speed={0.55} scale={1.2} />
      <FloatingTetrahedron position={[-5,  3.5,-3]}                          color="#00d4ff" speed={0.9}  scale={0.9} />

      {/* Right cluster */}
      <FloatingOctahedron  position={[ 8,  1.5,-5]}                          color="#a855f7" speed={0.65} scale={1.4} />
      <FloatingTorus       position={[ 6, -2,  -7]} rotation={[1, 0.5, 0.3]} color="#3b82f6" speed={0.8}  scale={1.1} />
      <FloatingSphere      position={[10,  3,  -3]}                           color="#7c3aed" speed={0.5}  scale={1.3} />

      {/* Top / bottom accents */}
      <FloatingIcosahedron position={[ 2,  5.5,-6]}                          color="#00d4ff" speed={0.45} scale={0.8} />
      <FloatingOctahedron  position={[-2, -4.5,-5]}                          color="#3b82f6" speed={0.75} scale={0.9} />
      <FloatingTetrahedron position={[ 4, -4,  -3]}                          color="#a855f7" speed={1.0}  scale={0.7} />

      {/* Deep-layer large objects */}
      <FloatingTorus       position={[-1,  0, -10]} rotation={[0.8, 0, 0.5]} color="#7c3aed" speed={0.35} scale={2.5} />
      <FloatingSphere      position={[ 1, -1, -14]}                           color="#00d4ff" speed={0.3}  scale={2}   />
    </>
  );
}

/* ── Exported Canvas ────────────────────────────────────── */
export default function Background3D() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
