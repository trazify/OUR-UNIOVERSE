import React, { useState, useEffect } from 'react';

const FULL_TEXT = 'I MISS YOU ALOT';

const MissYouBanner: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 130);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="miss-you-section" aria-label="A personal message from Divi">
      <div className="miss-you-card glass-panel">
        <div className="miss-you-hearts-row" aria-hidden="true">
          <span className="sparkle-heart">💖</span>
          <span className="sparkle-heart">✨</span>
          <span className="sparkle-heart">💖</span>
        </div>

        <div className="miss-you-typewriter-wrap">
          <span className="miss-you-text">{displayedText}</span>
          <span className="miss-you-cursor" aria-hidden="true">|</span>
        </div>

        <p className="miss-you-subtext">
          Every second, every minute, no matter the miles ❤️
        </p>
      </div>
    </section>
  );
};

export default MissYouBanner;
