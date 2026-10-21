import { MapPin } from 'lucide-react';
import site from '../site.config';

/**
 * The registered entities behind this brand, printed in full.
 *
 * These are the same three companies on every site in the group, because the
 * brands share them: two US operating entities and the UK delivery company.
 * `role` says which is which, so a delivery centre is never mistaken for the
 * company you contract with.
 *
 * Single source of truth: RV_OFFICES in the generator's data/rv.mjs.
 */
export default function Offices({ variant = 'grid', className = '' }) {
  const offices = site.offices || [];

  if (variant === 'compact') {
    return (
      <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {offices.map((office) => (
          <div key={office.company}>
            <p className="flex items-center gap-2 text-[13.5px] font-bold uppercase tracking-wide text-paper">
              <MapPin size={13} strokeWidth={2.2} className="shrink-0 text-volt" aria-hidden="true" />
              {office.company}
            </p>
            <p className="b-label mt-2 text-volt">{office.role}</p>
            <address className="b-mono mt-2 not-italic leading-relaxed text-mutedInk">
              {office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${className}`}>
      {offices.map((office) => (
        <div key={office.company} className="border-[3px] border-ink bg-paper p-6">
          <p className="b-label text-blazeText">{office.role}</p>
          <p className="b-display mt-3 text-[15px] text-ink">{office.company}</p>
          <address className="b-mono mt-3 not-italic leading-relaxed text-muted">
            {office.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      ))}
    </div>
  );
}
