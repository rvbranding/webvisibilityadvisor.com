import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from './Reveal';

/** The standing hero for every page other than the home page. */
export default function PageHero({
  eyebrow,
  title,
  standfirst,
  points = [],
  primary = 'Request a proposal',
  primaryTo = '/contact',
  secondary,
  secondaryTo = '/pricing'
}) {
  return (
    <section className="relative border-b-[3px] border-ink bg-paper">
      <div className="pointer-events-none absolute inset-0 b-grid" aria-hidden="true" />

      <div className="relative mx-auto max-w-shell px-6 py-14 lg:px-10 lg:py-20">
        <Reveal>
          <span className="b-label inline-block border-[3px] border-ink bg-volt px-3 py-1.5 text-ink">
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="b-display mt-8 max-w-4xl text-[2.3rem] text-ink sm:text-[3.2rem] lg:text-[4.2rem]">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="b-body mt-8 max-w-2xl text-[16px] text-muted">{standfirst}</p>
        </Reveal>

        {points.length ? (
          <Reveal delay={200}>
            <ul className="mt-10 grid gap-3 border-t-[3px] border-ink pt-8 sm:grid-cols-3 sm:gap-6">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[13.5px] font-medium">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-ink text-volt">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link to={primaryTo} className="b-btn b-btn-primary">
              {primary}
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            {secondary ? (
              <Link to={secondaryTo} className="b-btn b-btn-ghost">
                {secondary}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
