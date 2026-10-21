import site from '../site.config';
import Seo, { faqSchema, listSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import ServicesGrid from '../components/ServicesGrid';
import Engagements from '../components/Engagements';
import StackGrid from '../components/StackGrid';
import Standards from '../components/Standards';
import Marquee from '../components/Marquee';
import Faq from '../components/Faq';
import Cta from '../components/Cta';

export default function Services() {
  return (
    <div>
      <Seo
        path="/services"
        title="IT services"
        description={`${site.name} delivers custom software, cloud and DevOps, CRM and ERP, e-commerce, mobile and AI engineering — with the deliverables and the stack named per service line.`}
        schema={[
          listSchema(`${site.name} service lines`, site.services),
          faqSchema(site.faqs)
        ].filter(Boolean)}
      />

      <PageHero
        eyebrow="Services"
        title="What we get hired for."
        standfirst="Every line below is delivered by the same senior engineering group — the same review standards, the same release process, the same people. What changes between them is the shape of the work, not who does it or how carefully."
        points={[
          'Deliverables listed per service, not implied',
          'The stack we work in, named honestly',
          'One team across design, engineering and testing'
        ]}
        secondary="See how we work"
        secondaryTo="/process"
      />

      <Marquee />

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="01"
            label="Service lines"
            title="What we build, and what you get."
            standfirst="Each card lists the deliverables we commit to and the technology we would expect to use. If your requirement sits between two of these, it is scoped as one project rather than two."
          />
          <div className="mt-12">
            <ServicesGrid detailed />
          </div>
        </div>
      </section>

      {/* ---- Engagement models ---- */}
      <section id="engagements" className="scroll-mt-32 border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="02"
            label="Engagement models"
            title="Four ways to bring the same team in."
            standfirst="The right structure depends on how well defined the work is and how much of it your own people will carry. All four are staffed from the same group of engineers."
          />
          <div className="mt-12">
            <Engagements />
          </div>
        </div>
      </section>

      {/* ---- Technology ---- */}
      <section id="stack" className="scroll-mt-32 border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="03"
            label="Technology"
            title="A deliberately narrow stack."
            standfirst="Every technology here is one we have run in production and can still support in three years. Breadth for its own sake is how agencies end up maintaining something nobody left on the team understands."
          />
          <div className="mt-12">
            <StackGrid />
          </div>
        </div>
      </section>

      {/* ---- Standards ---- */}
      <section id="standards" className="scroll-mt-32 border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="04"
            label="Engineering standards"
            title="What is true of every engagement."
            standfirst="These apply whether the work is a two-week automation or a nine-month platform. They are the part of a supplier that is hardest to check before signing, so they are written down."
          />
          <div className="mt-12">
            <Standards onInk />
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead index="05" label="Questions" title="Before you get in touch." />
          <div className="mt-12">
            <Faq items={site.faqs} />
          </div>
        </div>
      </section>

      <Cta
        label="Scoping"
        title="Not sure which service line you need?"
        body="That is a normal place to start. Describe the outcome and we will tell you which of these it falls under — or that it falls under none of them and you need something else entirely."
        action="Talk it through"
      />
    </div>
  );
}
