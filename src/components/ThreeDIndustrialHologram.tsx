import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CompanyId } from '../types';

interface ThreeDIndustrialHologramProps {
  companyId: CompanyId;
  themeColor: string;
  glowColor: string;
}

export const ThreeDIndustrialHologram: React.FC<ThreeDIndustrialHologramProps> = ({
  companyId,
  themeColor,
  glowColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -20 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking for 3D depth effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: -(y / (rect.height / 2)) * 25,
      y: (x / (rect.width / 2)) * 35,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 15, y: -20 });
  };

  // 3D Particle Space Matrix on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 380);
    let height = (canvas.height = 380);

    // Particle nodes for 3D space
    const numParticles = 48;
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
    }[] = [];

    // Colors according to company
    const palette =
      companyId === 'sr-infra'
        ? ['#38bdf8', '#2563eb', '#60a5fa', '#93c5fd']
        : companyId === 'suhel-engineering'
        ? ['#f97316', '#ea580c', '#fb923c', '#fdba74']
        : companyId === 'sr-power-solution'
        ? ['#10b981', '#06b6d4', '#34d399', '#6ee7b7']
        : ['#f59e0b', '#fbbf24', '#fde047', '#d97706'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 240,
        y: (Math.random() - 0.5) * 240,
        z: (Math.random() - 0.5) * 240,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1.2,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    let angleY = 0;
    let angleX = 0.3;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 280;

      angleY += 0.012;

      // Project & draw particles in 3D
      const projected: { x: number; y: number; scale: number; z: number; color: string; size: number }[] = [];

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x > 120 || p.x < -120) p.vx *= -1;
        if (p.y > 120 || p.y < -120) p.vy *= -1;
        if (p.z > 120 || p.z < -120) p.vz *= -1;

        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const distance = fov + z2;
        if (distance > 0) {
          const scale = fov / distance;
          projected.push({
            x: cx + x1 * scale,
            y: cy + y2 * scale,
            scale,
            z: z2,
            color: p.color,
            size: p.size * scale,
          });
        }
      });

      // Sort by Z for proper 3D depth rendering
      projected.sort((a, b) => b.z - a.z);

      // Draw 3D connecting laser lines between nearby nodes
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 48) {
            const alpha = (1 - dist / 48) * 0.35 * Math.min(projected[i].scale, projected[j].scale);
            ctx.strokeStyle = themeColor;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle spheres with glow
      projected.forEach((p) => {
        ctx.globalAlpha = Math.min(1, Math.max(0.2, p.scale * 0.8));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8 * p.scale;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, p.size), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [companyId, themeColor]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: '1100px' }}
    >
      {/* Dynamic 3D Canvas Background for Starfield Nodes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* Main 3D Gimbal / Hologram Core Container */}
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 120 }}
        className="relative w-64 h-64 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer 3D Gyroscope Ring (X/Y axis) */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed opacity-40 pointer-events-none"
          style={{
            borderColor: themeColor,
            transform: 'rotateX(65deg) rotateY(15deg)',
            boxShadow: `0 0 25px ${glowColor}`,
          }}
        >
          {/* Ring Orbit Markers */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
            style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }}
          />
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg"
            style={{ backgroundColor: '#ffffff', boxShadow: `0 0 10px #ffffff` }}
          />
        </motion.div>

        {/* Middle 3D Gyroscope Ring (Opposite rotation) */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-dotted opacity-60 pointer-events-none"
          style={{
            borderColor: themeColor,
            transform: 'rotateX(-60deg) rotateY(40deg)',
          }}
        >
          <div
            className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: themeColor }}
          />
          <div
            className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: themeColor }}
          />
        </motion.div>

        {/* Inner High-Speed Horizon Ring */}
        <motion.div
          animate={{ rotateZ: 360, scale: [0.95, 1.05, 0.95] }}
          transition={{
            rotateZ: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute inset-10 rounded-full border border-cyan-400/50 pointer-events-none"
          style={{
            transform: 'rotateX(75deg)',
            boxShadow: `inset 0 0 15px ${glowColor}`,
          }}
        />

        {/* 3D COMPANY-SPECIFIC WIREFRAME CORE */}
        <div
          className="relative w-36 h-36 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ========================================================
              1. NEW SR INFRA: 3D STRUCTURAL STEEL ISOMETRIC TOWER
             ======================================================== */}
          {companyId === 'sr-infra' && (
            <motion.div
              animate={{ rotateY: 360, rotateX: [12, -8, 12] }}
              transition={{
                rotateY: { duration: 14, repeat: Infinity, ease: 'linear' },
                rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative w-28 h-28"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Isometric Steel Box Faces */}
              {/* Front Face */}
              <div
                className="absolute inset-0 border-2 border-blue-400 bg-blue-600/15 backdrop-blur-xs flex items-center justify-center text-blue-200 text-xs font-mono font-bold"
                style={{
                  transform: 'translateZ(45px)',
                  boxShadow: 'inset 0 0 15px rgba(37,99,235,0.4)',
                }}
              >
                <div className="w-full h-full flex flex-col justify-between p-1.5 opacity-80">
                  <div className="flex justify-between text-[9px]"><span>■</span><span>SR-01</span></div>
                  <div className="text-center font-black text-[10px] tracking-wider text-white">INFRA STEEL</div>
                  <div className="flex justify-between text-[9px]"><span>ISO</span><span>9001</span></div>
                </div>
                {/* Structural X-Cross Wireframe */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#38bdf8_49%,#38bdf8_51%,transparent_52%),linear-gradient(-45deg,transparent_48%,#38bdf8_49%,#38bdf8_51%,transparent_52%)] opacity-60" />
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 border-2 border-blue-500 bg-blue-900/30 flex items-center justify-center"
                style={{
                  transform: 'rotateY(180deg) translateZ(45px)',
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#2563eb_49%,#2563eb_51%,transparent_52%),linear-gradient(-45deg,transparent_48%,#2563eb_49%,#2563eb_51%,transparent_52%)] opacity-50" />
              </div>

              {/* Left Face */}
              <div
                className="absolute inset-0 border-2 border-cyan-400 bg-blue-800/20"
                style={{
                  transform: 'rotateY(-90deg) translateZ(45px)',
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,#06b6d4_49%,#06b6d4_51%,transparent_52%)] opacity-60" />
              </div>

              {/* Right Face */}
              <div
                className="absolute inset-0 border-2 border-cyan-400 bg-blue-800/20"
                style={{
                  transform: 'rotateY(90deg) translateZ(45px)',
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,#06b6d4_49%,#06b6d4_51%,transparent_52%)] opacity-60" />
              </div>

              {/* Top Roof Platform */}
              <div
                className="absolute inset-0 border-2 border-blue-300 bg-blue-500/30 flex items-center justify-center"
                style={{
                  transform: 'rotateX(90deg) translateZ(45px)',
                }}
              >
                <div className="w-6 h-6 rounded-full border border-blue-200 flex items-center justify-center animate-ping" />
              </div>

              {/* Bottom Foundation */}
              <div
                className="absolute inset-0 border-2 border-blue-900 bg-slate-950"
                style={{
                  transform: 'rotateX(-90deg) translateZ(45px)',
                }}
              />
            </motion.div>
          )}

          {/* ========================================================
              2. SUHEL ENGINEERING: 3D ROTATING PROCESS TURBINE & PIPES
             ======================================================== */}
          {companyId === 'suhel-engineering' && (
            <motion.div
              animate={{ rotateY: -360, rotateZ: [10, -10, 10] }}
              transition={{
                rotateY: { duration: 10, repeat: Infinity, ease: 'linear' },
                rotateZ: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative w-28 h-28"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Central Cylindrical Pipe Hub */}
              <div
                className="absolute inset-2 rounded-full border-4 border-orange-500 bg-orange-600/25 flex items-center justify-center shadow-xl"
                style={{
                  transform: 'translateZ(30px)',
                  boxShadow: '0 0 25px rgba(234,88,12,0.6)',
                }}
              >
                <div className="text-center font-mono font-black text-[10px] text-white">
                  <div>BOILER</div>
                  <div className="text-amber-300 text-[8px]">PRESSURE</div>
                </div>
              </div>

              {/* 3D High-Pressure Pipe Impeller Blades */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-16 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent border border-orange-300 shadow-md"
                  style={{
                    transform: `rotate(${deg}deg) translateZ(${15 + (i % 2) * 15}px)`,
                  }}
                />
              ))}

              {/* Rear Flange */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-orange-400 opacity-70"
                style={{ transform: 'rotateY(180deg) translateZ(35px)' }}
              />
            </motion.div>
          )}

          {/* ========================================================
              3. SR POWER SOLUTION: 3D ELECTROMAGNETIC TESLA POWER CORE
             ======================================================== */}
          {companyId === 'sr-power-solution' && (
            <motion.div
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{
                rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                rotateX: { duration: 16, repeat: Infinity, ease: 'linear' },
              }}
              className="relative w-28 h-28 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glowing High Voltage Core Sphere */}
              <div
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-400 to-white shadow-2xl flex items-center justify-center"
                style={{
                  transform: 'translateZ(0px)',
                  boxShadow: '0 0 35px #10b981, 0 0 60px #06b6d4',
                }}
              >
                <div className="text-[10px] font-black text-slate-950 font-mono">HT/LT</div>
              </div>

              {/* 3D Intersecting Flux Rings */}
              <div
                className="absolute inset-0 rounded-full border-2 border-emerald-400 border-dashed"
                style={{ transform: 'rotateX(90deg)' }}
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-cyan-400 border-dashed"
                style={{ transform: 'rotateY(90deg)' }}
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-teal-300"
                style={{ transform: 'rotateZ(45deg)' }}
              />
            </motion.div>
          )}

          {/* ========================================================
              4. DEFAULT / SR GROUP INTEGRATED CORE
             ======================================================== */}
          {companyId === 'sr-group' && (
            <motion.div
              animate={{ rotateY: 360, rotateZ: 360 }}
              transition={{
                rotateY: { duration: 14, repeat: Infinity, ease: 'linear' },
                rotateZ: { duration: 20, repeat: Infinity, ease: 'linear' },
              }}
              className="relative w-28 h-28 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="w-16 h-16 rounded-2xl border-2 border-amber-400 bg-amber-500/20 backdrop-blur-xs flex items-center justify-center font-mono font-black text-white text-xs shadow-2xl"
                style={{
                  transform: 'translateZ(30px)',
                  boxShadow: '0 0 30px rgba(245,158,11,0.5)',
                }}
              >
                SR GROUP
              </div>
              <div
                className="absolute inset-0 rounded-full border border-amber-400/50"
                style={{ transform: 'rotateX(70deg)' }}
              />
            </motion.div>
          )}
        </div>

        {/* 3D Coordinate Target Box overlay */}
        <div
          className="absolute -bottom-6 text-[9px] font-mono tracking-widest text-slate-400 bg-slate-950/80 px-3 py-0.5 rounded-full border border-slate-800 flex items-center gap-1.5 shadow-md"
          style={{ transform: 'translateZ(60px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D HOLOGRAM MATRIX ACTIVE</span>
        </div>
      </motion.div>
    </div>
  );
};
