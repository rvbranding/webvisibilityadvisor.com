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

  useEffect(() => {
    setPlay(true);
  }, []);

  useEffect(() => {
    if (!play) return;
    const video = ref.current;
    if (!video) return;
    const startPlayback = () => {
      video.play().catch((error) => {
        console.warn('Homepage background video could not autoplay:', error);
      });
    };
    const resumePlayback = () => {
      if (!document.hidden && video.paused) startPlayback();
    };
    startPlayback();
    document.addEventListener('visibilitychange', resumePlayback);
    return () => document.removeEventListener('visibilitychange', resumePlayback);
  }, [play]);

  return (
    <section className="relative border-b-[3px] border-ink bg-ink">
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <video
          ref={ref}
          className="h-full w-full object-cover opacity-70"
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
