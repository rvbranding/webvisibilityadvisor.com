import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

/**
 * Pricing is presented per service line rather than as one ladder, because an
 * e-commerce build and an AI pilot are not points on the same scale.
 *
 * All four lines are rendered stacked rather than behind tabs. A price hidden
 * behind a tab is a price the reader has to go looking for, and the whole
 * argument of this page is that nothing is hidden — the quick-links below the
 * intro jump between the lines instead.
 *
 * Every tier prints its own arithmetic: hours × the published rate = price.
 * The hour figure is derived in scripts/content.mjs, never typed by hand, so
 * the sum on the page cannot drift away from the price above it.
 */

function TierCard({ tier, index, delay }) {
  const featured = tier.popular;

  return (
    <Reveal delay={delay}>
      <div
        className={`b-card flex h-full flex-col ${featured ? '!bg-ink' : ''}`}
      >
        <div
          className={`flex items-baseline justify-between gap-4 border-b-[3px] px-6 py-4 ${
            featured ? 'border-paper/25 bg-volt' : 'border-ink'
          }`}
        >
          <h4 className="b-title text-[1.15rem] text-ink">{tier.name}</h4>
          {featured ? (
            <span className="b-mono font-bold text-ink">Most chosen</span>
          ) : (
            <span className="b-mono text-muted">{String(index + 1).padStart(2, '0')}</span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          {/* Fixed minimum height so the price baseline lines up across tiers. */}
          <p
            className={`min-h-[3.2rem] text-[13.5px] leading-[1.6] ${
              featured ? 'text-paper/70' : 'text-muted'
            }`}
          >
            {tier.summary}
          </p>

          <p className="mt-7">
            <span
              className={`b-figure block text-[2.5rem] ${
                featured ? 'text-volt' : 'text-ink'
              }`}
            >
              {tier.price}
            </span>
            <span
              className={`b-mono mt-2.5 block ${featured ? 'text-mutedInk' : 'text-muted'}`}
            >
              {tier.cadence}
            </span>
          </p>

          {/* The arithmetic, printed. */}
          <p
            className={`b-mono mt-5 flex items-center gap-2 border-2 px-3 py-2 font-bold ${
              featured ? 'border-volt text-volt' : 'border-ink text-ink'
            }`}
          >
            <Calculator size={12} strokeWidth={2.5} className="shrink-0" />
            {tier.hours === null
              ? `quoted at $${site.rate}/hr`
              : `${tier.hours} h × $${site.rate}/hr`}
          </p>

          <ul
            className={`mt-7 flex-1 space-y-2 border-t-2 pt-6 ${
              featured ? 'border-paper/20' : 'border-ink/15'
            }`}
          >
            {tier.features.map((feature) => (
              <li
                key={feature}
                className={`flex gap-2.5 text-[13px] leading-[1.6] ${
                  featured ? 'text-paper/85' : 'text-ink'
                }`}
              >
                <span className={featured ? 'text-volt' : 'text-blazeText'}>▸</span>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className={`b-label mt-7 inline-flex items-center gap-2 ${
              featured ? 'text-volt hover:text-paper' : 'text-blazeText hover:text-ink'
            }`}
          >
            {tier.hours === null ? 'Request a quote' : 'Get started'}
            <ArrowRight size={13} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function PricingTables() {
  const { lines, rateNote } = site.pricing;

  return (
    <section className="border-b-[3px] border-ink bg-paper">
      <div className="mx-auto max-w-shell px-6 py-20 lg:px-10">
        {/* ---- The rate itself, before any package ---- */}
        <div id="rate" className="scroll-mt-32">
          <SectionHead
            index="01"
            label="The rate"
            title={`One rate. $${site.rate} an hour.`}
            standfirst={rateNote}
          />
        </div>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="b-card bg-ink p-7">
              <p className="b-label text-volt">Hourly rate</p>
              <p className="b-figure mt-5 text-[3rem] text-volt">${site.rate}</p>
              <p className="b-body mt-4 text-[13px] text-paper/70">
                Engineering, design, testing and project management alike. No senior premium and
                no separate management fee.
              </p>
            </div>
            <div className="b-card p-7">
              <p className="b-label text-blazeText">How a package is priced</p>
              <p className="b-figure mt-5 text-[2.1rem] text-ink">hrs × ${site.rate}</p>
              <p className="b-body mt-4 text-[13px] text-muted">
                Every figure on this page is estimated hours multiplied by the rate. Each card
                shows its own working so you can check it.
              </p>
            </div>
            <div className="b-card b-card-volt p-7">
              <p className="b-label text-ink">If we underestimate</p>
              <p className="b-figure mt-5 text-[2.1rem] text-ink">We absorb it</p>
              <p className="b-body mt-4 text-[13px] text-ink/80">
                On a fixed-price package the overrun is ours. That is the trade for fixing the
                price: we carry the estimation risk, not you.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---- Quick links between the four lines ---- */}
        <Reveal delay={140}>
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t-[3px] border-ink pt-8">
            <span className="b-label text-muted">Jump to</span>
            {lines.map((line) => (
              <a
                key={line.id}
                href={`#${line.id}`}
                className="b-label border-2 border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-volt"
              >
                {line.label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* ---- One block of tiers per service line ---- */}
        {lines.map((line, lineIndex) => (
          <div key={line.id} id={line.id} className="mt-16 scroll-mt-32">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-t-[3px] border-ink pt-8">
                <h3 className="b-display text-[1.9rem] text-ink sm:text-[2.5rem]">
                  {line.label}
                </h3>
                <span className="b-mono text-muted">
                  {String(lineIndex + 2).padStart(2, '0')} / 05
                </span>
              </div>
              <p className="b-body mt-5 max-w-2xl text-[14px] text-muted">{line.blurb}</p>
            </Reveal>

            <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {line.tiers.map((tier, i) => (
                <TierCard
                  key={`${line.id}-${tier.name}`}
                  tier={tier}
                  index={i}
                  delay={(i % 4) * 80}
                />
              ))}
            </div>
          </div>
        ))}

        <Reveal className="mt-12">
          <p className="b-body max-w-3xl text-[13.5px] text-muted">
            Prices are in USD and exclude applicable taxes. Care-plan hours roll over for one
            month. Not sure which fits? Describe the outcome you need and we will scope it —{' '}
            <Link to="/contact" className="font-bold text-blazeText underline underline-offset-4">
              request a proposal
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
