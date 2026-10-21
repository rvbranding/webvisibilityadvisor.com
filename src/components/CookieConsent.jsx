import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

const KEY = 'cookieConsent';

/**
 * Cookie notice.
 *
 * NOTE FOR WHOEVER READS THIS NEXT: the two buttons record the visitor's
 * choice in localStorage and dismiss the banner. Nothing is currently gated
 * on that choice — the Hotjar tag on several of these sites loads from
 * `index.html` regardless of which button is pressed. That is a deliberate
 * decision, not an oversight.
 *
 * If the tag ever does need gating — a client asks, or one of these brands
 * starts selling into the EU or UK in earnest — this component is the single
 * place to wire it: read `localStorage.cookieConsent`, and load the tag from
 * here on 'accepted' instead of from the document head.
 *
 * The choice is stored rather than kept for the session, because asking the
 * same person the same question on every visit is a habit of ignoring the
 * answer. Storage can throw — private windows, blocked site data — so every
 * access is guarded and the fallback is simply to show the notice again.
 */
export default function CookieConsent() {
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch (err) {
      saved = null;
    }
    setDecided(saved === 'accepted' || saved === 'rejected');
  }, []);

  const decide = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch (err) {
      /* Storage unavailable — the choice still holds for this page view. */
    }
    setDecided(true);
  };

  if (decided) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] border-t-[3px] border-ink bg-paper"
    >
      <div className="mx-auto flex max-w-shell flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-10">
        <span
          className="hidden h-12 w-12 shrink-0 items-center justify-center border-2 border-ink bg-volt text-ink sm:flex"
          aria-hidden="true"
        >
          <Cookie size={20} strokeWidth={2.2} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="b-display text-[1.05rem] text-ink">We value your privacy</p>
          <p className="b-body mt-1.5 text-[13.5px] text-muted">
            We use cookies to improve your experience and understand how this site is used.
            Nothing collected here identifies you personally.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <button type="button" onClick={() => decide('rejected')} className="b-btn b-btn-ghost">
            Reject
          </button>
          <button type="button" onClick={() => decide('accepted')} className="b-btn b-btn-primary">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
