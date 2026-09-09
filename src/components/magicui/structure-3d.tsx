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

// Generates vertices and edges for a Hexagonal Bipyramid (Aerospace Crystal)
function createBipyramid(radius: number): { vertices: Point3D[]; edges: [number, number][] } {
  const vertices: Point3D[] = [
    { x: 0, y: radius * 1.35, z: 0 },   // Top apex
    { x: 0, y: -radius * 1.35, z: 0 },  // Bottom apex
  ];
  const segments = 6;
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    vertices.push({
      x: Math.cos(angle) * radius,
      y: 0,
      z: Math.sin(angle) * radius,
    });
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < segments; i++) {
    const curr = i + 2;
    const next = ((i + 1) % segments) + 2;
    edges.push([curr, next]); // Equator ring
    edges.push([0, curr]);    // To top apex
    edges.push([1, curr]);    // To bottom apex
  }
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

    // Setup color palette: Black, White, and Crimson Red strictly
    const primaryWireColor = isDark
      ? "rgba(255, 255, 255, 0.16)"
      : "rgba(15, 23, 42, 0.14)";

    const accentWireColor = isDark
      ? "rgba(239, 68, 68, 0.50)"
      : "rgba(220, 38, 38, 0.45)";

    const primaryNodeColor = isDark
      ? "rgba(255, 255, 255, 0.55)"
      : "rgba(15, 23, 42, 0.50)";

    const accentNodeColor = isDark
      ? "rgba(239, 68, 68, 0.80)"
      : "rgba(220, 38, 38, 0.75)";

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

    // ══════════════════════════════════════════════════════════════
    // Polyhedra setup: Single Big One in center, all others on sides
    // ══════════════════════════════════════════════════════════════
    type PolyConfig = {
      isCenter?: boolean;
      side?: "left" | "right";
      relXFactor: number;
      baseY: number;
      z: number;
      radius: number;
      shape: "ico" | "oct" | "bipyramid";
      isAccent: boolean;
      rotSpeed: { x: number; y: number; z: number };
    };

    const polyConfigs: PolyConfig[] = [
      // 1. SINGLE BIG ONE IN THE EXACT CENTER
      {
        isCenter: true,
        relXFactor: 0,
        baseY: 0,
        z: -30,
        radius: 155,
        shape: "ico",
        isAccent: false,
        rotSpeed: { x: 0.0025, y: 0.004, z: 0.0015 },
      },

      // 2. LEFT FLANK (Strictly in the left margins of the screen, clear of text)
      { side: "left", relXFactor: 0.43, baseY: -380, z: -80, radius: 52, shape: "oct", isAccent: false, rotSpeed: { x: 0.004, y: -0.003, z: 0.002 } },
      { side: "left", relXFactor: 0.38, baseY: -270, z: -140, radius: 70, shape: "ico", isAccent: true, rotSpeed: { x: -0.003, y: 0.005, z: -0.002 } },
      { side: "left", relXFactor: 0.46, baseY: -160, z: -50, radius: 46, shape: "bipyramid", isAccent: false, rotSpeed: { x: 0.005, y: 0.003, z: 0.001 } },
      { side: "left", relXFactor: 0.39, baseY: -40, z: -110, radius: 64, shape: "oct", isAccent: true, rotSpeed: { x: -0.004, y: -0.004, z: 0.003 } },
      { side: "left", relXFactor: 0.45, baseY: 80, z: -70, radius: 50, shape: "ico", isAccent: false, rotSpeed: { x: 0.003, y: 0.004, z: -0.003 } },
      { side: "left", relXFactor: 0.37, baseY: 200, z: -150, radius: 68, shape: "bipyramid", isAccent: true, rotSpeed: { x: 0.004, y: -0.005, z: 0.002 } },
      { side: "left", relXFactor: 0.47, baseY: 320, z: -90, radius: 48, shape: "oct", isAccent: false, rotSpeed: { x: -0.003, y: 0.003, z: -0.002 } },
      { side: "left", relXFactor: 0.40, baseY: 430, z: -180, radius: 60, shape: "ico", isAccent: false, rotSpeed: { x: 0.004, y: 0.003, z: 0.003 } },

      // 3. RIGHT FLANK (Strictly in the right margins of the screen, clear of text)
      { side: "right", relXFactor: 0.42, baseY: -360, z: -120, radius: 62, shape: "bipyramid", isAccent: true, rotSpeed: { x: -0.004, y: 0.004, z: -0.003 } },
      { side: "right", relXFactor: 0.46, baseY: -250, z: -60, radius: 50, shape: "oct", isAccent: false, rotSpeed: { x: 0.003, y: -0.004, z: 0.002 } },
      { side: "right", relXFactor: 0.38, baseY: -130, z: -160, radius: 72, shape: "ico", isAccent: false, rotSpeed: { x: 0.004, y: 0.005, z: -0.001 } },
      { side: "right", relXFactor: 0.45, baseY: -10, z: -90, radius: 54, shape: "oct", isAccent: true, rotSpeed: { x: -0.003, y: 0.003, z: 0.004 } },
      { side: "right", relXFactor: 0.38, baseY: 120, z: -130, radius: 66, shape: "bipyramid", isAccent: false, rotSpeed: { x: 0.005, y: -0.004, z: -0.002 } },
      { side: "right", relXFactor: 0.46, baseY: 230, z: -70, radius: 48, shape: "ico", isAccent: true, rotSpeed: { x: -0.004, y: 0.004, z: 0.003 } },
      { side: "right", relXFactor: 0.39, baseY: 340, z: -170, radius: 70, shape: "oct", isAccent: false, rotSpeed: { x: 0.003, y: -0.003, z: 0.001 } },
      { side: "right", relXFactor: 0.44, baseY: 450, z: -100, radius: 52, shape: "bipyramid", isAccent: false, rotSpeed: { x: -0.003, y: 0.004, z: -0.002 } },
    ];

    const polyhedra = polyConfigs.map((cfg) => {
      let geo: { vertices: Point3D[]; edges: [number, number][] };
      if (cfg.shape === "ico") geo = createIcosahedron(cfg.radius);
      else if (cfg.shape === "bipyramid") geo = createBipyramid(cfg.radius);
      else geo = createOctahedron(cfg.radius);

      return {
        isCenter: cfg.isCenter,
        side: cfg.side,
        relXFactor: cfg.relXFactor,
        baseY: cfg.baseY,
        z: cfg.z,
        position: { x: 0, y: cfg.baseY, z: cfg.z },
        rotation: { x: Math.random() * 3, y: Math.random() * 3, z: Math.random() * 2 },
        rotSpeed: cfg.rotSpeed,
        scale: 1,
        vertices: geo.vertices,
        edges: geo.edges,
        isAccent: cfg.isAccent,
      };
    });

    // Background lattice points: placed on left and right sides so text area is completely clear
    const latticePoints: Point3D[] = [];
    for (let i = 0; i < 40; i++) {
      const isLeft = i % 2 === 0;
      const sideX = isLeft
        ? -460 - Math.random() * 450
        : 460 + Math.random() * 450;
      latticePoints.push({
        x: sideX,
        y: (Math.random() - 0.5) * 1100,
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

      // Calculate responsive side bounds (safe clearance outside central text corridor)
      const sideDistance = Math.max(width * 0.38, 480);

      // Render 3D Polyhedra structures
      polyhedra.forEach((poly) => {
        if (poly.isCenter) {
          poly.position.x = 0;
          poly.position.y = 0;
        } else if (poly.side === "left") {
          poly.position.x = -sideDistance - (poly.relXFactor - 0.35) * width * 0.5;
          poly.position.y = poly.baseY;
        } else {
          poly.position.x = sideDistance + (poly.relXFactor - 0.35) * width * 0.5;
          poly.position.y = poly.baseY;
        }

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
