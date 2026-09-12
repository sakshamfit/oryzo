'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 650;

function DriftParticles() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const { positions, seeds, scales } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const scales = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i += 1) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      seeds[i] = Math.random();
      scales[i] = 0.4 + Math.random() * 1.2;
    }
    return { positions, seeds, scales };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 26 },
      uColor: { value: new THREE.Color('#bfa875') },
    }),
    [],
  );

  useFrame((_state, delta) => {
    const uTime = materialRef.current?.uniforms.uTime;
    if (uTime) uTime.value += Math.min(delta, 0.05);
  });

  const vertex = /* glsl */ `
    attribute float aSeed;
    attribute float aScale;
    uniform float uTime;
    uniform float uSize;
    varying float vAlpha;

    void main() {
      vec3 p = position;
      p.y += sin(uTime * 0.06 + aSeed * 6.2831) * 0.6;
      p.x += cos(uTime * 0.05 + aSeed * 12.566) * 0.5;

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aScale * uSize * (1.0 / max(0.1, -mv.z));

      // Depth fog: particles dissolve with distance, both near and far.
      vAlpha = smoothstep(9.0, 2.0, -mv.z) * (0.25 + aSeed * 0.5);
    }
  `;

  const fragment = /* glsl */ `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      vec2 uv = gl_PointCoord - vec2(0.5);
      float d = length(uv);
      float disc = smoothstep(0.5, 0.06, d);
      if (disc < 0.01) discard;
      gl_FragColor = vec4(uColor, disc * vAlpha * 0.6);
    }
  `;

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Subtle atmospheric dust for the large dark CTA. Adds depth without stealing
 * focus. Lazy-mounted by consumers and frozen off-screen.
 */
export function Atmosphere({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting);
      },
      { rootMargin: '20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className={className}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        frameloop={visible ? 'always' : 'never'}
        style={{ pointerEvents: 'none' }}
      >
        <DriftParticles />
      </Canvas>
    </div>
  );
}

export default Atmosphere;
