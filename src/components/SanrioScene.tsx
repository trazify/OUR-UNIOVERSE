import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelloKitty, Kuromi, GiftBox, SanrioBow } from './PixelSprites';

const SanrioScene: React.FC = () => {
  const [giftOpen, setGiftOpen] = useState(false);
  const [starClicks, setStarClicks] = useState<Record<number, boolean>>({});

  // Lock body scroll when gift modal is open
  useEffect(() => {
    if (giftOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [giftOpen]);

  const sceneStars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        top: 6 + Math.random() * 52,
        size: 3 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [],
  );

  const handleStarClick = (id: number) => {
    setStarClicks((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setStarClicks((prev) => ({ ...prev, [id]: false })), 600);
  };

  return (
    <section className="sanrio-section" aria-label="Sanrio pixel-art scene">
      <div className="sanrio-scene glass-panel">
        <div className="sanrio-header-badge">
          <SanrioBow size={28} />
          <span>Sanrio Starlight Haven</span>
          <SanrioBow size={28} />
        </div>

        <div className="sanrio-sky">
          {/* Maroon Pixel Moon */}
          <div className="pixel-moon" aria-hidden="true">
            <span className="moon-crater c1" />
            <span className="moon-crater c2" />
          </div>

          {/* Twinkling Stars */}
          {sceneStars.map((s) => (
            <div
              key={s.id}
              className="pixel-star-scene"
              onClick={() => handleStarClick(s.id)}
              role="button"
              tabIndex={0}
              aria-label="Twinkling star"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                cursor: 'pointer',
                transform: starClicks[s.id] ? 'scale(2.4)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                boxShadow: starClicks[s.id]
                  ? '0 0 14px rgba(255, 230, 240, 0.95)'
                  : 'none',
              }}
            />
          ))}

          {/* Ground */}
          <div className="sanrio-ground" aria-hidden="true" />

          {/* Characters and Center Gift Box (Properly Sized, Non-Glitched) */}
          <div className="sanrio-characters">
            <HelloKitty size={72} variant="standing" interactive={true} />

            <div className="gift-container" style={{ position: 'relative' }}>
              <GiftBox
                size={54}
                isOpen={giftOpen}
                onClick={() => setGiftOpen(true)}
              />
              <span className="gift-tap-hint">Tap gift! 🎁</span>
            </div>

            <Kuromi size={72} variant="standing" interactive={true} />
          </div>

          {/* Floating Heart */}
          <div className="sanrio-shared-heart" aria-hidden="true">
            ❤️
          </div>
        </div>

        <div className="sanrio-caption">
          Hello Kitty & Kuromi guarding our little universe ❤️
        </div>
        <div className="sanrio-interactive-hint">
          Tap the characters, stars, or open the surprise gift box ✨
        </div>

        {/* ═══ Gift Box Surprise Modal (Portaled to document.body) ═══ */}
        {giftOpen &&
          typeof document !== 'undefined' &&
          createPortal(
            <div
              className="gift-modal-backdrop"
              onClick={() => setGiftOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Surprise gift opened"
            >
              <div
                className="gift-modal-card glass-panel"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="gift-characters-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '10px',
                  }}
                >
                  <HelloKitty size={54} variant="flowers" interactive={false} />
                  <Kuromi size={54} variant="blushing" interactive={false} />
                </div>

                <div className="gift-modal-header">
                  <span className="gift-sparkle-icon">🎁</span>
                  <h3 className="gift-modal-title">A Little Secret Gift for Anvi</h3>
                  <span className="gift-sparkle-icon">✨</span>
                </div>

                <div className="gift-modal-body">
                  <p>
                    <strong>Surprise, my pretty baby! 💌</strong>
                  </p>
                  <p>
                    You deserve a thousand gentle moments of happiness, even on ordinary,
                    tiring days when everything feels overwhelming.
                  </p>
                  <p>
                    This little box holds an official lifetime voucher:
                  </p>
                  <div className="gift-voucher-box">
                    🎀 <strong>Lifetime Pass:</strong> Unlimited late-night listening ears,
                    tight virtual hugs, and zero judgements whenever you feel low.
                  </div>
                  <p className="gift-closing-note">
                    No matter where you are or how hard the day was, Divi is always in your corner. ❤️
                  </p>
                </div>

                <button
                  className="gift-modal-close-btn"
                  onClick={() => setGiftOpen(false)}
                  autoFocus
                >
                  Keep Safe in My Heart 💖
                </button>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </section>
  );
};

export default SanrioScene;
