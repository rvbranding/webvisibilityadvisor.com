import { useState } from 'react';
import { BadgeCheck, GraduationCap } from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

/**
 * Official platform partnerships.
 *
 * These are real, recognised partner statuses held by the delivery company —
 * the only partner claims made anywhere on this site. Everything else on the
 * technology pages is deliberately presented as "we build with", not as an
 * affiliation.
 *
 * Thinkific has no Simple Icons mark, so it uses a glyph rather than being
 * dropped from a list where it belongs.
 */
function PartnerMark({ partner }) {
  const [failed, setFailed] = useState(false);

  if (partner.slug === 'thinkific' || failed) {
    return (
      <GraduationCap size={30} strokeWidth={1.6} style={{ color: `#${partner.color}` }} aria-hidden="true" />
    );
  }

  return (
    <img
      src={`/icons/${partner.slug}-${partner.color}.svg`}
      alt=""
      width="32"
      height="32"
      loading="lazy"
      className="h-8 w-8"
      onError={() => setFailed(true)}
    />
  );
}

export default function Partners() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {site.partners.map((partner, i) => (
          <Reveal key={partner.slug} delay={(i % 6) * 60}>
            <div className="b-card b-card-hover flex h-full flex-col items-center justify-center gap-4 px-4 py-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center border-2 border-ink bg-paper">
                <PartnerMark partner={partner} />
              </span>
              <span className="text-[12.5px] font-extrabold uppercase leading-tight tracking-tight text-ink">
                {partner.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            'Direct platform support channels',
            'Early access to platform releases',
            'Certified implementation teams'
          ].map((point) => (
            <span key={point} className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-ink">
              <BadgeCheck size={15} strokeWidth={1.9} className="shrink-0 text-blazeText" aria-hidden="true" />
              {point}
            </span>
          ))}
        </div>
      </Reveal>

      <p className="b-body mt-6 max-w-3xl text-[12.5px] text-muted">
        Partner status is held by {site.rv.legal} All other platform names used across this
        site describe systems we build on and imply no affiliation.
      </p>
    </div>
  );
}
