import { Mail } from 'lucide-react';
import site from '../site.config';

/**
 * The public contact channel configured for this brand,
 * which is the same address the enquiry form sends to. Printing it is the
 * point — a visitor should be able to write to a person without filling in a
 * form first.
 *
 * There was a LinkedIn link here alongside it. These brands have no LinkedIn
 * pages, so those URLs were placeholders that had gone live — a "Connect on
 * LinkedIn" button on every page of twenty-five sites, leading nowhere. One
 * channel that works beats two where one is a dead end.
 *
 * `variant` picks the treatment: an icon-only square for the nav, a labelled
 * row for the footer and closing CTA, a full slab for the contact page.
 */
export default function Social({ variant = 'icon', className = '' }) {
  const inbox = site.contact.inbox;

  if (variant === 'icon') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={`mailto:${inbox}`}
          aria-label={`Email ${site.name} at ${inbox}`}
          title={inbox}
          className="flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-paper text-ink transition-colors hover:bg-volt"
        >
          <Mail size={17} strokeWidth={2.2} aria-hidden="true" />
        </a>
      </div>
    );
  }

  if (variant === 'row') {
    return (
      <a
        href={`mailto:${inbox}`}
        className={`inline-flex items-center gap-3 break-all text-[13.5px] font-bold text-paper transition-colors hover:text-volt ${className}`}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-volt text-ink">
          <Mail size={15} strokeWidth={2.4} aria-hidden="true" />
        </span>
        {inbox}
      </a>
    );
  }

  return (
    <a
      href={`mailto:${inbox}`}
      className={`flex items-start gap-5 border-[3px] border-ink bg-paper p-7 transition-colors hover:bg-volt ${className}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-volt">
        <Mail size={18} strokeWidth={2.4} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="b-label block text-muted">Email</span>
        {/* Not `b-display` — that uppercases, and a shouted address reads
            like a different address to anyone retyping it. */}
        <span className="mt-2 block break-words text-[1.05rem] font-extrabold text-ink">
          {inbox}
        </span>
        <span className="b-body mt-2 block text-[13px] text-ink/70">
          Write directly if you would rather not use the form. This is the same address the form
          sends to, and it is read by the people who would do the work.
        </span>
      </span>
    </a>
  );
}
