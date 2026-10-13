import React, { useState } from 'react';
import kittyVampire from '../assets/kitty-vampire.png';
import kittyStanding from '../assets/kitty-standing.png';
import kittyFlowers from '../assets/kitty-flowers.png';
import kuromiStanding from '../assets/kuromi-standing.png';
import kuromiBlushing from '../assets/kuromi-blushing.png';

/**
 * Authentic, high-resolution Sanrio character components using official PNGs.
 * Provides interactive speech bubbles, gentle float animations, and multiple variants.
 */

export interface HelloKittyProps {
  size?: number;
  variant?: 'vampire' | 'standing' | 'flowers';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const HelloKitty: React.FC<HelloKittyProps> = ({
  size = 72,
  variant = 'standing',
  interactive = true,
  onClick,
  className = '',
}) => {
  const [dialogue, setDialogue] = useState<string | null>(null);

  const imageSrc =
    variant === 'vampire'
      ? kittyVampire
      : variant === 'flowers'
      ? kittyFlowers
      : kittyStanding;

  const handleClick = () => {
    if (onClick) onClick();
    if (interactive) {
      const messages = [
        "Anvi is the prettiest girl! 🎀",
        "Sending a warm hug to Anvi! 💕",
        "Divi loves you so so much! ❤️",
        "You're doing amazing, baby! ✨",
      ];
      setDialogue(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setDialogue(null), 3000);
    }
  };

  return (
    <div
      className={`sanrio-char-wrap hello-kitty-wrap ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{
        cursor: interactive ? 'pointer' : 'default',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      title="Hello Kitty — click for a cute message!"
    >
      {dialogue && <div className="sanrio-speech-bubble">{dialogue}</div>}
      <div className="sanrio-sprite-bob">
        <img
          src={imageSrc}
          alt="Hello Kitty"
          style={{
            height: `${size}px`,
            width: 'auto',
            maxHeight: `${size}px`,
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 14px rgba(139, 0, 33, 0.4))',
            transition: 'transform 0.25s ease',
            userSelect: 'none',
            display: 'block',
            outline: 'none',
          }}
          className="sanrio-kitty-img"
          draggable={false}
        />
      </div>
    </div>
  );
};

export interface KuromiProps {
  size?: number;
  variant?: 'standing' | 'blushing';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Kuromi: React.FC<KuromiProps> = ({
  size = 72,
  variant = 'standing',
  interactive = true,
  onClick,
  className = '',
}) => {
  const [dialogue, setDialogue] = useState<string | null>(null);

  const imageSrc = variant === 'blushing' ? kuromiBlushing : kuromiStanding;

  const handleClick = () => {
    if (onClick) onClick();
    if (interactive) {
      const messages = [
        "Divi won't let anyone upset you, hmph! 💜",
        "Distance is nothing, you two got this! 😈",
        "Smile, Anvi! You're the coolest! 🖤",
        "Sending mischievous love your way! 🔮",
      ];
      setDialogue(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setDialogue(null), 3000);
    }
  };

  return (
    <div
      className={`sanrio-char-wrap kuromi-wrap ${className}`}
      onClick={handleClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{
        cursor: interactive ? 'pointer' : 'default',
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      title="Kuromi — click for a cute message!"
    >
      {dialogue && <div className="sanrio-speech-bubble kuromi-bubble">{dialogue}</div>}
      <div className="sanrio-sprite-bob" style={{ animationDelay: '0.4s' }}>
        <img
          src={imageSrc}
          alt="Kuromi"
          style={{
            height: `${size}px`,
            width: 'auto',
            maxHeight: `${size}px`,
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 14px rgba(60, 10, 50, 0.5))',
            transition: 'transform 0.25s ease',
            userSelect: 'none',
            display: 'block',
          }}
          className="sanrio-kuromi-img"
          draggable={false}
        />
      </div>
    </div>
  );
};

// ─── Cute Authentic Hello Kitty Velvet Ribbon Bow ───
export const SanrioBow: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 32, className = '' }) => {
  const h = Math.round(size * 0.72);
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 44 32"
      className={`sanrio-bow-icon ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        filter: 'drop-shadow(0 2px 6px rgba(139, 0, 33, 0.45))',
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id={`bowLoopGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E47" />
          <stop offset="50%" stopColor="#9E0A2D" />
          <stop offset="100%" stopColor="#6E0018" />
        </linearGradient>
        <linearGradient id={`bowKnotGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D92855" />
          <stop offset="60%" stopColor="#9E0A2D" />
          <stop offset="100%" stopColor="#5E0014" />
        </linearGradient>
        <radialGradient id={`bowHighlight-${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFAEC0" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#C41E47" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9E0A2D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ribbon Tails hanging down */}
      <path
        d="M 18 18 Q 12 28 8 30 Q 15 26 19 21 Z"
        fill="#7A001B"
        stroke="#4A0010"
        strokeWidth="0.8"
      />
      <path
        d="M 26 18 Q 32 28 36 30 Q 29 26 25 21 Z"
        fill="#7A001B"
        stroke="#4A0010"
        strokeWidth="0.8"
      />

      {/* Left Puffy Loop */}
      <path
        d="M 20 15 C 13 8, 4 5, 3 13 C 2 20, 11 22, 20 17 Z"
        fill={`url(#bowLoopGrad-${id})`}
        stroke="#FFAEC0"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Left Inner Crease & Highlight */}
      <path
        d="M 17 15 C 12 11, 7 9, 6 13 C 6 16, 11 18, 17 16"
        fill="none"
        stroke="#520012"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 8 9 Q 13 8 16 12"
        fill="none"
        stroke="#FFCCD7"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Right Puffy Loop */}
      <path
        d="M 24 15 C 31 8, 40 5, 41 13 C 42 20, 33 22, 24 17 Z"
        fill={`url(#bowLoopGrad-${id})`}
        stroke="#FFAEC0"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right Inner Crease & Highlight */}
      <path
        d="M 27 15 C 32 11, 37 9, 38 13 C 38 16, 33 18, 27 16"
        fill="none"
        stroke="#520012"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 36 9 Q 31 8 28 12"
        fill="none"
        stroke="#FFCCD7"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Center Plump Knot */}
      <ellipse
        cx="22"
        cy="15"
        rx="5.5"
        ry="6.5"
        fill={`url(#bowKnotGrad-${id})`}
        stroke="#FFAEC0"
        strokeWidth="1.3"
      />
      {/* Knot highlight */}
      <ellipse
        cx="20.5"
        cy="13"
        rx="2.2"
        ry="3"
        fill={`url(#bowHighlight-${id})`}
      />
      {/* Cute Golden Sparkle Star in Center */}
      <polygon
        points="22,11.5 22.8,13.5 25,14 23.2,15.5 23.8,17.5 22,16.2 20.2,17.5 20.8,15.5 19,14 21.2,13.5"
        fill="#FFD166"
        stroke="#FFFDF8"
        strokeWidth="0.5"
      />
    </svg>
  );
};

// ─── Velvet Maroon Sanrio Gift Box ───
export const GiftBox: React.FC<{
  size?: number;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ size = 52, isOpen = false, onClick, className = '' }) => {
  return (
    <div
      className={`sanrio-gift-box ${isOpen ? 'is-open' : ''} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Sanrio surprise gift box — click to open"
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div className="gift-pulse-glow" aria-hidden="true" />
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className="gift-svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(139, 0, 33, 0.5))' }}
      >
        {/* Gift Lid */}
        <g
          style={{
            transformOrigin: '24px 16px',
            transform: isOpen ? 'translateY(-8px) rotate(-14deg)' : 'translateY(0)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Ribbon Bow on top */}
          <path
            d="M20 9 C16 5 18 2 21 5 C23 7 24 9 24 9 C24 9 25 7 27 5 C30 2 32 5 28 9 Z"
            fill="#FFAEC0"
            stroke="#8B0021"
            strokeWidth="1"
          />
          <circle cx="24" cy="9" r="2.2" fill="#FFD166" />
          {/* Lid body */}
          <rect x="6" y="10" width="36" height="8" rx="2" fill="#800020" stroke="#FFAEC0" strokeWidth="1" />
          <rect x="22" y="10" width="4" height="8" fill="#FFD166" />
        </g>
        {/* Box Base */}
        <rect x="9" y="18" width="30" height="24" rx="2" fill="#580014" stroke="#A61238" strokeWidth="1" />
        {/* Ribbon Stripe */}
        <rect x="22" y="18" width="4" height="24" fill="#FFD166" />
        {/* Subtle highlight */}
        <rect x="11" y="20" width="3" height="20" fill="rgba(255, 255, 255, 0.12)" rx="1" />
      </svg>
    </div>
  );
};
