import site from '../site.config';
import Seo, { faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import PricingTables from '../components/PricingTables';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';

/**
 * A worked example is the fastest way to make the rate credible: take a real
 * package, break it into the tasks behind the estimate, and show the hours
 * adding back up to the price printed on the card above. The rows are summed
 * at render time rather than hard-coded, so the total cannot drift.
 */
const WORKED_EXAMPLE = [
  { task: 'Discovery, scope and content model', hrs: 8 },
  { task: 'Design of custom homepage and product page', hrs: 12 },
  { task: 'Theme build and brand styling', hrs: 16 },
  { task: 'Catalogue import and merchandising setup', hrs: 10 },
  { task: 'Payments, shipping, tax and email integration', hrs: 10 },
  { task: 'Performance pass and Core Web Vitals', hrs: 7 },
  { task: 'Testing, launch and handover', hrs: 7 }
];

export default function Pricing() {
  const total = WORKED_EXAMPLE.reduce((sum, row) => sum + row.hrs, 0);
  const commerce = site.pricing.lines.find((l) => l.id === 'ecommerce');
  const lite = commerce.tiers[1];

  return (
    <div>
      <Seo
        path="/pricing"
        title="Pricing"
        description={`Published package pricing from ${site.name} across e-commerce, custom software, AI automation and care plans — every figure shown as the hours behind it.`}
        schema={faqSchema(site.pricingFaqs)}
      />

      <PageHero
        eyebrow="Pricing"
        title={`Everything here is hours × $${site.rate}.`}
        standfirst="Choose a package that matches the outcome you need, or ask for a custom proposal. Either way the scope, the hour count and the price are agreed in writing before any work starts — and each card shows its own arithmetic."
        points={[
          `One published rate: $${site.rate}/hr, every discipline`,
          'Fixed-scope phases, priced before they begin',
          'Support included after every launch'
        ]}
        secondary="See our services"
        secondaryTo="/services"
      />

      <PricingTables />

      {/* ---- Worked example ---- */}
      <section className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="06"
            label="Worked example"
            title={`Where the ${lite.hours} hours in a ${lite.price} storefront go.`}
            standfirst={`This is the estimate behind the ${commerce.label} · ${lite.name} package above, broken into the tasks it is actually made of. The hours add up to the number on the card, and the number on the card is those hours times $${site.rate}.`}
          />

          <Reveal delay={80}>
            <div className="mt-12 border-[3px] border-paper/25">
              {WORKED_EXAMPLE.map((row) => (
                <div
                  key={row.task}
                  className="flex items-baseline justify-between gap-8 border-b-2 border-paper/15 px-6 py-4"
                >
                  <span className="text-[14px] leading-[1.5] text-paper/85">{row.task}</span>
                  <span className="b-mono shrink-0 text-mutedInk">{row.hrs} h</span>
                </div>
              ))}

              <div className="flex items-baseline justify-between gap-8 border-b-2 border-paper/30 px-6 py-5">
                <span className="b-title text-[1.05rem] text-paper">Total</span>
                <span className="b-mono font-bold text-volt">{total} h</span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-6 bg-volt px-6 py-7">
                <span className="b-mono font-bold text-ink">
                  {total} h × ${site.rate}/hr
                </span>
                <span className="b-figure text-[2.6rem] text-ink">{lite.price}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="b-body mt-6 max-w-3xl text-[13.5px] text-paper/70">
              Every package on this page is built the same way. If you want the equivalent
              breakdown for any of the others, ask and we will send it — it is the estimate we
              use internally, not a document written for the website.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Pricing FAQ ---- */}
      <section id="faq" className="scroll-mt-32 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="07"
            label="Pricing questions"
            title="The things people ask before signing."
          />
          <div className="mt-12">
            <Faq items={site.pricingFaqs} />
          </div>
        </div>
      </section>

      <Cta
        label="Custom scope"
        title="Nothing here matches what you need?"
        body="Most engagements over a certain size are quoted rather than packaged. Describe the outcome and the constraints, and we will price it against a phased plan — in hours, at the same rate."
        action="Request a custom quote"
      />
    </div>
  );
}
