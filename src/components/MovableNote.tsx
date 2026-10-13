import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SanrioBow } from './PixelSprites';

interface MovableNoteProps {
  onOpenLetter: () => void;
}

const MovableNote: React.FC<MovableNoteProps> = ({ onOpenLetter }) => {
  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });

  // Handle pointer move for 3D cursor response (when not dragging)
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging) return;
      // On touch devices without active cursor, skip continuous tilt to prevent stuck angles
      if (e.pointerType === 'touch') return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from cursor to card center (normalized -1 to 1)
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      const maxTilt = 8; // degrees
      setTilt({
        rotateX: Math.max(-maxTilt, Math.min(maxTilt, -dy * maxTilt)),
        rotateY: Math.max(-maxTilt, Math.min(maxTilt, dx * maxTilt)),
        shineX: 50 + dx * 30,
        shineY: 50 + dy * 30,
      });
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // If clicking a button, don't start dragging
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    // On touch devices (smartphones/tablets), only start drag if touching the grip handle.
    // Touching the card body permits native vertical page scroll!
    if (e.pointerType === 'touch' && !target.closest('.note-drag-handle')) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    (cardRef.current as HTMLElement)?.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const newX = dragStartRef.current.posX + deltaX;
    const newY = dragStartRef.current.posY + deltaY;

    // Viewport-aware boundary constraint (keeps card cleanly on mobile and desktop screens)
    const maxBoundX = Math.min(window.innerWidth * 0.38, 160);
    const maxBoundY = Math.min(window.innerHeight * 0.40, 220);

    const clampedX = Math.max(-maxBoundX, Math.min(maxBoundX, newX));
    const clampedY = Math.max(-maxBoundY, Math.min(maxBoundY, newY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (cardRef.current as HTMLElement)?.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const resetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition({ x: 0, y: 0 });
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  const hasMoved = Math.abs(position.x) > 10 || Math.abs(position.y) > 10;

  return (
    <div className="hero-note-wrapper" style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        className={`hero-note-card glass-panel translucent-glass movable-note ${
          isDragging ? 'is-dragging' : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handleDragMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px) rotateX(${
            isDragging ? 0 : tilt.rotateX
          }deg) rotateY(${isDragging ? 0 : tilt.rotateY}deg)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1), box-shadow 0.25s ease',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: isDragging ? 'none' : 'pan-y',
          position: 'relative',
        }}
      >
        {/* Cursor Specular Shine Reflection */}
        <div
          className="card-shine-effect"
          style={{
            background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 220, 235, 0.22) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Movable Drag Grip Bar */}
        <div
          className="note-drag-handle"
          title="Click & drag me anywhere!"
          style={{ touchAction: 'none' }}
        >
          <span className="drag-handle-dots">⠿ Drag Me Around</span>
          {hasMoved && (
            <button
              className="note-reset-btn"
              onClick={resetPosition}
              title="Snap back to top"
            >
              ↺ Reset
            </button>
          )}
        </div>

        <div className="note-sanrio-header">
          <SanrioBow size={24} />
          <span className="note-badge">A Note For My Bhondu</span>
          <SanrioBow size={24} />
        </div>

        <h1 className="hero-title">No matter the distance...</h1>
        <p className="hero-body">
          Nothing will ever change how much you mean to me ❤️
        </p>
        <p className="hero-subtext">
          Always here. Always yours.
        </p>

        <div className="hero-note-actions">
          <button className="hero-note-btn primary-btn" onClick={onOpenLetter}>
            💌 Read My Full Letter
          </button>
        </div>

        <p className="hero-sparkle-hint">
          Tap anywhere to shower maroon sparkles ✨
        </p>
      </div>
    </div>
  );
};

export default MovableNote;
