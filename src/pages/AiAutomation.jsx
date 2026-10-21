import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gauge, FileSearch, Bot } from 'lucide-react';
import site from '../site.config';
import Seo, { faqSchema } from '../components/Seo';
import PageHero from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import Faq from '../components/Faq';
import Cta from '../components/Cta';
import Reveal from '../components/Reveal';

const USE_CASES = [
  {
    icon: FileSearch,
    name: 'Document and data extraction',
    body: 'Invoices, purchase orders, referrals, contracts — read once, checked by a person, and written into the system that needs them. The reliable half of this field, and usually the fastest payback.'
  },
  {
    icon: Bot,
    name: 'Assistants grounded in your content',
    body: 'A retrieval assistant that answers from your documentation, your tickets and your product data, with a confidence floor and a clean handover when it is not sure.'
  },
  {
    icon: Gauge,
    name: 'Workflow automation',
    body: 'The multi-step process that currently lives in one head and a set of browser tabs, running unattended with retries, logging and an alert when it genuinely fails.'
  },
  {
    icon: ShieldCheck,
    name: 'Evaluation and governance',
    body: 'Measurement before deployment: a test set from your own data, an accuracy figure you can quote, and a written record of what the system is and is not allowed to do.'
  }
];

const PRINCIPLES = [
  {
    name: 'A baseline before a model',
    body: 'If the current process is not measured, there is nothing to prove an improvement against. Measuring it is part of phase one, not an extra.'
  },
  {
    name: 'A human at the decision',
    body: 'We automate the reading, the routing and the typing. Where a decision has consequences, a person makes it — with the work already done for them.'
  },
  {
    name: 'Fail loudly',
    body: 'Silent failure is the characteristic risk of this work. Every automation we ship has retries, logs and an escalation path that ends with a human being told.'
  },
  {
    name: 'Start with one workflow',
    body: 'One process, automated properly and measured honestly, tells you more about the return than any pilot programme covering five.'
  }
];

const FIRST_ENGAGEMENT = [
  {
    when: 'Week 1',
    name: 'Measure the process as it stands',
    body: 'We time the current workflow, count the volume and the error rate, and agree what a good outcome would be in numbers. Without this there is nothing to prove an improvement against later.'
  },
  {
    when: 'Week 2',
    name: 'A written business case',
    body: 'What could be automated, what should not be, the expected saving, and the honest risks. Plenty of these end with a recommendation to fix the process before automating it.'
  },
  {
    when: 'Weeks 3–5',
    name: 'One workflow, built properly',
    body: 'The highest-value process, automated end to end with retries, logging, a confidence threshold and an escalation path — not a demo that works on the happy path.'
  },
  {
    when: 'Week 6',
    name: 'Evaluation against your own data',
    body: 'A test set drawn from your real cases, an accuracy figure you can quote to your board, and a written record of what the system is and is not allowed to decide.'
  },
  {
    when: 'Weeks 7–8',
    name: 'Live, monitored and handed over',
    body: 'Deployed behind your own accounts, with a dashboard showing volume, accuracy and time saved, and a runbook for the team who will own it.'
  }
];

export default function AiAutomation() {
  const line = site.pricing.lines.find((l) => l.id === 'ai');
  const aiService = site.services.find((s) => s.id === 'ai');

  return (
    <div>
      <Seo
        path="/ai-automation"
        title="AI & automation"
        description={`${site.name} builds retrieval assistants, document extraction and monitored workflow automation — measured against a baseline first, with a human at every decision that carries consequences.`}
        schema={faqSchema(site.faqs)}
      />

      <PageHero
        eyebrow="AI & automation"
        title="Automate the work nobody wanted anyway."
        standfirst={aiService.description}
        points={[
          'A measured baseline before anything is automated',
          'Confidence thresholds with a human fallback',
          'A written business case before anything is built'
        ]}
        primary="Book an automation audit"
        secondary="See how we work"
        secondaryTo="/process"
      />

      {/* ---- Use cases ---- */}
      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="01"
            label="Where it pays"
            title="Four places this reliably earns its keep."
            standfirst="There are more, but these are the four where we can usually predict the return before starting. Anything outside them we prototype first rather than promise."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {USE_CASES.map((useCase, i) => (
              <Reveal key={useCase.name} delay={(i % 2) * 90}>
                <article
                  className={`b-card b-card-hover flex h-full flex-col p-7 ${
                    i % 3 === 1 ? 'b-card-volt' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center bg-ink text-volt">
                      <useCase.icon size={20} strokeWidth={2} />
                    </span>
                    <span className="b-mono text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="b-title mt-6 text-[1.2rem] text-ink">{useCase.name}</h3>
                  <p className="b-body mt-4 flex-1 text-[13.5px] text-ink/75">{useCase.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Principles ---- */}
      <section className="border-b-[3px] border-ink bg-ink">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            onInk
            index="02"
            label="How we build it"
            title="Four rules we do not break."
          />

          <div className="mt-12 space-y-5">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.name} delay={i * 70}>
                <div className="grid gap-5 border-[3px] border-paper/25 p-7 md:grid-cols-[auto_1fr_2fr] md:items-start md:gap-10">
                  <span className="b-figure flex h-12 w-12 shrink-0 items-center justify-center bg-volt text-[1.2rem] text-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="b-title text-[1.15rem] text-paper">{principle.name}</h3>
                  <p className="b-body text-[14px] text-paper/70">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- First engagement ---- */}
      <section className="border-b-[3px] border-ink bg-paper2">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead
            index="03"
            label="First engagement"
            title="What the first eight weeks look like."
            standfirst="Automation work goes wrong when it starts with a platform decision instead of a measurement. This is the sequence we run instead, and you can stop at the end of any step."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {FIRST_ENGAGEMENT.map((phase, i) => (
              <Reveal key={phase.name} delay={(i % 3) * 80}>
                <div className="b-card h-full p-7">
                  <span className="b-label inline-block border-[3px] border-ink bg-volt px-2.5 py-1 text-ink">
                    {phase.when}
                  </span>
                  <h3 className="b-display mt-6 text-[1.1rem] text-ink">{phase.name}</h3>
                  <p className="b-body mt-4 text-[13.5px] text-muted">{phase.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link to="/pricing#ai" className="b-btn b-btn-volt">
              What an automation engagement costs
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-paper">
        <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
          <SectionHead index="04" label="Questions" title="What people ask about this work." />
          <div className="mt-12">
            <Faq items={site.faqs} />
          </div>
        </div>
      </section>

      <Cta
        label="Automation audit"
        title="Tell us which process costs you the most."
        body="We will look at it, tell you honestly whether it is worth automating, and if it is, come back with a scope and a delivery sequence. Plenty of processes are cheaper left alone and we will say so."
        action="Book the audit"
      />
    </div>
  );
}
