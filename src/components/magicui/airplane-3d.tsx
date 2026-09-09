"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

interface Airplane3DProps {
  className?: string;
}

type Point3D = {
  x: number;
  y: number;
  z: number;
};

// Generates a detailed 3D airplane model with fuselage, cockpit, swept wings, and tail fin
function getAirplaneGeometry(scale: number = 1.0) {
  const s = scale;
  const vertices: Point3D[] = [
    // 0: Nose tip (front)
    { x: 0, y: 0, z: 42 * s },
    // 1: Cockpit canopy top
    { x: 0, y: 11 * s, z: 14 * s },
    // 2: Cockpit windshield front
    { x: 0, y: 6 * s, z: 26 * s },
    // 3: Fuselage belly bottom
    { x: 0, y: -7 * s, z: 8 * s },
    // 4: Fuselage left side
    { x: -9 * s, y: 0, z: 8 * s },
    // 5: Fuselage right side
    { x: 9 * s, y: 0, z: 8 * s },
    // 6: Tail fuselage end
    { x: 0, y: 2 * s, z: -36 * s },
    // 7: Vertical tail fin top (vertical stabilizer)
    { x: 0, y: 26 * s, z: -40 * s },
    // 8: Vertical tail fin leading edge
    { x: 0, y: 12 * s, z: -20 * s },
    // 9: Left swept wingtip (with beacon light)
    { x: -70 * s, y: 1 * s, z: -10 * s },
    // 10: Right swept wingtip (with beacon light)
    { x: 70 * s, y: 1 * s, z: -10 * s },
    // 11: Left wing root front
    { x: -12 * s, y: 0, z: 18 * s },
    // 12: Right wing root front
    { x: 12 * s, y: 0, z: 18 * s },
    // 13: Left horizontal stabilizer (tail wing)
    { x: -26 * s, y: 4 * s, z: -34 * s },
    // 14: Right horizontal stabilizer (tail wing)
    { x: 26 * s, y: 4 * s, z: -34 * s },
  ];

  const edges: [number, number][] = [
    // Nose to canopy & belly
    [0, 2], [2, 1], [0, 3], [0, 4], [0, 5],
    // Cockpit structure
    [2, 4], [2, 5], [1, 4], [1, 5], [3, 4], [3, 5],
    // Fuselage to tail
    [1, 8], [8, 6], [3, 6], [4, 6], [5, 6],
    // Vertical tail fin
    [8, 7], [7, 6],
    // Main swept wings
    [11, 9], [9, 6], [9, 4], [9, 1],
    [12, 10], [10, 6], [10, 5], [10, 1],
    [11, 12],
    // Horizontal stabilizers
    [6, 13], [8, 13],
    [6, 14], [8, 14],
  ];

  return { vertices, edges };
}

export function Airplane3D({ className = "" }: Airplane3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isDark = resolvedTheme !== "light";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Airplane state
    const plane = {
      x: width * 0.72,
      y: height * 0.3,
      targetX: width * 0.72,
      targetY: height * 0.3,
      vx: 0,
      vy: 0,
      yaw: 0,    // 0 = front view, bends to ±Math.PI * 0.45 for side view!
      pitch: 0,  // climb / dive
      roll: 0,   // banking
      fanAngle: 0,
      // Contrail lines from wingtips and engine exhaust
      leftTrail: [] as { x: number; y: number }[],
      rightTrail: [] as { x: number; y: number }[],
      exhaustTrail: [] as { x: number; y: number }[],
    };

    // Track mouse coordinates directly on screen with slight offset
    let lastUserMove = Date.now();
    let orbitAngle = 0;
    let isOrbiting = false;

    // Offsetting the plane by +34px to the right and +38px downward so the cursor tip and text are never blocked!
    const handleMouseMove = (e: MouseEvent) => {
      lastUserMove = Date.now();
      isOrbiting = false;
      plane.targetX = e.clientX + 34;
      plane.targetY = e.clientY + 38;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Reduced by 20% (from 1.15 down to 0.92) as requested
    const model = getAirplaneGeometry(0.92);

    // Strict color scheme: Black, White, and Crimson Red
    const wireColor = isDark
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(15, 23, 42, 0.95)";

    const accentRed = isDark ? "#ef4444" : "#dc2626";

    // 3D camera focal depth
    const focalLength = 420;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const idleTime = now - lastUserMove;

      // ═══════ Autonomous Patrol / Orbit Mode ("Round and Round the Website") ═══════
      // If left untouched for > 1.6s, the plane cruises along an elliptical path around the perimeter of the website
      if (idleTime > 1600) {
        const cx = width / 2;
        const cy = height / 2;
        const rx = Math.max(width * 0.44, 280);
        const ry = Math.max(height * 0.40, 200);

        if (!isOrbiting) {
          isOrbiting = true;
          // Synchronize orbit angle to current position relative to center
          orbitAngle = Math.atan2((plane.y - cy) / ry, (plane.x - cx) / rx);
        }

        // Advance orbit angle continuously (1 lap every ~15 seconds)
        orbitAngle += 0.014;

        // Elliptical flight path around perimeter of viewport
        const orbitTargetX = cx + Math.cos(orbitAngle) * rx;
        const orbitTargetY = cy + Math.sin(orbitAngle) * ry;

        // Smoothly steer target towards orbit
        plane.targetX += (orbitTargetX - plane.targetX) * 0.08;
        plane.targetY += (orbitTargetY - plane.targetY) * 0.08;
      }

      // Distance and directional vector to target cursor or orbit waypoint
      const dx = plane.targetX - plane.x;
      const dy = plane.targetY - plane.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Responsive lerp movement towards cursor or cruising speed during orbit
      const maxSpeed = isOrbiting ? 15 : 30;
      const speed = isOrbiting ? Math.min(dist * 0.09, maxSpeed) : Math.min(dist * 0.11, maxSpeed);

      if (dist > 2.0) {
        plane.vx = (dx / dist) * speed;
        plane.vy = (dy / dist) * speed;
      } else {
        plane.vx *= 0.70;
        plane.vy *= 0.70;
      }

      plane.x += plane.vx;
      plane.y += plane.vy;

      // ═══════ Bending into Full Side View While Moving ═══════
      // At rest (vx == 0): straight front view (yaw = 0)
      // Any horizontal movement rapidly pivots the aircraft into full side profile
      const maxSideAngle = Math.PI * 0.46; // ~83 degrees (clear side view)
      const targetYaw = Math.max(-maxSideAngle, Math.min(maxSideAngle, plane.vx * 0.20));

      // Aerodynamic banking (Roll)
      const targetRoll = Math.max(-0.60, Math.min(0.60, plane.vx * 0.09));

      // Pitch climb/dive (nose pitches up when ascending, down when descending)
      const targetPitch = Math.max(-0.45, Math.min(0.45, plane.vy * 0.07));

      // Quick response lerp
      plane.yaw += (targetYaw - plane.yaw) * 0.16;
      plane.roll += (targetRoll - plane.roll) * 0.16;
      plane.pitch += (targetPitch - plane.pitch) * 0.16;

      // Spin propeller blades continuously
      plane.fanAngle += 0.65;

      // 3D Euler rotation matrix
      const cosY = Math.cos(plane.yaw);
      const sinY = Math.sin(plane.yaw);
      const cosX = Math.cos(plane.pitch);
      const sinX = Math.sin(plane.pitch);
      const cosZ = Math.cos(plane.roll);
      const sinZ = Math.sin(plane.roll);

      // Project 3D vertices to 2D screen coordinates
      // Note: In 3D Cartesian coordinates, +y is UP. In screen coordinates, +y is DOWN.
      // Therefore, screenY = plane.y - y3 * depth (fixing the upside-down orientation so canopy/tail point UP!)
      const projected = model.vertices.map((v) => {
        // 1. Yaw rotation (turn between front and side view)
        let x1 = v.x * cosY + v.z * sinY;
        let y1 = v.y;
        let z1 = -v.x * sinY + v.z * cosY;

        // 2. Pitch rotation (climb/dive)
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // 3. Roll rotation (banking)
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const depth = focalLength / (focalLength - z3);
        return {
          x: plane.x + x3 * depth,
          y: plane.y - y3 * depth, // Correct upright orientation!
          scale: depth,
        };
      });

      // Update Contrail Trails from Wingtips (Vertices 9 & 10) and Tail (Vertex 6)
      const leftWing = projected[9];
      const rightWing = projected[10];
      const tail = projected[6];

      if (leftWing) plane.leftTrail.push({ x: leftWing.x, y: leftWing.y });
      if (rightWing) plane.rightTrail.push({ x: rightWing.x, y: rightWing.y });
      if (tail) plane.exhaustTrail.push({ x: tail.x, y: tail.y });

      const maxTrailLen = 24;
      if (plane.leftTrail.length > maxTrailLen) plane.leftTrail.shift();
      if (plane.rightTrail.length > maxTrailLen) plane.rightTrail.shift();
      if (plane.exhaustTrail.length > maxTrailLen) plane.exhaustTrail.shift();

      // Draw Contrail Streams
      const drawStream = (trail: { x: number; y: number }[], color: string, isExhaust = false) => {
        if (trail.length < 2) return;
        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];
          const progress = i / trail.length;
          ctx.strokeStyle = color.replace("ALPHA", (progress * (isExhaust ? 0.65 : 0.35)).toFixed(2));
          ctx.lineWidth = progress * (isExhaust ? 2.5 : 1.8);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      };

      // Wingtip smoke contrails and red exhaust
      drawStream(plane.leftTrail, isDark ? "rgba(255,255,255,ALPHA)" : "rgba(15,23,42,ALPHA)");
      drawStream(plane.rightTrail, isDark ? "rgba(255,255,255,ALPHA)" : "rgba(15,23,42,ALPHA)");
      drawStream(plane.exhaustTrail, "rgba(239,68,68,ALPHA)", true);

      // Draw Airplane Wireframe Skeleton
      ctx.strokeStyle = wireColor;
      ctx.lineWidth = 1.65;
      ctx.lineJoin = "round";

      model.edges.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Spinning Propeller at Nose (Vertex 0)
      const nose = projected[0];
      if (nose) {
        const fanLen = 19 * nose.scale;
        const fCos = Math.cos(plane.fanAngle);
        const fSin = Math.sin(plane.fanAngle);

        ctx.strokeStyle = accentRed;
        ctx.lineWidth = 2.0;

        ctx.beginPath();
        ctx.moveTo(nose.x - fCos * fanLen, nose.y - fSin * fanLen);
        ctx.lineTo(nose.x + fCos * fanLen, nose.y + fSin * fanLen);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(nose.x + fSin * fanLen, nose.y - fCos * fanLen);
        ctx.lineTo(nose.x - fSin * fanLen, nose.y + fCos * fanLen);
        ctx.stroke();

        // Propeller spinner hub
        ctx.fillStyle = accentRed;
        ctx.beginPath();
        ctx.arc(nose.x, nose.y, 3.4 * nose.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Wingtip Navigation Beacon Lights (Vertices 9 & 10)
      [leftWing, rightWing].forEach((tip) => {
        if (tip) {
          ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 6.5 * tip.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = accentRed;
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 3.0 * tip.scale, 0, Math.PI * 2);
          ctx.fill();
        }
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
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-30 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
