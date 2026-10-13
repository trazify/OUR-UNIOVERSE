import React from 'react';
import { HelloKitty, Kuromi, SanrioBow } from './PixelSprites';

interface FloatingHeaderProps {
  onOpenLetter: () => void;
  onScrollToGarden: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  onOpenLetter,
  onScrollToGarden,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="hero-header-container">
      {/* Romantic Glowing Eyebrow Tagline with Sparkling Stars */}
      <div className="header-eyebrow" aria-hidden="true">
        <span className="eyebrow-star">✨</span>
        <span className="eyebrow-badge">DIVI &amp; ANVI&#39;S UNIVERSE</span>
        <span className="eyebrow-star">✨</span>
      </div>

      {/* Unified Floating Glass Island */}
      <header
        className="floating-island-dock glass-panel"
        aria-label="Main navigation and audio controls"
      >
        {/* Left: Hello Kitty Mascot & Project Brand */}
        <div className="island-brand-group">
          <div className="island-mascot kitty-bounce" title="Hello Kitty">
            <HelloKitty size={32} interactive={false} />
          </div>
          <div className="island-brand-title">
            <SanrioBow size={18} />
            <span className="island-brand-name">Project Anvi</span>
          </div>
        </div>

        <div className="island-divider" aria-hidden="true" />

        {/* Center: Navigation Action Pills */}
        <nav className="island-nav-group" aria-label="Quick navigation">
          <button
            className="island-nav-btn glass-btn"
            onClick={onOpenLetter}
            aria-label="Read love note"
          >
            <span className="nav-btn-icon">💌</span>
            <span className="nav-btn-text">Read Note</span>
          </button>
          <button
            className="island-nav-btn glass-btn"
            onClick={onScrollToGarden}
            aria-label="Scroll to our garden"
          >
            <span className="nav-btn-icon">🌷</span>
            <span className="nav-btn-text">Our Garden</span>
          </button>
        </nav>

        <div className="island-divider" aria-hidden="true" />

        {/* Right: Audio Control & Kuromi Mascot */}
        <div className="island-audio-group">
          <button
            className={`island-mute-btn ${!isMuted ? 'is-playing' : ''}`}
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute Daniel Caesar - Streetcar' : 'Mute music'}
            title={isMuted ? 'Unmute Daniel Caesar - Streetcar' : 'Mute music'}
          >
            <span className="island-mute-icon" aria-hidden="true">
              {isMuted ? '🔇' : '🔊'}
            </span>
          </button>
          <div className="island-mascot kuromi-bounce" title="Kuromi">
            <Kuromi size={32} interactive={false} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default FloatingHeader;
