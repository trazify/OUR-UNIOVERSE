import React, { useEffect, useRef, useState } from 'react';

interface BackgroundMusicProps {
  autoPlayTrigger: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
  hideFloatingWidget?: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

const YOUTUBE_VIDEO_ID = 'HbFGEsarSTE';

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  autoPlayTrigger,
  isMuted: externalMuted,
  onToggleMute: externalToggleMute,
  hideFloatingWidget = false,
}) => {
  const [internalMuted, setInternalMuted] = useState(false);
  const isMuted = externalMuted !== undefined ? externalMuted : internalMuted;
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerId = 'youtube-bg-audio-container';

  useEffect(() => {
    // 1. Load YouTube IFrame API if not already present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(containerId, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            try {
              event.target.setVolume(85);
              event.target.playVideo();
            } catch (err) {
              console.warn('YouTube autoplay waiting for user gesture:', err);
            }
          },
          onStateChange: (event: any) => {
            // Replay automatically when ended for infinite loop
            if (event.data === 0) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }
  }, []);

  // Play automatically as soon as autoPlayTrigger is true
  useEffect(() => {
    if (autoPlayTrigger && playerRef.current && isReady) {
      try {
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('Auto play trigger error:', err);
      }
    }
  }, [autoPlayTrigger, isReady]);

  // First user interaction listener to unblock audio autoplay if restricted by browser
  useEffect(() => {
    const handleGesture = () => {
      if (playerRef.current && isReady) {
        try {
          playerRef.current.playVideo();
        } catch {
          // Ignore
        }
      }
      window.removeEventListener('pointerdown', handleGesture);
    };

    window.addEventListener('pointerdown', handleGesture);
    return () => window.removeEventListener('pointerdown', handleGesture);
  }, [isReady]);

  // Sync mute state with player when isMuted changes
  useEffect(() => {
    if (!playerRef.current || !isReady) return;
    try {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(85);
      }
    } catch (err) {
      console.warn('Sync mute state error:', err);
    }
  }, [isMuted, isReady]);

  const toggleMute = () => {
    if (externalToggleMute) {
      externalToggleMute();
      return;
    }
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(85);
        setInternalMuted(false);
      } else {
        playerRef.current.mute();
        setInternalMuted(true);
      }
    } catch (err) {
      console.warn('Toggle mute error:', err);
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame offscreen (1px x 1px with active viewport) */}
      <div
        style={{
          position: 'fixed',
          top: '-200px',
          left: '-200px',
          width: '200px',
          height: '200px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div id={containerId} />
      </div>

      {/* Top-Right Glassmorphic Sound Widget (hidden when integrated in floating header dock) */}
      {!hideFloatingWidget && (
        <div className="top-right-sound-widget" aria-label="Sound control">
          <button
            className="sound-mute-btn glass-panel icon-only-mute"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute Daniel Caesar - Streetcar' : 'Mute music'}
          >
            <span className="sound-icon" aria-hidden="true">
              {isMuted ? '🔇' : '🔊'}
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
