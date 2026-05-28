"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper to generate a glowing radial gradient texture procedurally (so it works offline)
function createGlowTexture(colorStr: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, colorStr);
    gradient.addColorStop(0.2, colorStr);
    gradient.addColorStop(0.5, "rgba(0, 188, 212, 0.1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 1. StarField Component with custom twinkling
function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 10000;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Generate within a sphere
    const r = 400 + Math.random() * 800;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    sizes[i] = Math.random() * 2.5 + 0.5;
    randoms[i] = Math.random();
  }

  useFrame((state) => {
    if (pointsRef.current) {
      // Twinkle: rotate slightly and update uniform/time
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.getElapsedTime();
      }
    }
  });

  // Custom Twinkling Shader Material
  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#e8f4fd") },
    },
    vertexShader: `
      attribute float size;
      attribute float random;
      varying float vRandom;
      uniform float uTime;
      void main() {
        vRandom = random;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vRandom;
      uniform float uTime;
      uniform vec3 uColor;
      void main() {
        // Twinkle flicker calculation
        float alpha = 0.3 + 0.7 * sin(uTime * 3.0 + vRandom * 100.0);
        
        // Circular point shape
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        if (dist > 0.5) discard;
        
        float strength = 1.0 - (dist * 2.0);
        gl_FragColor = vec4(uColor, strength * alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  };

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-random"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  );
}

// 2. Milky Way Flat Tilted Band
function MilkyWayBand() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 4000;
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Generate inside a flat ellipse
    const radius = 200 + Math.random() * 600;
    const angle = Math.random() * Math.PI * 2;
    const spreadY = (Math.random() - 0.5) * 50;
    const spreadX = (Math.random() - 0.5) * 100;

    positions[i * 3] = Math.cos(angle) * radius + spreadX;
    positions[i * 3 + 1] = spreadY;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    randoms[i] = Math.random();
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * -0.002;
    }
  });

  return (
    <points ref={pointsRef} rotation={[0.5, 0, 0.5]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color="#BB86FC"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 3. Nebula Cloud Billboard Sprites
function NebulaClouds() {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useRef<THREE.Texture[]>([]);

  useEffect(() => {
    textures.current = [
      createGlowTexture("rgba(0, 188, 212, 0.4)"), // cyan
      createGlowTexture("rgba(187, 134, 252, 0.4)"), // purple
      createGlowTexture("rgba(253, 214, 99, 0.3)"), // gold
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        child.rotation.z = state.clock.getElapsedTime() * 0.02 * (index % 2 === 0 ? 1 : -1);
      });
    }
  });

  const positions: [number, number, number][] = [
    [-150, 50, -400],
    [150, -100, -350],
    [-80, -120, -500],
    [100, 150, -450],
  ];

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => {
        const tex = textures.current[i % textures.current.length] || null;
        if (!tex) return null;
        return (
          <sprite key={i} position={pos} scale={[250, 250, 1]}>
            <spriteMaterial
              map={tex}
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        );
      })}
    </group>
  );
}

// 4. Holographic Earth (Section 2 - About Me Background)
function HolographicEarth() {
  const earthGroupRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.LineLoop>(null);

  useFrame((state) => {
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
    if (gridRef.current) {
      gridRef.current.rotation.x = state.clock.getElapsedTime() * -0.01;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  // Orbital ring points
  const ringPoints = [];
  const segments = 64;
  const radius = 6.5;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
  }
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);

  return (
    <group ref={earthGroupRef} position={[8, -8, -12]} rotation={[0.4, 0, 0.4]}>
      {/* Glow aura */}
      <mesh>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial
          color="#00BCD4"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main holographic sphere grid */}
      <mesh ref={gridRef}>
        <sphereGeometry args={[4.0, 24, 24]} />
        <meshBasicMaterial
          color="#00BCD4"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary inner sphere for depth */}
      <mesh>
        <sphereGeometry args={[3.8, 16, 16]} />
        <meshBasicMaterial
          color="#BB86FC"
          wireframe
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowing Earth Orbit Ring */}
      <lineLoop ref={orbitRef} geometry={orbitGeometry}>
        <lineBasicMaterial color="#00BCD4" transparent opacity={0.3} />
      </lineLoop>
    </group>
  );
}

// 5. Space Station (Section 6 - Contact Background)
function SpaceStation() {
  const stationRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (stationRef.current) {
      stationRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      stationRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={stationRef} position={[-8, -32, -15]} rotation={[0.2, 0.4, 0.1]}>
      {/* Central Cylinder core */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 4, 16]} />
        <meshBasicMaterial color="#00BCD4" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Tonal Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 8, 32]} />
        <meshBasicMaterial color="#BB86FC" transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.05, 8, 32]} />
        <meshBasicMaterial color="#00BCD4" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.05, 8, 32]} />
        <meshBasicMaterial color="#00BCD4" transparent opacity={0.2} />
      </mesh>

      {/* Solar Panel Crossbars */}
      <group position={[0, 0, 0]}>
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[3, 0.02, 0.8]} />
          <meshBasicMaterial color="#00BCD4" wireframe transparent opacity={0.15} />
        </mesh>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[3, 0.02, 0.8]} />
          <meshBasicMaterial color="#00BCD4" wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}

// Scene Camera & Parallax Management
function SceneController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Scroll camera warp effect
    const trigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate: (self) => {
        // Warp speed camera position mapping: moves z from 80 to 22, moves y down sections
        const progress = self.progress;
        
        // Z moves forward "warping" through space, Y moves downward along with scrolling
        camera.position.z = 80 - progress * 55;
        camera.position.y = -progress * 35;
      },
    });

    // Mouse Parallax listener
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 4;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      trigger.kill();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [camera]);

  useFrame(() => {
    // Add mouse parallax interpolation
    camera.position.x += (mouse.current.x - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y - camera.position.y - camera.position.y) * 0.01;
  });

  return null;
}

export default function CosmicCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-screen h-screen overflow-hidden bg-md-background">
      <Canvas
        camera={{ position: [0, 0, 80], fov: 60, near: 0.1, far: 2000 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[20, 20, 20]} intensity={0.8} />

        <StarField />
        <MilkyWayBand />
        <NebulaClouds />
        <HolographicEarth />
        <SpaceStation />

        <SceneController />
      </Canvas>
    </div>
  );
}
