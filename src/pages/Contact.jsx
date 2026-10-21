import { Clock, Globe2, ShieldCheck } from 'lucide-react';
import site from '../site.config';
import Seo, { faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import ContactForm from '../components/ContactForm';
import Social from '../components/Social';
import Offices from '../components/Offices';
import Faq from '../components/Faq';
import Reveal from '../components/Reveal';

const EXPECTATIONS = [
  {
    step: '01',
    name: 'We reply within one working day',
    body: 'Usually the same day. The reply comes from someone who can answer technical questions, not from a scheduling link.'
  },
  {
    step: '02',
    name: 'A 30-minute call, no deck',
    body: 'We ask about the problem, the systems it touches and the constraints. If we are not the right people for it, we say so on this call.'
  },
  {
    step: '03',
    name: 'A written scope and delivery plan',
    body: 'Within a few days: what we would do, in what order, what it depends on from your side, and where the risks sit.'
  }
];

const FACTS = [
  {
    icon: Clock,
    label: 'Office hours',
    value: site.contact.hours,
    body: 'Enquiries outside these hours are answered the next working morning.'
  },
  {
    icon: Globe2,
    label: 'Where we work',
    value: 'Clients across the US, UK, EU and Australia',
    body: 'Delivery runs to your working hours, with a minimum four-hour overlap agreed before the engagement starts.'
  },
  {
    icon: ShieldCheck,
    label: 'Confidentiality',
    value: 'NDA before discovery',
    body: 'Send yours or use ours. Nothing you share in an enquiry goes past the people who would work on it.'
  }
];

export default function Contact() {
  return (
    <div>
      <Seo
        path="/contact"
        title="Contact"
        description={`Start a technical conversation with ${site.name}. Send an enquiry through the form or write to us directly — you will hear back from an engineer within one working day.`}
        schema={faqSchema(site.faqs)}
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us the outcome. We come back with the plan."
        standfirst="Describe what you are trying to achieve and we will come back with a written scope, an architecture outline and a delivery sequence. The first conversation costs nothing, and you keep whatever comes out of it."
        points={[
          'Reply within one working day',
          'A 30-minute call, no pitch deck',
          'A written plan you keep either way'
        ]}
        primary="Jump to the form"
        primaryTo="#enquiry"
        secondary="See how we work"
        secondaryTo="/process"
      />

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <div id="enquiry" className="grid scroll-mt-32 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* ---- Details ---- */}
            <div>
              <SectionHead index="01" label="Talk to us" title="However you prefer to start." />

              <div className="mt-10 space-y-5">
                <Social variant="panel" />

                {FACTS.map((fact) => (
                  <div key={fact.label} className="b-card flex items-start gap-5 p-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-volt">
                      <fact.icon size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="b-label block text-blazeText">{fact.label}</span>
                      <span className="mt-2 block text-[15px] font-bold text-ink">
                        {fact.value}
                      </span>
                      <span className="b-body mt-2 block text-[13px] text-muted">{fact.body}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="b-label text-blazeText">Registered offices</p>
                <Offices className="mt-6" />
              </div>

              <div className="mt-10 border-t-[3px] border-ink pt-8">
                <p className="b-label text-blazeText">What happens next</p>
                <div className="mt-7 space-y-7">
                  {EXPECTATIONS.map((item) => (
                    <Reveal key={item.step}>
                      <div className="flex gap-5">
                        <span className="b-figure flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-[1rem] text-volt">
                          {item.step}
                        </span>
                        <div>
                          <p className="b-title text-[15px] text-ink">{item.name}</p>
                          <p className="b-body mt-2 text-[13.5px] text-muted">{item.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- Form ---- */}
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead index="02" label="Questions" title="Before you write." />
          <div className="mt-12">
            <Faq items={site.faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
