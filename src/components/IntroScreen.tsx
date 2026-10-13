import React, { useMemo, useState } from 'react';
import { HelloKitty, Kuromi, SanrioBow } from './PixelSprites';

interface IntroScreenProps {
  onEnter: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [exiting, setExiting] = useState(false);

  // Pre-compute random star positions
  const stars = useMemo(() => {
    return Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 2.5,
      delay: `${Math.random() * 3}s`,
      duration: `${1.5 + Math.random() * 2}s`,
    }));
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div className={`intro-screen ${exiting ? 'exiting' : ''}`}>
      {/* Background stars */}
      <div className="intro-stars" aria-hidden="true">
        {stars.map((s) => (
          <div
            key={s.id}
            className="intro-star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* Glassmorphic Welcome Card */}
      <div className="intro-card glass-panel">
        {/* Hello Kitty & Kuromi greeting header */}
        <div className="intro-characters-row" aria-hidden="true">
          <HelloKitty size={64} variant="standing" interactive={false} />
          <div className="intro-heart-container">
            <span className="intro-heart-icon">❤️</span>
            <div className="intro-bow-wrap">
              <SanrioBow size={32} />
            </div>
          </div>
          <Kuromi size={64} variant="blushing" interactive={false} />
        </div>

        <div className="intro-badge">
          <span>PROJECT ANVI</span>
        </div>

        <h1 className="intro-title">
          Welcome to our little universe, Anvi ❤️
        </h1>

        <button
          className="intro-btn"
          onClick={handleEnter}
          aria-label="Enter our little world"
          autoFocus
        >
          Enter Our Little World 🎀
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
