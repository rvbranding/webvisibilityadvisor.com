import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';
import BrandLine from './BrandLine';

/**
 * Home hero: five service slides on a slow auto-advance.
 *
 * The headline, the description and the technology slab change together, so
 * the section reads as one rotating statement rather than a carousel with a
 * static heading bolted on. There is still exactly one <h1> on the page — the
 * slide swaps its contents, not the element.
 *
 * Auto-advance stops for `prefers-reduced-motion`, while the tab is hidden,
 * and permanently once the visitor takes manual control.
 */
const SLIDE_MS = 7500;

function TechMark({ tech }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-paper">
      {failed ? (
        <span className="b-figure text-[13px] text-ink">{tech.label.charAt(0)}</span>
      ) : (
        <img
          src={`/icons/${tech.slug}-${tech.color}.svg`}
          alt=""
          width="20"
          height="20"
          loading="lazy"
          className="h-5 w-5"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export default function Hero() {
  const slides = site.heroSlides;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const holdRef = useRef(false);

  const go = (next) => {
    holdRef.current = true;
    setHeld(true);
    setActive((next + slides.length) % slides.length);
  };

  useEffect(() => {
    if (held || slides.length < 2) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const id = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      if (holdRef.current) return;
      setActive((a) => (a + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [held, slides.length]);

  const slide = slides[active];

  return (
    <section className="relative overflow-hidden border-b-[3px] border-ink bg-paper">
      <div className="pointer-events-none absolute inset-0 b-grid" aria-hidden="true" />

      <div className="relative mx-auto max-w-shell px-5 pb-16 pt-12 sm:px-6 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          {/* ---------------- Left: rotating statement ---------------- */}
          <div>
            <Reveal>
              <span className="b-label inline-flex flex-wrap items-center gap-2 border-[3px] border-ink bg-volt px-3 py-1.5 text-ink">
                <Star size={13} className="fill-ink text-ink" aria-hidden="true" />
                {site.hero.eyebrow} · since {site.rv.since}
              </span>
            </Reveal>

            {/* Fixed min-height so the controls below do not jump between slides. */}
            <div className="min-h-[17.5rem] sm:min-h-[15rem] lg:min-h-[16.5rem]">
              <h1 className="b-display mt-7 text-[2.1rem] text-ink sm:text-[3.1rem] lg:text-[4rem]">
                <span key={`lead-${active}`} className="block b-fade">
                  {slide.lead} <span className="text-blazeText">{slide.accent}</span>
                </span>
              </h1>

              <p key={`desc-${active}`} className="b-body b-fade mt-6 max-w-xl text-[15.5px] text-muted">
                {slide.description}
              </p>
            </div>

            {/* Slide controls */}
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2" role="tablist" aria-label="Featured services">
                {slides.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={s.name}
                    onClick={() => go(i)}
                    className={`h-2 border-2 border-ink transition-all duration-500 ${
                      i === active ? 'w-10 bg-blaze' : 'w-4 bg-paper hover:bg-volt'
                    }`}
                  />
                ))}
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous service"
                  className="flex h-10 w-10 items-center justify-center border-[3px] border-ink bg-paper text-ink transition-colors hover:bg-volt"
                >
                  <ChevronLeft size={17} strokeWidth={2.6} />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next service"
                  className="flex h-10 w-10 items-center justify-center border-[3px] border-ink bg-paper text-ink transition-colors hover:bg-volt"
                >
                  <ChevronRight size={17} strokeWidth={2.6} />
                </button>
              </div>
            </div>

            <Reveal delay={120}>
              <ul className="mt-9 space-y-3">
                {site.hero.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[14px] font-medium text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-ink text-volt">
                      <Check size={12} strokeWidth={3.5} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link to="/contact" className="b-btn b-btn-primary">
                  Start your project
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
                <Link to="/work" className="b-btn b-btn-ghost">
                  View our work
                </Link>
              </div>
            </Reveal>

            {/* Third-party scores, which belong to the delivery company. */}
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t-2 border-ink/15 pt-7">
                {site.badges.map((badge) => (
                  <a
                    key={badge.source}
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-ink transition-colors hover:text-blazeText"
                  >
                    <Star size={13} className="fill-blaze text-blazeText" aria-hidden="true" />
                    {badge.source} {badge.score}
                    <ArrowUpRight
                      size={12}
                      strokeWidth={2.6}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------------- Right: slab synced to the slide ---------------- */}
          <Reveal delay={160}>
            <div className="border-[3px] border-ink bg-ink p-6 shadow-[10px_10px_0_0_theme(colors.blaze)] lg:p-7">
              <div className="flex items-center justify-between gap-4 border-b-2 border-paper/25 pb-5">
                <div className="min-w-0">
                  <p className="b-label text-volt">Featured service</p>
                  <p key={`name-${active}`} className="b-display mt-1.5 truncate text-[16px] text-paper">
                    {slide.name}
                  </p>
                </div>
                <span className="b-mono shrink-0 border-2 border-paper/30 px-2.5 py-1 text-paper/80">
                  {active + 1} / {slides.length}
                </span>
              </div>

              <p className="b-label mt-6 text-volt">Built with</p>
              <div key={`tech-${active}`} className="b-fade mt-3 grid grid-cols-2 gap-2.5">
                {slide.tech.map((tech) => (
                  <div
                    key={tech.label}
                    className="flex items-center gap-2.5 border-2 border-paper/20 px-2.5 py-2"
                  >
                    <TechMark tech={tech} />
                    <span className="truncate text-[12.5px] font-bold text-paper/85">
                      {tech.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* The track record. Identical on every one of these sites. */}
              <div className="mt-7 grid grid-cols-2 gap-px border-t-2 border-paper/20 bg-paper/20 pt-px">
                {site.stats.map((stat) => (
                  <div key={stat.label} className="bg-ink px-4 py-4">
                    <p className="b-figure text-[1.6rem] text-volt">{stat.figure}</p>
                    <p className="b-label mt-1.5 text-mutedInk">{stat.label}</p>
                  </div>
                ))}
              </div>

              <BrandLine className="b-mono mt-5 text-mutedInk" linkClassName="text-volt" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
