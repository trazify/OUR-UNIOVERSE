import React, { useState, useCallback, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import ParticleHeart from './components/ParticleHeart';
import LoveLetter from './components/LoveLetter';
import SanrioScene from './components/SanrioScene';
import MemoryGarden from './components/MemoryGarden';
import BackgroundMusic from './components/BackgroundMusic';
import SecretSurprise from './components/SecretSurprise';
import SanrioCursor from './components/SanrioCursor';
import MovableNote from './components/MovableNote';
import MissYouBanner from './components/MissYouBanner';
import FloatingHeader from './components/FloatingHeader';
import { SanrioBow } from './components/PixelSprites';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [letterOpen, setLetterOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Ensure theme is always velvet dark mode
  useEffect(() => {
    localStorage.removeItem('project_anvi_theme');
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('theme-light');
  }, []);

  const handleEnterWorld = useCallback(() => {
    setShowIntro(false);
  }, []);

  const openLetter = useCallback(() => setLetterOpen(true), []);
  const closeLetter = useCallback(() => setLetterOpen(false), []);

  if (showIntro) {
    return <IntroScreen onEnter={handleEnterWorld} />;
  }

  return (
    <div className="app-main entering">
      {/* Automatic Background Audio Player (Daniel Caesar - Streetcar) with muted state sync */}
      <BackgroundMusic
        autoPlayTrigger={!showIntro}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        hideFloatingWidget={true}
      />

      {/* Sanrio-Themed Custom Cursor & Sparkle Trail */}
      <SanrioCursor />

      {/* ═══ Hero Section: Translucent Note ABOVE the Heart ═══ */}
      <section className="hero-section" aria-label="Hero section with maroon particle heart">
        {/* Background Fullscreen Canvas Heart (Increased Size, Complete Maroon, with Hello Kitty & Kuromi) */}
        <ParticleHeart />

        {/* Unified Floating Glass Island Header with Hello Kitty, Kuromi, Nav Pills & Audio Toggle */}
        <FloatingHeader
          onOpenLetter={openLetter}
          onScrollToGarden={() => {
            const el = document.querySelector('.memory-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />

        {/* Movable Translucent Note Responding to Cursor & Drag */}
        <MovableNote onOpenLetter={openLetter} />

        {/* Bottom Scroll Down Request & Secret Surprise */}
        <div className="hero-scroll-wrapper">
          <button
            className="hero-scroll-cue"
            onClick={() => {
              const el = document.querySelector('.sanrio-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Scroll down to explore"
          >
            <span className="scroll-cue-text">Scroll Down</span>
            <span className="scroll-cue-arrow" aria-hidden="true">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </span>
          </button>
          <div className="hero-hint-sub">
            <SecretSurprise threshold={5} />
            {' '}made with all my love for Anvi
          </div>
        </div>
      </section>

      {/* ═══ Sanrio Scene (Hello Kitty, Kuromi & Fixed Gift Box) ═══ */}
      <SanrioScene />

      {/* ═══ Our Little Garden (100% Human, Genuine Memories) ═══ */}
      <MemoryGarden />

      {/* ═══ 'I MISS YOU ALOT' Text Animation with Blinking Cursor ═══ */}
      <MissYouBanner />

      {/* ═══ Footer ═══ */}
      <footer className="site-footer">
        <div className="footer-bow-row" aria-hidden="true">
          <SanrioBow size={26} />
          <span className="footer-hearts">❤️ ❤️ ❤️</span>
          <SanrioBow size={26} />
        </div>
        <div className="footer-text">PROJECT ANVI</div>
        <div className="footer-subtitle">
          Built with all my heart, for my favourite person ❤️
        </div>
      </footer>

      {/* ═══ Love Letter Modal (Glassmorphic) ═══ */}
      <LoveLetter open={letterOpen} onClose={closeLetter} />
    </div>
  );
};

export default App;
