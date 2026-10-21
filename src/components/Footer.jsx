import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import site from '../site.config';
import Social from './Social';
import Offices from './Offices';
import { trustedCountries } from './Flags';
import BrandLine from './BrandLine';

const COLUMNS = [
  {
    heading: 'Services',
    links: [
      { to: '/services', label: 'All services' },
      { to: '/services#ecommerce', label: 'E-commerce' },
      { to: '/services#custom', label: 'Custom development' },
      { to: '/ai-automation', label: 'AI & automation' },
      { to: '/services#crm', label: 'CRM & ERP' },
      { to: '/services#mobile', label: 'Mobile apps' }
    ]
  },
  {
    heading: 'How we work',
    links: [
      { to: '/process', label: 'Delivery process' },
      { to: '/process#engagements', label: 'Engagement models' },
      { to: '/process#standards', label: 'Engineering standards' },
      { to: '/solutions', label: 'Industry solutions' },
      { to: '/work', label: 'Our work' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/about#reviews', label: 'Reviews' },
      { to: '/pricing', label: 'Packages' },
      { to: '/pricing#faq', label: 'Pricing FAQ' },
      { to: '/contact', label: 'Request a quote' }
    ]
  }
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-ink bg-ink">
      {/* Capability slab — the last thing on every page. */}
      <div className="border-b-[3px] border-paper/20 bg-volt">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-6 lg:px-10">
          <p className="b-display text-[1.4rem] text-ink sm:text-[2.1rem]">{site.strapline}</p>
          <Link to="/contact" className="b-btn b-btn-ghost">
            Start a conversation
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-shell px-5 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="b-figure flex h-10 w-10 items-center justify-center bg-volt text-[14px] text-ink">
                {site.initials}
              </span>
              <span className="b-display text-[17px] text-paper">{site.name}</span>
            </Link>

            <BrandLine className="b-mono mt-4 text-volt" linkClassName="font-bold" />

            {/* Who we are, in one paragraph, worded the same on every site. */}
            <p className="b-body mt-6 max-w-sm text-[14px] text-paper/70">
              {site.name} is the digital agency brand of{' '}
              <a
                href={site.rv.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-volt underline-offset-2 hover:underline"
              >
                {site.rv.legal}
              </a>
              , delivering digital products since {site.rv.since}. Conversion-focused websites,
              scalable apps and the business systems that keep them running.
            </p>

            <div className="mt-8">
              <Social variant="row" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="b-label text-volt">{col.heading}</p>
              <ul className="mt-6 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[13.5px] text-paper/75 transition-colors hover:text-volt"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Where the delivery company's clients are. Same list on every site. */}
        <div className="mt-14 border-t-2 border-paper/20 pt-10">
          <p className="b-label text-volt">Trusted by businesses across</p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {trustedCountries.map(({ label, Flag }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 border-2 border-paper/25 px-3.5 py-2 text-[12.5px] font-bold uppercase tracking-wide text-paper/80"
              >
                <Flag className="h-3.5 w-5" />
                {label}
              </li>
            ))}
            <li className="b-mono self-center px-1 text-mutedInk">&amp; more</li>
          </ul>
        </div>

        {/* Who you actually contract with. */}
        <div className="mt-14 border-t-2 border-paper/20 pt-10">
          <p className="b-label text-volt">Registered offices</p>
          <Offices variant="compact" className="mt-8" />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t-2 border-paper/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="b-mono text-mutedInk">
            © {year} {site.name}. All rights reserved.
          </p>
          <BrandLine className="b-mono text-volt" linkClassName="font-bold" />
        </div>

        <p className="b-body mt-4 text-[11.5px] leading-6 text-mutedInk">
          All product and platform names are trademarks of their respective owners, used for
          identification only. {site.name} provides independent implementation, integration and
          support services and is not affiliated with, endorsed by, or an official partner of any
          platform vendor named on this site.
        </p>
      </div>
    </footer>
  );
}
