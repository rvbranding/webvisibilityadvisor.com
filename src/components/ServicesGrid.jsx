import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Monitor,
  Code2,
  Sparkles,
  Bot,
  Smartphone,
  Megaphone,
  Mail,
  ArrowRight
} from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

// Named explicitly rather than resolved from the whole icon package, so the
// bundle only carries the eight glyphs the site actually renders.
const ICONS = { ShoppingCart, Monitor, Code2, Sparkles, Bot, Smartphone, Megaphone, Mail };

/** Small platform mark. Renders nothing at all if the file is missing. */
function Logo({ mark }) {
  const [failed, setFailed] = useState(false);
  const [slug, color] = mark.split('-');

  if (failed) return null;

  return (
    <span className="flex h-14 w-14 items-center justify-center border-2 border-ink bg-paper">
      <img
        src={`/icons/${slug}-${color}.svg`}
        alt=""
        width="28"
        height="28"
        loading="lazy"
        className="h-7 w-7"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

/**
 * The eight service categories, shared verbatim across every brand — a brand
 * changes the order it presents them in, never the catalogue itself.
 *
 * `detailed` switches between the home-page summary and the services-page
 * treatment, which lists every sub-service under each category.
 */
export default function ServicesGrid({ detailed = false, limit }) {
  const services = limit ? site.services.slice(0, limit) : site.services;

  if (detailed) {
    return (
      <div className="space-y-6">
        {services.map((service, i) => {
          const Icon = ICONS[service.icon] || Code2;

          return (
            <Reveal key={service.id}>
              <article id={service.id} className="b-card scroll-mt-32 p-7 lg:p-9">
                <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center bg-ink text-volt">
                        <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <span className="b-figure text-[1.8rem] text-ink/15">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="b-display mt-6 text-[1.7rem] text-ink sm:text-[2.1rem]">
                      {service.label}
                    </h3>

                    <p className="b-body mt-5 max-w-md text-[14px] text-muted">
                      {service.description}
                    </p>

                    {service.logos?.length ? (
                      <div className="mt-7 flex flex-wrap items-center gap-2">
                        {service.logos.map((mark) => (
                          <Logo key={mark} mark={mark} />
                        ))}
                      </div>
                    ) : null}

                    <Link
                      to="/contact"
                      className="mt-8 inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-wide text-ink hover:text-blazeText"
                    >
                      Discuss {service.label.toLowerCase()}
                      <ArrowRight size={14} strokeWidth={2.6} />
                    </Link>
                  </div>

                  <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {service.services.map((item) => (
                      <li key={item.title} className="border-t-2 border-ink/15 pt-5">
                        <p className="text-[13.5px] font-extrabold uppercase tracking-tight text-ink">
                          {item.title}
                        </p>
                        <p className="b-body mt-2 text-[12.5px] text-muted">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {services.map((service, i) => {
        const Icon = ICONS[service.icon] || Code2;

        return (
          <Reveal key={service.id} delay={(i % 4) * 80}>
            <article
              className={`b-card b-card-hover flex h-full flex-col p-6 ${
                i % 3 === 1 ? 'b-card-volt' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center bg-ink text-volt">
                  <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="b-figure text-[1.5rem] text-ink/15">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="b-display mt-6 text-[1.1rem] text-ink">{service.label}</h3>

              <p className="b-body mt-4 flex-1 text-[13px] text-ink/75">{service.description}</p>

              {service.logos?.length ? (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {service.logos.map((mark) => (
                    <Logo key={mark} mark={mark} />
                  ))}
                </div>
              ) : null}

              <Link
                to={`/services#${service.id}`}
                className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-extrabold uppercase tracking-wide text-ink hover:text-blazeText"
              >
                What's included
                <ArrowRight size={13} strokeWidth={2.6} />
              </Link>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
