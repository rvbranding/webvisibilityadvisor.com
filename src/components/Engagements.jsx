import { Link } from 'react-router-dom';
import { Target, Users, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

const ICONS = { Target, Users, UserPlus, ShieldCheck };

/**
 * How the work is structured commercially — fixed scope, dedicated team,
 * augmentation or managed service. This is the question buyers ask after
 * "what do you do" and before anything about money, so it sits on the
 * services page and again on the process page.
 */
export default function Engagements() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {site.engagements.map((model, i) => {
        const Icon = ICONS[model.icon] || Target;

        return (
          <Reveal key={model.name} delay={(i % 2) * 90}>
            <article className="b-card flex h-full flex-col p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center bg-ink text-volt">
                  <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="b-figure text-[1.6rem] text-ink/15">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="b-display mt-7 text-[1.35rem] text-ink">{model.name}</h3>

              <p className="b-label mt-3 text-blazeText">Best for: {model.best}</p>

              <p className="b-body mt-5 flex-1 text-[13.5px] text-muted">{model.body}</p>

              <ul className="mt-7 space-y-2.5 border-t-2 border-ink/15 pt-6">
                {model.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[13px] leading-[1.7] text-ink/80">
                    <span className="shrink-0 font-black text-blazeText">·</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wide text-ink hover:text-blazeText"
              >
                Talk about this model
                <ArrowRight size={14} strokeWidth={2.6} aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
