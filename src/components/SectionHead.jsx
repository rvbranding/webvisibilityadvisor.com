import Reveal from './Reveal';

/**
 * Section opener. `onInk` inverts the palette for the dark slabs — without
 * it the heading renders ink-on-ink and vanishes.
 */
export default function SectionHead({ index, label, title, standfirst, onInk = false }) {
  return (
    <Reveal>
      <div className={`border-t-[3px] pt-6 ${onInk ? 'border-paper/25' : 'border-ink'}`}>
        <div className="flex items-center gap-4">
          {index ? (
            <span className={`b-mono ${onInk ? 'text-mutedInk' : 'text-muted'}`}>{index}</span>
          ) : null}
          <span className={`b-label ${onInk ? 'text-volt' : 'text-blazeText'}`}>{label}</span>
        </div>

        <h2
          className={`b-display mt-6 max-w-4xl text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] ${
            onInk ? 'text-paper' : 'text-ink'
          }`}
        >
          {title}
        </h2>

        {standfirst ? (
          <p
            className={`b-body mt-6 max-w-2xl ${onInk ? 'text-paper/70' : 'text-muted'}`}
          >
            {standfirst}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
