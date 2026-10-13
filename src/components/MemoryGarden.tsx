import React, { useState } from 'react';
import { gardenBlossoms, type GardenBlossom } from '../data/memories';
import { HelloKitty, Kuromi, SanrioBow } from './PixelSprites';

const MemoryGarden: React.FC = () => {
  const [bloomedIds, setBloomedIds] = useState<Record<string, boolean>>({
    'garba-night': true,
    'bhondu-bachcha': true,
  });
  const [activeBlossom, setActiveBlossom] = useState<GardenBlossom | null>(null);

  const toggleBloom = (b: GardenBlossom) => {
    setBloomedIds((prev) => ({ ...prev, [b.id]: true }));
    setActiveBlossom(b);
  };

  const handleWaterAll = () => {
    const all: Record<string, boolean> = {};
    gardenBlossoms.forEach((b) => {
      all[b.id] = true;
    });
    setBloomedIds(all);
  };

  const bloomedCount = Object.keys(bloomedIds).length;

  return (
    <section className="memory-section" aria-label="Anvi and Divi's memory garden">
      {/* Decorative Sanrio gardeners */}
      <div className="garden-header-wrap">
        <div className="garden-kitty-mascot" aria-hidden="true">
          <HelloKitty size={64} variant="flowers" interactive={false} />
          <span className="mascot-tag">Flower Basket 🌸</span>
        </div>

        <div className="garden-title-block">
          <div className="garden-badge">
            <SanrioBow size={24} />
            <span>Divi & Anvi's Botanical Sanctuary</span>
            <SanrioBow size={24} />
          </div>
          <h2 className="memory-section-title">Our Little Garden 🌷</h2>
          <p className="garden-subtitle">
            Not generic quotes, not AI words — just real memories, messy feelings,
            and honest love. Tap any flower to bloom it and read my note.
          </p>

          <div className="garden-status-bar">
            <span>{bloomedCount} of {gardenBlossoms.length} blossoms bloomed 🌸</span>
            {bloomedCount < gardenBlossoms.length && (
              <button className="water-all-btn" onClick={handleWaterAll}>
                💧 Water Whole Garden
              </button>
            )}
          </div>
        </div>

        <div className="garden-kuromi-mascot" aria-hidden="true">
          <Kuromi size={64} variant="blushing" interactive={false} />
          <span className="mascot-tag">Sweet Companion 💜</span>
        </div>
      </div>

      {/* Flower Bed Tiles Grid (Glassmorphic) */}
      <div className="memory-grid">
        {gardenBlossoms.map((b) => {
          const isBloomed = !!bloomedIds[b.id];
          return (
            <article
              key={b.id}
              className={`memory-card glass-panel ${isBloomed ? 'is-bloomed' : 'budding'}`}
              onClick={() => toggleBloom(b)}
              tabIndex={0}
              role="button"
              aria-label={`Open memory: ${b.title}`}
            >
              <div className="memory-card-top">
                <div
                  className="memory-card-icon"
                  style={{
                    transform: isBloomed ? 'scale(1.15)' : 'scale(0.9)',
                    filter: isBloomed
                      ? `drop-shadow(0 0 10px ${b.petalsColor})`
                      : 'grayscale(0.4)',
                  }}
                >
                  {b.flowerEmoji}
                </div>
                <div className="memory-card-meta">
                  <span className="memory-tag">{b.tag}</span>
                  <span className="flower-type">{b.flowerName}</span>
                </div>
              </div>

              <h3 className="memory-card-title">{b.title}</h3>

              <p className="memory-card-text">
                {isBloomed ? (
                  b.message
                ) : (
                  <span className="bud-hint">
                    🌱 <em>Bud waiting for affection... Tap to water & bloom.</em>
                  </span>
                )}
              </p>

              <div className="memory-card-footer">
                <span className="memory-tap-prompt">
                  {isBloomed ? '✨ Click to expand' : '💧 Tap to water'}
                </span>
                <span className="card-mini-heart">❤️</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* ═══ Expanded Blossom Reading Modal (Glassmorphic) ═══ */}
      {activeBlossom && (
        <div
          className="blossom-modal-backdrop"
          onClick={() => setActiveBlossom(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="blossom-modal-card glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blossom-modal-header">
              <span className="modal-flower-emoji">{activeBlossom.flowerEmoji}</span>
              <div>
                <span className="memory-tag">{activeBlossom.tag}</span>
                <h3 className="blossom-modal-title">{activeBlossom.title}</h3>
              </div>
            </div>

            <div className="blossom-modal-body">
              <p>{activeBlossom.message}</p>
            </div>

            <div className="blossom-modal-footer">
              <span className="blossom-signoff">Forever yours, Divi ❤️</span>
              <button
                className="blossom-close-btn"
                onClick={() => setActiveBlossom(null)}
              >
                Close Blossom 🌸
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryGarden;
