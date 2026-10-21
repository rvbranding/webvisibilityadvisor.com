import site from '../site.config';
import Seo, { listSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import SolutionsList from '../components/SolutionsList';
import Reviews from '../components/Reviews';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';

const SIGNALS = [
  'One person is the only one who understands the spreadsheet',
  'The same data is typed into two systems every day',
  'Nobody can agree which report is the correct one',
  'The site is fast in the office and slow for customers',
  'Support answers the same forty questions every week',
  'A month-end close takes longer than it did three years ago',
  'The last agency left and nobody has the credentials',
  'A new starter takes three months to become useful'
];

export default function Solutions() {
  return (
    <div>
      <Seo
        path="/solutions"
        title="Solutions"
        description={`The problems clients bring ${site.name} — legacy spreadsheets, disconnected systems, slow storefronts, manual back-office work — and the scoped engagement that removes each one.`}
        schema={listSchema(`${site.name} solutions`, site.solutions)}
      />

      <PageHero
        eyebrow="Solutions"
        title="You arrived with a symptom, not a service line."
        standfirst="Almost nobody rings up asking for a headless replatform. They ring up because the store is slow, the spreadsheet broke, or someone quit and took the process with them. These are those conversations, written down."
        points={[
          'Described as the problem, not as our product',
          'Each one maps to a scoped, priced phase',
          'Scoped as a phase you can stop after'
        ]}
        secondary="See pricing"
      />

      {/* ---- Signals ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="01"
            label="Recognise any of these?"
            title="The sentences we hear most weeks."
            standfirst="If two or more of these are true, there is usually a small, well-scoped piece of work that removes most of the pain. It is rarely the large project people assume it will be."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {SIGNALS.map((signal, i) => (
              <Reveal key={signal} delay={(i % 2) * 70}>
                <p className="flex gap-4 border-[3px] border-ink bg-paper2 p-5 text-[14.5px] font-medium leading-[1.55]">
                  <span className="b-mono shrink-0 font-bold text-blazeText">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {signal}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Solutions ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="02"
            label="What we do about it"
            title="Industry platforms we have already built once."
          />
          <div className="mt-12">
            <SolutionsList filterable />
          </div>
        </div>
      </section>

      {/* ---- Industries ---- */}
      <section className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="03"
            label="Sectors"
            title="Where we have done this before."
            standfirst="Sector experience matters less than people claim, but it does shorten discovery. These are the ones where we already know the vocabulary and the usual constraints."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.industries.map((industry, i) => (
              <Reveal key={industry} delay={(i % 4) * 60}>
                <div className="border-[3px] border-paper/25 p-6">
                  <span className="b-mono text-volt">{String(i + 1).padStart(2, '0')}</span>
                  <p className="b-title mt-4 text-[1.05rem] text-paper">{industry}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead index="04" label="Client feedback" title="How it went for them." />
          <div className="mt-12">
            <Reviews />
          </div>
        </div>
      </section>

      <Cta
        label="Diagnosis"
        title="Describe the symptom. We will name the problem."
        body="Send us the thing that is actually annoying you — the slow page, the duplicate data entry, the report nobody trusts. The first conversation costs nothing and often ends with a smaller piece of work than you expected."
      />
    </div>
  );
}
