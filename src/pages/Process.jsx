import site from '../site.config';
import Standards from '../components/Standards';
import Engagements from '../components/Engagements';
import Seo, { faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import ProcessList from '../components/ProcessList';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';

const COMMITMENTS = [
  {
    name: 'A staging link every two weeks',
    body: 'Not a status report, not a percentage. Something you can click, on a URL you can share with a colleague who was not in the meeting.'
  },
  {
    name: 'One named contact who writes code',
    body: 'Your point of contact is on the build team. There is no account manager relaying questions to people you never meet.'
  },
  {
    name: 'Estimates that decompose',
    body: 'Any number we give you breaks down into named tasks and hours. If you want to remove something to save money, you can see exactly what it saves.'
  },
  {
    name: 'Bad news early',
    body: 'If something has gone wrong or is going to slip, you hear it in the week it happens, not in the week before launch.'
  }
];

const ARTEFACTS = [
  { phase: 'Discovery', item: 'Written scope, hour estimate, fixed price' },
  { phase: 'Architecture', item: 'Data model, integration map, phase plan' },
  { phase: 'Build', item: 'Staging environment, fortnightly demo, test suite' },
  { phase: 'Launch', item: 'Migration runbook, rollback plan, handover session' },
  { phase: 'Care', item: 'Monitoring, monthly report, allocated hours' }
];

export default function Process() {
  return (
    <div>
      <Seo
        path="/process"
        title="How we work"
        description={`${site.name} delivers in five scoped phases — discovery, architecture, build, launch and care — with engagement models and engineering standards published up front.`}
        schema={faqSchema(site.faqs)}
      />

      <PageHero
        eyebrow="How we work"
        title="Five phases. Stop after any of them."
        standfirst="Nothing here is scoped so loosely that the next phase becomes unavoidable. Each one is priced on its own, delivers something you keep, and ends at a point where walking away costs you nothing but the phase you already bought."
        points={[
          'Each phase priced in hours before it begins',
          'Something you can click every two weeks',
          'Repository and credentials yours throughout'
        ]}
        secondary="See pricing"
      />

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="01"
            label="The sequence"
            title="From first call to ongoing care."
          />
          <div className="mt-12">
            <ProcessList />
          </div>
        </div>
      </section>

      {/* ---- Artefacts ---- */}
      <section className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="02"
            label="Artefacts"
            title="What you physically have at the end of each phase."
            standfirst="These are yours whether or not you continue. A discovery you paid for and cannot use afterwards is not a discovery, it is a sales process."
          />

          <div className="mt-12 space-y-4">
            {ARTEFACTS.map((artefact, i) => (
              <Reveal key={artefact.phase} delay={i * 60}>
                <div className="flex flex-col gap-3 border-[3px] border-paper/25 p-6 sm:flex-row sm:items-center sm:gap-10">
                  <span className="b-label w-40 shrink-0 text-volt">{artefact.phase}</span>
                  <span className="text-[14.5px] leading-[1.55] text-paper/85">
                    {artefact.item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Commitments ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="03"
            label="Commitments"
            title="Four things we hold ourselves to."
            standfirst="These are the promises clients actually check us against, so they are worth writing down rather than implying."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {COMMITMENTS.map((commitment, i) => (
              <Reveal key={commitment.name} delay={(i % 2) * 90}>
                <div
                  className={`b-card b-card-hover flex h-full flex-col p-7 ${
                    i % 3 === 1 ? 'b-card-volt' : ''
                  }`}
                >
                  <span className="b-figure flex h-12 w-12 items-center justify-center bg-ink text-[1.2rem] text-volt">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="b-title mt-6 text-[1.2rem] text-ink">{commitment.name}</h3>
                  <p className="b-body mt-4 text-[13.5px] text-ink/75">{commitment.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Engagement models ---- */}
      <section id="engagements" className="scroll-mt-32 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="04"
            label="Engagement models"
            title="Four ways to bring the team in."
            standfirst="The phases above are the same whichever of these you choose. What changes is how the work is committed — a defined scope, a standing squad, embedded specialists, or cover for something already live."
          />
          <div className="mt-12">
            <Engagements />
          </div>
        </div>
      </section>

      {/* ---- Engineering standards ---- */}
      <section id="standards" className="scroll-mt-32 border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="05"
            label="Engineering standards"
            title="The practice underneath every phase."
            standfirst="Process is what a client sees; standards are what decides whether the software is still maintainable in three years. These apply to every engagement regardless of size."
          />
          <div className="mt-12">
            <Standards onInk />
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead index="06" label="Questions" title="About working together." />
          <div className="mt-12">
            <Faq items={site.faqs} />
          </div>
        </div>
      </section>

      <Cta
        label="Discovery"
        title="Start with the smallest phase."
        body="Discovery is short, paid and yours to keep — a written scope, an architecture outline and a delivery sequence, whether or not you carry on with us."
        action="Book discovery"
      />
    </div>
  );
}
