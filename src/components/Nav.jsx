import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import site from '../site.config';
import Social from './Social';

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/ai-automation', label: 'AI' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/work', label: 'Work' },
  { to: '/process', label: 'Process' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' }
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-paper">
      {/* Capability strip — what the firm does, stated before the logo. */}
      <div className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 sm:px-6 lg:px-10">
          <p className="b-label text-volt">{site.strapline}</p>
          <p className="b-mono hidden text-paper/70 sm:block">
            {site.stats[0].figure} projects · since {site.rv.since}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10">
        <Link to="/" className="flex min-w-0 shrink items-center gap-3" aria-label={`${site.name} home`}>
          <span className="b-figure flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-[14px] text-volt">
            {site.initials}
          </span>
          <span className="b-display truncate text-[17px] leading-none text-ink">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `b-label transition-colors ${
                  isActive
                    ? 'text-blazeText underline decoration-[3px] underline-offset-[6px]'
                    : 'text-ink hover:text-blazeText'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Social variant="icon" className="hidden sm:flex" />
          <Link to="/contact" className="b-btn b-btn-primary hidden !py-3 sm:inline-flex">
            Get a quote
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center border-[3px] border-ink bg-paper text-ink xl:hidden"
          >
            {open ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto border-t-[3px] border-ink bg-paper2 xl:hidden">
          <nav className="mx-auto max-w-shell px-5 py-2 sm:px-6 lg:px-10" aria-label="Mobile">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block border-b-2 border-ink/15 py-4 text-[16px] font-extrabold uppercase tracking-tight ${
                    isActive ? 'text-blazeText' : 'text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" className="b-btn b-btn-primary my-6 w-full">
              Get a quote
            </Link>
            <div className="pb-6">
              <Social variant="row" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
