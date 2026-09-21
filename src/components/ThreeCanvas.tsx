import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // --- 1. Central Holographic Icosahedron Sphere ---
    const sphereGeo = new THREE.IcosahedronGeometry(22, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // Inner Core Sphere
    const innerGeo = new THREE.SphereGeometry(14, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer Glow Ring (Torus)
    const torusGeo = new THREE.TorusGeometry(32, 0.4, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.45,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    const torus2Geo = new THREE.TorusGeometry(36, 0.3, 16, 100);
    const torus2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.35,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.x = -Math.PI / 4;
    torus2.rotation.y = Math.PI / 6;
    scene.add(torus2);

    // --- 2. Floating Cyber Data Nodes ---
    const nodesGroup = new THREE.Group();
    const nodeCount = 18;
    const nodeGeos = [
      new THREE.OctahedronGeometry(1.5),
      new THREE.TetrahedronGeometry(1.4),
      new THREE.BoxGeometry(1.8, 1.8, 1.8),
    ];
    const nodeColors = [0x14b8a6, 0x06b6d4, 0x3b82f6, 0xa855f7, 0x10b981];

    const nodesList: { mesh: THREE.Mesh; speedX: number; speedY: number; speedZ: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const geo = nodeGeos[i % nodeGeos.length];
      const mat = new THREE.MeshBasicMaterial({
        color: nodeColors[i % nodeColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const radius = 38 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);

      nodesGroup.add(mesh);
      nodesList.push({
        mesh,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
      });
    }
    scene.add(nodesGroup);

    // --- 3. Starfield & Particle Vortex ---
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cTeal = new THREE.Color(0x14b8a6);
    const cCyan = new THREE.Color(0x06b6d4);
    const cPurple = new THREE.Color(0xa855f7);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      // Swirling distribution
      const r = 15 + Math.random() * 120;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 140;

      particlePositions[i * 3] = Math.cos(angle) * r;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * r;

      const choice = Math.random();
      const col = choice < 0.4 ? cTeal : choice < 0.7 ? cCyan : choice < 0.9 ? cPurple : cWhite;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- 4. Interactive Mouse Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.03;
      mouseY = (event.clientY - windowHalfY) * 0.03;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Interactive Click Burst
    const handleClick = () => {
      sphereMesh.scale.set(1.15, 1.15, 1.15);
      setTimeout(() => {
        sphereMesh.scale.set(1, 1, 1);
      }, 300);
    };

    container.addEventListener('click', handleClick);

    // --- 5. Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- 6. Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.4;
      camera.position.y = -targetY * 0.4;
      camera.lookAt(0, 0, 0);

      // Central Sphere Rotation
      sphereMesh.rotation.y = elapsedTime * 0.15;
      sphereMesh.rotation.x = elapsedTime * 0.08;

      innerMesh.rotation.y = -elapsedTime * 0.2;
      innerMesh.rotation.z = elapsedTime * 0.12;

      // Torus Rotations
      torus.rotation.z = elapsedTime * 0.25;
      torus2.rotation.z = -elapsedTime * 0.2;

      // Floating nodes orbit
      nodesGroup.rotation.y = elapsedTime * 0.08;
      nodesList.forEach((item) => {
        item.mesh.rotation.x += item.speedX;
        item.mesh.rotation.y += item.speedY;
        item.mesh.rotation.z += item.speedZ;
      });

      // Particles rotation
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torus2Geo.dispose();
      torus2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      nodeGeos.forEach((g) => g.dispose());
    };
  }, [interactive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div ref={mountRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
      {/* Radial overlay for seamless background blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
    </div>
  );
};
