import Reveal from './Reveal';
import Social from './Social';
import ContactForm from './ContactForm';

/**
 * Closing slab, always on ink so it reads as a hard stop.
 *
 * It carries the enquiry form itself rather than a link to the contact page.
 * A visitor who has read to the bottom of a page has already decided; making
 * them load a ninth route before they can say anything loses some of them for
 * no reason. `action` and `actionTo` are still accepted so the pages that
 * pass them keep working, but no button renders any more.
 */
export default function Cta({
  label = 'Next step',
  title = 'Tell us the outcome. We will come back with the plan.',
  body,
  action,
  actionTo
}) {
  const copy =
    body ||
    'Describe what you are trying to achieve in a couple of paragraphs. You will get back a written scope, an architecture outline and a delivery sequence — from an engineer, not a salesperson. No pitch deck, and no charge for the first conversation.';

  return (
    <section className="relative border-b-[3px] border-ink bg-ink">
      <div className="pointer-events-none absolute inset-0 b-grid-light" aria-hidden="true" />

      <div className="relative mx-auto max-w-shell px-5 py-20 sm:px-6 lg:px-10">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <span className="b-label inline-block border-[3px] border-volt px-3 py-1.5 text-volt">
                {label}
              </span>
              <h2 className="b-display mt-7 max-w-3xl text-[1.9rem] text-paper sm:text-[3rem]">
                {title}
              </h2>
              <p className="b-body mt-6 max-w-xl text-paper/70">{copy}</p>

              <div className="mt-9">
                <Social variant="row" />
              </div>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
