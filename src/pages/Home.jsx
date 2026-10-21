import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import site from '../site.config';
import Seo, { faqSchema, listSchema } from '../components/Seo';
import Hero from '../components/Hero';
import VideoBand from '../components/VideoBand';
import Marquee from '../components/Marquee';
import Stats from '../components/Stats';
import SectionHead from '../components/SectionHead';
import Partners from '../components/Partners';
import ServicesGrid from '../components/ServicesGrid';
import Engagements from '../components/Engagements';
import Industries from '../components/Industries';
import StackGrid from '../components/StackGrid';
import WorkGrid from '../components/WorkGrid';
import ProcessList from '../components/ProcessList';
import SolutionsList from '../components/SolutionsList';
import Reviews from '../components/Reviews';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';

function MoreLink({ to, children, onInk = false }) {
  return (
    <Reveal className="mt-10">
      <Link to={to} className={`b-btn ${onInk ? 'b-btn-onink' : 'b-btn-volt'}`}>
        {children}
        <ArrowRight size={14} strokeWidth={2.5} />
      </Link>
    </Reveal>
  );
}

export default function Home() {
  return (
    <div>
      <Seo
        path="/"
        title={null}
        description={site.metaDescription}
        schema={[
          faqSchema(site.faqs),
          listSchema(`${site.name} IT services`, site.services)
        ].filter(Boolean)}
      />

      <Hero />
      <VideoBand />
      <Marquee />
      <Stats />

      {/* ---- Services ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="01"
            label="What we do"
            title="Everything we do. One engineering team."
            standfirst="Software development, cloud, data and AI, delivered by the same senior group rather than farmed out by discipline. Most engagements touch two or three of these lines, and they are scoped as one project rather than three."
          />
          <div className="mt-12">
            <ServicesGrid />
          </div>
          <MoreLink to="/services">Every service in detail</MoreLink>
        </div>
      </section>

      {/* ---- Official partners ---- */}
      <section id="partners" className="scroll-mt-32 border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="02"
            label="Official partners"
            title="Certified across the platforms your business runs on."
            standfirst="Recognised partner status means direct platform support, early access to releases and certified implementation teams — so your build is in officially accredited hands."
          />
          <div className="mt-12">
            <Partners />
          </div>
        </div>
      </section>

      {/* ---- Engagement models ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="03"
            label="Engagement models"
            title="Four ways to bring us in."
            standfirst="The right structure depends on how well defined the work is and how much of it your own team will carry. Clients routinely start in one model and move to another as the product matures."
          />
          <div className="mt-12">
            <Engagements />
          </div>
        </div>
      </section>

      {/* ---- Work ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="04"
            label="Selected work"
            title="Work you can open in a new tab."
            standfirst="A sample of live client sites built and run by our team. No mockups and no invented case studies — every one of these is running right now."
          />
          <div className="mt-12">
            <WorkGrid limit={6} />
          </div>
          <MoreLink to="/work">Browse all our work</MoreLink>
        </div>
      </section>

      {/* ---- Industries ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="05"
            label="Industries"
            title="Sectors where we already know what breaks."
            standfirst="Domain knowledge is most of what separates a system people use from a system people work around. These are the sectors we have shipped in enough times to know the second question to ask."
          />
          <div className="mt-12">
            <Industries />
          </div>
        </div>
      </section>

      {/* ---- Solutions ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="06"
            label="Solutions"
            title="Told as the problem, not as the product."
            standfirst="Most people arrive describing a symptom rather than a service line. These are the ones we hear most often, in roughly the words they arrive in."
          />
          <div className="mt-12">
            <SolutionsList limit={6} />
          </div>
          <MoreLink to="/solutions">See all solutions</MoreLink>
        </div>
      </section>

      {/* ---- Technology ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="07"
            label="Technology"
            title="The stack we work in, named honestly."
            standfirst="We pick from a deliberately narrow set of technologies we have run in production and can still support in three years. If your requirement genuinely needs something outside it, we will say so rather than learn on your budget."
          />
          <div className="mt-12">
            <StackGrid />
          </div>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="08"
            label="How we work"
            title="Five phases, each scoped before it starts."
            standfirst="You can stop after any of them. Nothing is scoped so loosely that the next phase becomes unavoidable."
          />
          <div className="mt-12">
            <ProcessList onInk />
          </div>
          <MoreLink to="/process" onInk>
            The full process
          </MoreLink>
        </div>
      </section>

      {/* ---- Reviews ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="09"
            label="Client feedback"
            title="What clients say when it is over."
            standfirst={`Verified Clutch, Google and Upwork ratings reflecting the track record of RV Technologies — the software company behind ${site.name}.`}
          />
          <div className="mt-12">
            <Reviews limit={6} />
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="10"
            label="Questions"
            title="The things people ask before signing."
          />
          <div className="mt-12">
            <Faq items={site.faqs} />
          </div>
          <MoreLink to="/pricing#faq">Pricing questions</MoreLink>
        </div>
      </section>

      <Cta />
    </div>
  );
}
