import { useMemo, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

const SOURCES = ['All', 'Clutch', 'Upwork', 'Google'];

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'fill-blaze text-blazeText' : 'text-ink/20'}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/**
 * Verified reviews from the public Clutch, Upwork and Google profiles held by
 * the delivery company. Nothing here was written by us, and the attribution
 * says so — an unattributed score is worse than no score.
 */
export default function Reviews({ limit = 9, filterable = false }) {
  const [source, setSource] = useState('All');
  const [shown, setShown] = useState(limit);

  const list = useMemo(
    () => (source === 'All' ? site.reviews : site.reviews.filter((r) => r.source === source)),
    [source]
  );

  const pick = (next) => {
    setSource(next);
    setShown(limit);
  };

  return (
    <div>
      {/* Platform scores */}
      <div className="grid gap-5 sm:grid-cols-3">
        {site.badges.map((badge) => (
          <a
            key={badge.source}
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            className="b-card b-card-hover p-6"
          >
            <p className="b-label flex items-center gap-2 text-muted">
              {badge.source}
              <ArrowUpRight size={12} strokeWidth={2.6} aria-hidden="true" />
            </p>
            <p className="b-figure mt-3 text-[1.9rem] text-ink">{badge.score}</p>
            <p className="b-label mt-2 text-muted">{badge.meta}</p>
          </a>
        ))}
      </div>

      {filterable ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {SOURCES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => pick(s)}
              className={`b-label border-[3px] border-ink px-3.5 py-2 transition-colors ${
                source === s ? 'bg-ink text-volt' : 'bg-paper text-ink hover:bg-volt'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.slice(0, shown).map((review, i) => (
          <Reveal key={`${review.name}-${review.title}-${i}`} delay={(i % 3) * 70}>
            <figure className="b-card flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-4">
                <Stars rating={review.rating} />
                <span className="b-label text-muted">{review.source}</span>
              </div>

              <blockquote className="b-body mt-6 flex-1 text-[13.5px] text-ink/80">
                “{review.quote}”
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t-2 border-ink/15 pt-5">
                <span className="b-figure flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-[12px] text-volt">
                  {review.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-extrabold uppercase tracking-tight text-ink">
                    {review.name}
                  </span>
                  <span className="b-mono block truncate text-muted">
                    {[review.title, review.company].filter(Boolean).join(' · ')}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {shown < list.length ? (
        <button
          type="button"
          onClick={() => setShown((n) => n + 9)}
          className="b-btn b-btn-volt mt-8"
        >
          Show more reviews ({list.length - shown} left)
        </button>
      ) : null}

      <p className="b-body mt-8 max-w-3xl text-[12.5px] text-muted">
        Every quote above comes from a public Clutch, Upwork or Google profile. The platforms
        collect and publish these scores — we can neither edit a review nor take one down.
      </p>
    </div>
  );
}
