import React, { useEffect, useState, useRef } from 'react';

/**
 * Sanrio-themed Custom Cursor and Sparkle Trail.
 * - Injects cute custom Sanrio bow cursor into body.
 * - Generates smooth trailing maroon stars and sparkles on movement.
 * - Spawns mini Sanrio hearts on click.
 */
interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  symbol: string;
}

const SanrioCursor: React.FC = () => {
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const nextId = useRef(0);
  const posRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Only activate cursor trail on devices with mouse/fine pointer
    const media = window.matchMedia('(pointer: fine)');
    setIsFinePointer(media.matches);

    const handlePointerMove = (e: PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Add trail particle with slight throttling
      if (Math.random() < 0.4) {
        const symbols = ['✦', '★', '♥', '✧', '🎀'];
        const colors = ['#8B0021', '#A61238', '#FFB3C6', '#FFE4A0', '#FFFDFE'];
        const newParticle: TrailParticle = {
          id: nextId.current++,
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: 10 + Math.random() * 8,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        };

        setTrail((prev) => [...prev.slice(-16), newParticle]);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Click burst with maroon hearts and stars
      const burst: TrailParticle[] = Array.from({ length: 7 }, () => ({
        id: nextId.current++,
        x: e.clientX + (Math.random() * 32 - 16),
        y: e.clientY + (Math.random() * 32 - 16),
        size: 14 + Math.random() * 8,
        opacity: 1,
        color: Math.random() > 0.4 ? '#8B0021' : '#FFD5DF',
        symbol: Math.random() > 0.5 ? '♥' : '✦',
      }));
      setTrail((prev) => [...prev.slice(-14), ...burst]);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Fade out loop
    const tick = () => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.05, y: p.y - 0.5 }))
          .filter((p) => p.opacity > 0),
      );
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      className="sanrio-cursor-trail-layer"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {trail.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            color: p.color,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
            textShadow: '0 0 8px rgba(139, 0, 33, 0.6)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1,
            transition: 'transform 0.1s linear',
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

export default SanrioCursor;
