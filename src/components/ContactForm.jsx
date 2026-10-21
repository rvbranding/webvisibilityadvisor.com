import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import site from '../site.config';
import Social from './Social';

/**
 * The enquiry posts to RV's own intake endpoint — the same one
 * blazemediaagency.com and absoftwarestudio.com use, with the same field
 * names — so every brand's enquiries land in one place in one shape.
 *
 * The previous route was Web3Forms behind a build-time key. No site had the
 * key set, so every form on all twenty-five sites silently degraded to a
 * pre-filled `mailto:` — which reaches the inbox only if the visitor has a
 * mail client and then chooses to press send. This route does not depend on
 * either.
 */
const ENDPOINT = 'https://api.workflowworks.com/api/submit';

/** The eight service categories the rest of the site sells, plus an opt-out. */
const SERVICE_OPTIONS = [...site.services.map((s) => s.label), 'Not sure yet'];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    // Arithmetic rather than a captcha: no third-party script, no cookie, and
    // it stops the volume of bot traffic these sites actually get.
    if (String(data.get('verification') || '').trim() !== '7') {
      setError('Verification failed — 5 + 2 = 7.');
      return;
    }

    setError('');
    setLoading(true);

    const payload = {
      name: String(data.get('name') || '').trim(),
      company: String(data.get('company') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      serviceRequired: String(data.get('serviceRequired') || '').trim(),
      message: String(data.get('message') || '').trim(),
      domain: site.domain,
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        form.reset();
        setSent(true);
      } else {
        setError('Submission failed. Please try again, or write to us directly at');
      }
    } catch (err) {
      setError('Network error. Please try again, or write to us directly at');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="b-card p-7 lg:p-9">
        <span className="flex h-11 w-11 items-center justify-center bg-ink text-volt">
          <Check size={20} strokeWidth={3} />
        </span>

        <h3 className="b-display mt-7 text-[1.4rem] text-ink">Enquiry sent.</h3>

        <p className="b-body mt-4 text-[14px] text-muted">
          Thanks for getting in touch. We will reply within one working day with either a scope and
          a delivery sequence, or a question if something is unclear.
        </p>

        <p className="b-body mt-5 text-[13.5px] text-muted">
          If you would rather add something, these reach the same people.
        </p>

        <div className="mt-6">
          <Social variant="row" />
        </div>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wide text-ink hover:text-blazeText"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="b-card p-6 sm:p-8 lg:p-9">
      <p className="b-label text-muted">Project enquiry</p>

      <div className="mt-8 grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="b-label text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="b-field mt-2"
            placeholder="Jordan Ellis"
          />
        </div>

        <div>
          <label htmlFor="company" className="b-label text-ink">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="b-field mt-2"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="b-label text-ink">
            Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="b-field mt-2"
            placeholder="jordan@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="b-label text-ink">
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="b-field mt-2"
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div className="mt-7">
        <label htmlFor="serviceRequired" className="b-label text-ink">
          Service required
        </label>
        <select
          id="serviceRequired"
          name="serviceRequired"
          required
          defaultValue=""
          className="b-field mt-2"
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICE_OPTIONS.map((label) => (
            <option key={label}>{label}</option>
          ))}
        </select>
      </div>

      <div className="mt-7">
        <label htmlFor="message" className="b-label text-ink">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="b-field mt-2 resize-none"
          placeholder="The problem, the systems it touches, what you have already tried, and any deadline we should know about."
        />
      </div>

      <div className="mt-7">
        <label htmlFor="verification" className="b-label text-ink">
          Verification — what is 5 + 2?
        </label>
        <input
          id="verification"
          name="verification"
          type="text"
          required
          inputMode="numeric"
          autoComplete="off"
          className="b-field mt-2"
          placeholder="Answer"
        />
      </div>

      {error ? (
        <p role="alert" className="b-body mt-7 border-2 border-ink bg-paper2 p-4 text-[13.5px] text-ink">
          {error}{' '}
          <a href={`mailto:${site.contact.inbox}`} className="font-bold underline">
            {site.contact.inbox}
          </a>
        </p>
      ) : null}

      <button type="submit" disabled={loading} className="b-btn b-btn-primary mt-9 w-full disabled:opacity-60">
        {loading ? 'Sending…' : 'Send enquiry'}
        <ArrowRight size={15} strokeWidth={2.5} />
      </button>

      <p className="b-mono mt-6 text-muted">
        We reply within one working day. Nothing is shared with anyone outside {site.name}.
      </p>
    </form>
  );
}
