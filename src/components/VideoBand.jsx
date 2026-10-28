import { useEffect, useRef, useState } from 'react';
import site from '../site.config';
import BrandLine from './BrandLine';

/**
 * Full-bleed video band.
 *
 * The poster paints immediately, then the video starts as soon as the band
 * mounts unless reduced motion is enabled.
 */
export default function VideoBand() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, []);

  useEffect(() => {
    if (!play) return;
    const video = ref.current;
    if (!video) return;
    // React only sets `muted` as a property; Firefox and Safari also want the
    // attribute and defaultMuted before they treat autoplay as silent.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    const startPlayback = () => {
      if (!video.paused || document.hidden) return;
      video.play().catch((error) => {
        // Some browsers (Firefox with autoplay blocked) refuse until the
        // visitor interacts; fall back to the looping animated image.
        if (error?.name === 'NotAllowedError') setBlocked(true);
        console.warn('Homepage background video could not autoplay:', error);
      });
    };
    // Browsers that refuse the first attempt (background tab, strict autoplay
    // policy) usually allow it once the tab is visible or the visitor interacts.
    const retryOn = ['visibilitychange', 'pointerdown', 'keydown', 'touchstart', 'scroll'];
    const onPlaying = () => setBlocked(false);
    startPlayback();
    video.addEventListener('playing', onPlaying);
    video.addEventListener('canplay', startPlayback);
    retryOn.forEach((name) => document.addEventListener(name, startPlayback, { passive: true }));
    return () => {
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('canplay', startPlayback);
      retryOn.forEach((name) => document.removeEventListener(name, startPlayback));
    };
  }, [play]);

  return (
    <section className="relative border-b-[3px] border-ink bg-ink">
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <video
          ref={ref}
          className={`h-full w-full object-cover ${blocked ? 'opacity-0' : 'opacity-70'}`}
          poster="/media/hero-poster.webp"
          src={play ? '/media/team-collab.mp4' : undefined}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Animated images are exempt from autoplay rules, so browsers that block
            the video still show the footage looping on its own. */}
        {blocked && (
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            src="/media/team-collab-loop.webp"
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-shell px-5 pb-8 sm:px-6 lg:px-10">
            <p className="b-label text-volt">Inside the team</p>
            <p className="b-display mt-3 max-w-3xl text-[1.5rem] text-paper sm:text-[2.2rem]">
              {site.rv.projects} projects, delivered by people you will actually meet.
            </p>
            <BrandLine className="b-mono mt-3 text-mutedInk" linkClassName="text-volt" />
          </div>
        </div>
      </div>
    </section>
  );
}
