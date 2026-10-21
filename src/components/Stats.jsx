import site from '../site.config';
import Reveal from './Reveal';

/** Four figures on a dark slab, divided by heavy rules. */
export default function Stats() {
  return (
    <section className="border-b-[3px] border-ink bg-ink">
      <div className="mx-auto max-w-shell px-6 py-14 lg:px-10">
        <div className="grid gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div
                className={`px-0 sm:px-8 ${
                  i % 2 === 1 ? 'sm:border-l-2 sm:border-paper/20' : ''
                } xl:border-l-2 xl:border-paper/20 xl:first:border-l-0 ${
                  i === 0 ? 'sm:pl-0' : ''
                }`}
              >
                <p className="b-figure text-[2.8rem] text-volt lg:text-[3.4rem]">
                  {stat.figure}
                </p>
                <p className="b-label mt-4 text-mutedInk">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
