import React, { useState } from 'react';
import { MUSIC_CONFIG } from '../data/musicConfig';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const eqBars = [8, 14, 6, 18, 10, 14, 8];

  const handlePlay = () => {
    // Open Spotify in a new tab
    window.open(MUSIC_CONFIG.externalUrl, '_blank', 'noopener');
    setIsPlaying(true);
  };

  return (
    <section className="music-section" aria-label="Music player">
      <div className="music-player">
        {/* Vinyl disc */}
        <div className={`music-vinyl ${isPlaying ? 'spinning' : ''}`} aria-hidden="true">
          <div className="music-vinyl-center" />
        </div>

        {/* Track info */}
        <div className="music-title">
          {MUSIC_CONFIG.title} — {MUSIC_CONFIG.artist}
        </div>
        <div className="music-subtitle">{MUSIC_CONFIG.subtitle}</div>

        {/* Equalizer */}
        <div className="music-equalizer" aria-hidden="true">
          {eqBars.map((h, i) => (
            <div
              key={i}
              className={`eq-bar ${isPlaying ? 'active' : ''}`}
              style={{ height: isPlaying ? undefined : `${h}px` }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="music-controls">
          <button className="music-play-btn" onClick={handlePlay}>
            {isPlaying ? '♪ Playing...' : '▶ Listen to Our Song'}
          </button>
        </div>

        <a
          href={MUSIC_CONFIG.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="music-external-link"
        >
          Open on Spotify ↗
        </a>
      </div>
    </section>
  );
};

export default MusicPlayer;
