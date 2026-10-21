import site from '../site.config';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import WorkGrid from '../components/WorkGrid';
import Reviews from '../components/Reviews';
import Stats from '../components/Stats';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';

const NOTES = [
  {
    title: 'Live, not mocked up',
    body: 'Every entry links to a site that is running right now. Nothing here is a concept, a pitch visual, or a project that was designed and never shipped.'
  },
  {
    title: 'One team, many brands',
    body: 'This is the portfolio of the company that delivers this brand. The same engineering team built all of it, which is why the same work appears across our brands.'
  },
  {
    title: 'The failures are not here',
    body: 'Like everyone else, we publish the work that went well. Ask us on a call about the projects that did not, and we will tell you — it is a more useful conversation than this page.'
  }
];

export default function Work() {
  return (
    <div>
      <Seo
        path="/work"
        title="Our work"
        description={`Live client work delivered by the team behind ${site.name} — ${site.rv.projects} projects since ${site.rv.since} across e-commerce, custom software, CMS, mobile and CRM. Every project links to the running site.`}
      />

      <PageHero
        eyebrow="Our work"
        title="Live client work you can open in a new tab."
        standfirst="No invented case studies and no screenshots — a screenshot proves something was designed, not that it shipped. Every project below is a site that is running right now, grouped by the technology it is built on, the sector it serves and the problem it solves."
        points={[
          'Every entry links to a site that is live today',
          `${site.rv.projects} projects delivered since ${site.rv.since}`,
          'Grouped by technology, industry and problem'
        ]}
        secondary="See pricing"
      />

      <Stats />

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="01"
            label="Selected work"
            title="Browse by technology, industry or problem."
          />
          <div className="mt-12">
            <WorkGrid browsable />
          </div>
        </div>
      </section>

      {/* ---- How to read these ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="02"
            label="A note on this page"
            title="How to read this work."
            standfirst="Agency portfolios are the least trustworthy genre of writing on the internet, so here is exactly what this one is and is not."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {NOTES.map((note, i) => (
              <Reveal key={note.title} delay={i * 90}>
                <div className={`b-card h-full p-7 ${i === 1 ? 'b-card-volt' : ''}`}>
                  <p className={`b-label ${i === 1 ? 'text-ink' : 'text-blazeText'}`}>{note.title}</p>
                  <p className="b-body mt-5 text-[13.5px] text-ink/80">{note.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead index="03" label="Client feedback" title="In their words." />
          <div className="mt-12">
            <Reviews />
          </div>
        </div>
      </section>

      <Cta
        label="Reference calls"
        title="Want to speak to one of them directly?"
        body="Open any of these in a new tab, then ask us for a reference call with the client whose situation most resembles yours. It is the single most useful thing you can do when choosing a supplier, and almost nobody asks."
        action="Ask for a reference"
      />
    </div>
  );
}
