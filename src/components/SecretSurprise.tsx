import React, { useState, useEffect, useCallback } from 'react';

interface SecretSurpriseProps {
  /** Number of taps needed to trigger */
  threshold?: number;
}

const SecretSurprise: React.FC<SecretSurpriseProps> = ({ threshold = 5 }) => {
  const [tapCount, setTapCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleTap = useCallback(() => {
    setTapCount((c) => {
      const next = c + 1;
      if (next >= threshold) {
        setRevealed(true);
        return 0;
      }
      return next;
    });
  }, [threshold]);

  const handleDismiss = () => {
    setRevealed(false);
  };

  // Lock body scroll when revealed
  useEffect(() => {
    if (revealed) {
      document.body.classList.add('modal-open');
      document.body.style.top = `-${window.scrollY}px`;
    }
    return () => {
      document.body.classList.remove('modal-open');
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [revealed]);

  return (
    <>
      {/* The trigger: a tiny pixel heart the user can find and tap */}
      <span
        className="secret-trigger"
        onClick={handleTap}
        onKeyDown={(e) => e.key === 'Enter' && handleTap()}
        role="button"
        tabIndex={0}
        aria-label={`Secret surprise – tap ${threshold} times to discover`}
        title="Something special hides here..."
        style={{
          fontSize: '14px',
          opacity: 0.5 + tapCount * 0.1,
          transition: 'opacity 0.3s, transform 0.15s',
          transform: tapCount > 0 ? 'scale(1.15)' : 'scale(1)',
          display: 'inline-block',
          imageRendering: 'pixelated',
        }}
      >
        ❤️
      </span>

      {/* Surprise modal */}
      {revealed && (
        <div
          className="secret-overlay"
          onClick={(e) => e.target === e.currentTarget && handleDismiss()}
          role="dialog"
          aria-modal="true"
          aria-label="A secret surprise message"
        >
          <div className="secret-card">
            <div className="secret-title">Hey, you. ❤️</div>
            <div className="secret-text">
              Just a tiny reminder that you're special, that your smile matters,
              and that you deserve kindness on the difficult days, too.
              <br /><br />
              Now go drink some water, relax your shoulders, and give yourself a
              little break.
              <br /><br />
              Sending you the biggest virtual hug. 🫂
            </div>
            <button
              className="secret-btn"
              onClick={handleDismiss}
              autoFocus
            >
              Okay, Okay, I'm Smiling 💗
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretSurprise;
