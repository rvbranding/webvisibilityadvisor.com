import site from '../site.config';
import Seo from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import Partners from '../components/Partners';
import Stats from '../components/Stats';
import StackGrid from '../components/StackGrid';
import Standards from '../components/Standards';
import Offices from '../components/Offices';
import Reviews from '../components/Reviews';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';
import TeamPhotos from '../components/TeamPhotos';
import TeamMembers, { peopleSchema } from '../components/TeamMembers';

export default function About() {

  return (
    <div>
      <Seo
        path="/about"
        title="About us"
        description={`${site.name} is a brand of ${site.rv.delivery} — ${site.rv.projects} projects delivered since ${site.rv.since}, with ${site.rv.retention} client retention. ${site.tagline}`}
        schema={peopleSchema()}
      />

      <PageHero
        eyebrow="About us"
        title={site.tagline}
        standfirst={site.about.story[0]}
        points={[
          `${site.rv.projects} projects delivered since ${site.rv.since}`,
          `${site.rv.retention} client retention`,
          'Senior engineers on every engagement'
        ]}
        secondary="See our work"
        secondaryTo="/work"
      />

      <Stats />

      {/* ---- Story ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionHead index="01" label="Our story" title="Why this brand exists." />

            <div className="space-y-7">
              {site.about.story.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 30)} delay={i * 80}>
                  <p className="b-body text-[15.5px] leading-[1.85] text-ink/80">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Ownership ---- */}
      <section id="delivery" className="scroll-mt-32 border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="02"
            label="Ownership"
            title={site.rv.brandLine}
            standfirst={`${site.name} is one of several brands operated by the same engineering company. The team, the standards and the delivery process are shared; the positioning on this site is ours.`}
          />
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="03"
            label="What we hold to"
            title="Four positions we take, including when it costs us the work."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {site.about.values.map((value, i) => (
              <Reveal key={value.name} delay={(i % 2) * 90}>
                <div
                  className={`b-card flex h-full flex-col p-7 ${
                    i % 3 === 1 ? 'b-card-volt' : ''
                  }`}
                >
                  <span className="b-figure text-[1.4rem] text-ink/15">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="b-display mt-6 text-[1.2rem] text-ink">{value.name}</h3>
                  <p className="b-body mt-4 text-[13.5px] text-muted">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Team ---- */}
      <section id="team" className="scroll-mt-32 border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="04"
            label="The team"
            title="Who you will actually be working with."
            standfirst="The consultants you speak to are the ones who stay with the engagement — there is no separate delivery team you are introduced to after signing."
          />

          <div className="mt-12">
            <TeamMembers />
          </div>

          <h3 className="b-label mt-16 text-blazeText">On every engagement</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {site.about.team.map((member, i) => (
              <Reveal key={member.role} delay={(i % 4) * 80}>
                <div
                  className="b-card flex h-full flex-col p-6"
                >
                  <span className="b-figure flex h-12 w-12 items-center justify-center bg-ink text-[1rem] text-volt">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="b-display mt-7 text-[1.05rem] text-ink">{member.role}</h4>
                  <p className="b-body mt-4 text-[13px] text-muted">{member.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- The team at work ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="05"
            label="Inside the team"
            title="The people who will be on your project."
            standfirst="Not a stock library. This is the delivery team the work actually goes to."
          />
          <div className="mt-12">
            <TeamPhotos />
          </div>
        </div>
      </section>

      {/* ---- Official partners ---- */}
      <section id="partners" className="scroll-mt-32 border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="06"
            label="Official partners"
            title="Certified across the platforms your business runs on."
            standfirst="Recognised partner status means direct platform support, early access to releases and certified implementation teams — so your build is in officially accredited hands."
          />
          <div className="mt-12">
            <Partners />
          </div>
        </div>
      </section>

      {/* ---- Technology ---- */}
      <section id="stack" className="scroll-mt-32 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="07"
            label="Technology"
            title="What we build with."
            standfirst="A deliberately narrow stack, chosen because we have run all of it in production and can still support it in three years — not because it was on a conference slide."
          />
          <div className="mt-12">
            <StackGrid />
          </div>
        </div>
      </section>

      {/* ---- Standards ---- */}
      <section className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="08"
            label="Engineering standards"
            title="How the work is actually done."
            standfirst="The practice underneath every engagement, written down because it is the part of a supplier that is hardest to verify before you sign."
          />
          <div className="mt-12">
            <Standards onInk />
          </div>
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section id="reviews" className="scroll-mt-32 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="09"
            label="Client feedback"
            title="Verified, not curated."
            standfirst="Public review profiles, linked so you can check them. Filter by platform if you want to read a particular source in full."
          />
          <div className="mt-12">
            <Reviews limit={9} filterable />
          </div>
        </div>
      </section>

      {/* ---- Offices ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="10"
            label="Where we are"
            title="Registered offices."
            standfirst="Printed in full, exactly as filed."
          />
          <div className="mt-12">
            <Offices />
          </div>
        </div>
      </section>

      <Cta
        label="Get in touch"
        title="If any of that sounds like the way you want to work."
        action="Start a conversation"
      />
    </div>
  );
}
