"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

interface Structure3DProps {
  className?: string;
}

// 3D Point definition
type Point3D = {
  x: number;
  y: number;
  z: number;
};

// 3D Mesh Object definition
type Polyhedron = {
  position: Point3D;
  rotation: { x: number; y: number; z: number };
  rotSpeed: { x: number; y: number; z: number };
  scale: number;
  vertices: Point3D[];
  edges: [number, number][];
  isAccent?: boolean; // Accent shapes use red highlights
};

// Generates vertices and edges for a regular 3D Icosahedron
function createIcosahedron(radius: number): { vertices: Point3D[]; edges: [number, number][] } {
  const t = (1.0 + Math.sqrt(5.0)) / 2.0; // Golden ratio

  const rawVertices: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];

  const vertices: Point3D[] = rawVertices.map(([x, y, z]) => {
    const len = Math.sqrt(x * x + y * y + z * z);
    return {
      x: (x / len) * radius,
      y: (y / len) * radius,
      z: (z / len) * radius,
    };
  });

  const edges: [number, number][] = [
    [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
    [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
    [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
    [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
    [5, 4], [4, 11], [11, 2], [2, 10], [10, 6],
    [6, 7], [7, 8], [8, 1], [1, 9], [9, 5],
  ];

  return { vertices, edges };
}

// Generates vertices and edges for an Octahedron
function createOctahedron(radius: number): { vertices: Point3D[]; edges: [number, number][] } {
  const vertices: Point3D[] = [
    { x: radius, y: 0, z: 0 },
    { x: -radius, y: 0, z: 0 },
    { x: 0, y: radius, z: 0 },
    { x: 0, y: -radius, z: 0 },
    { x: 0, y: 0, z: radius },
    { x: 0, y: 0, z: -radius },
  ];

  const edges: [number, number][] = [
    [0, 2], [2, 1], [1, 3], [3, 0],
    [0, 4], [2, 4], [1, 4], [3, 4],
    [0, 5], [2, 5], [1, 5], [3, 5],
  ];

  return { vertices, edges };
}

export function Structure3D({ className = "" }: Structure3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const isDark = resolvedTheme !== "light";

    // Setup color palette: Black, White, and Crimson Red strictly (subtle background depth)
    const primaryWireColor = isDark
      ? "rgba(255, 255, 255, 0.14)"
      : "rgba(15, 23, 42, 0.12)";

    const accentWireColor = isDark
      ? "rgba(239, 68, 68, 0.40)"
      : "rgba(220, 38, 38, 0.35)";

    const primaryNodeColor = isDark
      ? "rgba(255, 255, 255, 0.40)"
      : "rgba(15, 23, 42, 0.35)";

    const accentNodeColor = isDark
      ? "rgba(239, 68, 68, 0.60)"
      : "rgba(220, 38, 38, 0.55)";

    // Resize canvas
    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      width = containerRef.current.offsetWidth;
      height = containerRef.current.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create 3D Polyhedra structures
    const polyhedra: Polyhedron[] = [];

    // Central prominent structural Icosahedron
    const centerIco = createIcosahedron(115);
    polyhedra.push({
      position: { x: 0, y: -20, z: 0 },
      rotation: { x: 0.2, y: 0.4, z: 0 },
      rotSpeed: { x: 0.003, y: 0.005, z: 0.002 },
      scale: 1,
      vertices: centerIco.vertices,
      edges: centerIco.edges,
      isAccent: false,
    });

    // Medium background accent Icosahedron with red highlights
    const rightIco = createIcosahedron(68);
    polyhedra.push({
      position: { x: 330, y: -130, z: -90 },
      rotation: { x: 0.8, y: 0.2, z: 0.5 },
      rotSpeed: { x: -0.004, y: 0.006, z: -0.003 },
      scale: 1,
      vertices: rightIco.vertices,
      edges: rightIco.edges,
      isAccent: true,
    });

    // Left secondary Octahedron
    const leftOct = createOctahedron(80);
    polyhedra.push({
      position: { x: -310, y: 150, z: -70 },
      rotation: { x: 0.4, y: 0.6, z: 0.1 },
      rotSpeed: { x: 0.0035, y: -0.004, z: 0.0025 },
      scale: 1,
      vertices: leftOct.vertices,
      edges: leftOct.edges,
      isAccent: false,
    });

    // Smaller floating polyhedrons
    const miniPositions = [
      { x: -230, y: -230, z: -170, isAccent: true },
      { x: 270, y: 230, z: -140, isAccent: false },
      { x: -150, y: 290, z: -210, isAccent: false },
      { x: 390, y: -50, z: -240, isAccent: true },
    ];

    miniPositions.forEach((p) => {
      const mini = createOctahedron(44);
      polyhedra.push({
        position: { x: p.x, y: p.y, z: p.z },
        rotation: { x: Math.random() * 3, y: Math.random() * 3, z: 0 },
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        },
        scale: 1,
        vertices: mini.vertices,
        edges: mini.edges,
        isAccent: p.isAccent,
      });
    });

    // Lattice background stars
    const latticePoints: Point3D[] = [];
    for (let i = 0; i < 45; i++) {
      latticePoints.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 900,
        z: -100 - Math.random() * 300,
      });
    }

    const focalLength = 480;

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Fast, responsive mouse tracking (0.15 lerp for immediate fluidity)
      mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * 0.15;
      mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * 0.15;

      const centerX = width / 2;
      const centerY = height / 2;

      // Dynamic parallax tilt
      const tiltX = mousePos.current.y * 0.55;
      const tiltY = mousePos.current.x * 0.55;

      // Draw faint 3D background lattice nodes
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(15, 23, 42, 0.3)";
      latticePoints.forEach((pt) => {
        const pz = pt.z;
        const scale = focalLength / (focalLength - pz);
        const px = centerX + (pt.x + tiltY * 55) * scale;
        const py = centerY + (pt.y + tiltX * 55) * scale;
        if (px > 0 && px < width && py > 0 && py < height) {
          ctx.beginPath();
          ctx.arc(px, py, 1.2 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render 3D Polyhedra structures
      polyhedra.forEach((poly) => {
        poly.rotation.x += poly.rotSpeed.x;
        poly.rotation.y += poly.rotSpeed.y;
        poly.rotation.z += poly.rotSpeed.z;

        const cosX = Math.cos(poly.rotation.x + tiltX);
        const sinX = Math.sin(poly.rotation.x + tiltX);
        const cosY = Math.cos(poly.rotation.y + tiltY);
        const sinY = Math.sin(poly.rotation.y + tiltY);
        const cosZ = Math.cos(poly.rotation.z);
        const sinZ = Math.sin(poly.rotation.z);

        const projected2D = poly.vertices.map((v) => {
          let x1 = v.x * cosY + v.z * sinY;
          let y1 = v.y;
          let z1 = -v.x * sinY + v.z * cosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          const worldX = x3 + poly.position.x + tiltY * 70;
          const worldY = y3 + poly.position.y + tiltX * 70;
          const worldZ = z3 + poly.position.z;

          const depth = focalLength / (focalLength - worldZ);
          return {
            x: centerX + worldX * depth,
            y: centerY + worldY * depth,
            z: worldZ,
            scale: depth,
          };
        });

        // Wireframe Edges
        ctx.strokeStyle = poly.isAccent ? accentWireColor : primaryWireColor;
        ctx.lineWidth = poly.isAccent ? 1.5 : 1.1;

        poly.edges.forEach(([i1, i2]) => {
          const p1 = projected2D[i1];
          const p2 = projected2D[i2];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Vertex Nodes
        projected2D.forEach((p) => {
          ctx.fillStyle = poly.isAccent ? accentNodeColor : primaryNodeColor;
          ctx.beginPath();
          const nodeSize = (poly.isAccent ? 2.5 : 2.0) * p.scale;
          ctx.arc(p.x, p.y, Math.max(nodeSize, 1.2), 0, Math.PI * 2);
          ctx.fill();
        });
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
