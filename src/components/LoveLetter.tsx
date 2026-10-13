import React, { useEffect, useState } from 'react';
import { SanrioBow } from './PixelSprites';

interface LoveLetterProps {
  open: boolean;
  onClose: () => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ open, onClose }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open');
      document.body.style.top = `-${window.scrollY}px`;
    }
    return () => {
      document.body.classList.remove('modal-open');
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [open]);

  if (!open && !closing) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 350);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className={`letter-overlay ${closing ? 'closing' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Love letter from Divi to Anvi"
    >
      <div className="letter-card glass-panel translucent-letter">
        {/* Pixel corners */}
        <div className="letter-corner letter-corner--tl" aria-hidden="true" />
        <div className="letter-corner letter-corner--tr" aria-hidden="true" />
        <div className="letter-corner letter-corner--bl" aria-hidden="true" />
        <div className="letter-corner letter-corner--br" aria-hidden="true" />

        {/* Top Sanrio decoration */}
        <div className="letter-header">
          <div className="letter-sanrio-bar">
            <SanrioBow size={32} />
            <span className="letter-badge-text">Divi's Personal Note</span>
            <SanrioBow size={32} />
          </div>

          <div className="letter-greeting">
            My pretty baby, my bhondu, my love, my Anvi. ❤️
          </div>
        </div>

        <div className="letter-body">
          <p>
            I know things have been feeling a little distant between us lately,
            but I wanted to make this for you to remind you of one simple truth.
          </p>
          <p>
            Even with all these miles, silence, or busy days, they don't change
            how deeply I care about you. You're still my pyara sa bhondu sa
            bachcha, and my love and affection for you isn't gonna change even a
            little bit because of all this.
          </p>
          <p>
            And yeah, I might feel distant. I might feel that you're distant, and
            I might feel lonely, and yeah, I might beg for your affection, but at
            the end of the day, I know you love me, and I know that I love you
            even more than that. So I know things will work out for us if we both
            try our best. ❤️
          </p>
          <p>
            And I know some days don't go the way we want them to, and some
            things feel frustrating, overwhelming, or just unfair sometimes
            because of a mom not letting you go out for Garba. I know your mood
            has been really bad because of that as well, and I don't blame you
            for that.
          </p>
          <p>
            You don't have to be happy every second, and you don't need to
            pretend that you're okay and act tough around me. I know when you're
            upset and when something is wrong with you. I need you to come to me
            whenever you feel low. I don't want you to feel attacked by me. I
            want you to be your safe space.
          </p>
          <p>
            I love the way you laugh, your little quirks, and how sweet you are,
            and all the tiny things that make you you.
          </p>
          <p>
            No matter hum kitne bhi door ho, I'm always gonna be grateful that
            hamare paths cross hue, and whenever you need a little reminder that
            someone is rooting for you, I hope you remember me anytime, every
            time.
          </p>

          <div className="letter-signature">
            <p>Your favorite person,</p>
            <p><strong>Your Divi. ❤️</strong></p>
          </div>
        </div>

        <div className="letter-footer">
          <button
            className="letter-close-btn"
            onClick={handleClose}
            aria-label="Close letter"
          >
            Keep Close to My Heart ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
