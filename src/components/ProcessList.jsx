import site from '../site.config';
import Reveal from './Reveal';

/** The delivery sequence as numbered slabs, alternating fill. */
export default function ProcessList({ onInk = false }) {
  return (
    <div className="space-y-6">
      {site.process.map((phase, i) => (
        <Reveal key={phase.step} delay={i * 70}>
          <div
            className={`grid gap-6 border-[3px] p-7 md:grid-cols-[auto_1fr_2fr] md:items-start md:gap-10 ${
              onInk ? 'border-paper/25 bg-paper/[0.04]' : 'border-ink bg-paper2'
            }`}
          >
            <span
              className={`b-figure flex h-14 w-14 shrink-0 items-center justify-center text-[1.4rem] ${
                onInk ? 'bg-volt text-ink' : 'bg-ink text-volt'
              }`}
            >
              {phase.step}
            </span>

            <div>
              <h3 className={`b-title text-[1.25rem] ${onInk ? 'text-paper' : 'text-ink'}`}>
                {phase.name}
              </h3>
              <p className={`b-mono mt-3 ${onInk ? 'text-volt' : 'text-blazeText'}`}>
                {phase.duration}
              </p>
            </div>

            <p className={`b-body text-[14px] ${onInk ? 'text-paper/70' : 'text-muted'}`}>
              {phase.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
