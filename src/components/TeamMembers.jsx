import site from '../site.config';
import Reveal from './Reveal';

/**
 * The named consultants you deal with, as a card grid.
 *
 * Portraits are drawn rather than photographed. Each person gets one of nine
 * line-sketch variants — different hair, glasses, collar — so the grid reads
 * as nine people rather than one repeated silhouette, without putting a stock
 * model's face beside a real name. The variant is pinned per person with
 * `avatar` in site.config.
 *
 * Real headshots drop straight in: add `photo: '/media/team/name.webp'` to the
 * entry and the sketch is skipped.
 */
const ACCENTS = ['text-ink'];

/**
 * Hair is filled at low opacity so it reads as tone against the stroked face;
 * glasses and collars are stroked at the same weight as the head outline to
 * keep one consistent pen across all eight.
 */
const VARIANTS = {
  crop: {
    hair: 'M40 50c0-15 9-24 20-24s20 9 20 24c0-10-6-16-20-16s-16 6-20 16z',
    beard: 'M43 54q1 16 17 16t17-16'
  },
  bun: {
    hair: 'M40 50c0-15 9-25 20-25s20 10 20 25c-2-9-5-14-9-17-4 4-10 6-17 6-6 0-12 5-14 11z',
    bun: true,
    earrings: true,
    neck: 'crew'
  },
  long: {
    earrings: true,
    back: 'M38 48c0-16 10-25 22-25s22 9 22 25c0 14 2 26 5 38-5 1-9-2-11-7-2-11-2-22-3-31-3 4-8 7-13 7s-10-3-13-7c-1 9-1 20-3 31-2 5-6 8-11 7 3-12 5-24 5-38z',
    glasses: true,
    neck: 'crew'
  },
  wave: {
    earrings: true,
    back: 'M38 49c0-16 10-25 22-25s22 9 22 25c0 13 3 21 7 29-4 2-8 0-11-4-1 7-4 12-8 15 3-10 4-22 3-34-4 4-8 6-13 6s-9-2-13-6c-1 12 0 24 3 34-4-3-7-8-8-15-3 4-7 6-11 4 4-8 7-16 7-29z'
  },
  fade: {
    hair: 'M42 45c4-11 11-16 18-16s16 5 19 15c-5-7-11-10-19-10s-13 4-18 11z',
    glasses: true
  },
  part: {
    earrings: true,
    back: 'M38 48c0-17 10-26 22-26s22 9 22 26c0 9 1 16 2 20-4 2-8 1-10-2-1-6-1-13-1-18-3 4-7 6-13 6s-10-2-13-6c0 5 0 12-1 18-2 3-6 4-10 2 1-4 2-11 2-20z',
    hair: 'M39 52c0-17 10-27 21-27s21 10 21 27c-1-8-3-13-6-17-3 4-8 7-15 7-6 0-9 3-13 5-4 2-7 2-8 5z'
  },
  curls: {
    earrings: true,
    halo: 'M38 50a10 10 0 0 1-2-15 10 10 0 0 1 5-12 11 11 0 0 1 12-6 13 13 0 0 1 14 0 11 11 0 0 1 12 6 10 10 0 0 1 5 12 10 10 0 0 1-2 15',
    neck: 'crew'
  },
  bob: {
    back: 'M37 48c0-17 10-26 23-26s23 9 23 26c0 12 1 21 3 27-5 2-9 1-12-3-1-8-1-16-1-23-3 5-8 8-13 8s-10-3-13-8c0 7 0 15-1 23-3 4-7 5-12 3 2-6 3-15 3-27z',
    fringe: 'M41 45c2-13 9-20 19-20s17 7 19 20c-4-7-9-11-15-11-7 0-13 4-23 11z',
    earrings: true,
    neck: 'crew'
  },
  short: {
    hair: 'M40 50c0-15 9-24 20-24s20 9 20 24c-1-11-7-17-14-17-5 0-8 2-12 4-5 2-12 3-14 13z'
  },
  turban: {
    hair: 'M39 49c-1-16 9-27 21-27s22 11 21 27c-2-7-4-11-7-14-4-3-9-4-15-4-6 0-11 2-14 6-3 3-5 7-6 12z',
    extra: 'M41 42q19-9 38 0M43 35q17-7 34 0'
  },
  tail: {
    earrings: true,
    hair: 'M41 49c0-14 8-23 19-23s19 9 19 23c0-10-6-16-19-16s-19 6-19 16z',
    tail: 'M78 38c10 3 14 12 13 23-1 8-5 13-10 15 4-10 4-22-3-29z',
    neck: 'crew'
  }
};

const ORDER = ['crop', 'long', 'part', 'bun', 'fade', 'wave', 'short', 'tail', 'curls'];

/**
 * A drawn stand-in portrait: shoulders, head, a few features, and the
 * variant's hair. Hair is filled at low opacity and stroked at the same
 * weight as the face, so every shape reads as one pen rather than as tone.
 */
function SketchPortrait({ name, variant }) {
  const v = VARIANTS[variant] || VARIANTS.crop;
  const hairFill = { fill: 'currentColor', fillOpacity: 0.17 };

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Illustrated stand-in portrait of ${name}`}
      className="h-full w-full"
    >
      {/* Ground and register marks */}
      <rect width="120" height="120" fill="currentColor" opacity="0.06" />
      <g stroke="currentColor" opacity="0.13" strokeWidth="0.75">
        <path d="M0 86h120M30 0v120M90 0v120" />
      </g>

      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        {/* Hair falling past the jaw sits behind the head */}
        {v.back ? <path d={v.back} {...hairFill} /> : null}
        {v.tail ? <path d={v.tail} {...hairFill} /> : null}

        {/* Shoulders, then the neckline drawn over them */}
        <path d="M22 120c1-21 15-32 38-32s37 11 38 32" />
        {v.neck === 'crew' ? (
          <path d="M50 89q10 8 20 0" />
        ) : (
          <path d="M52 89l8 11 8-11" />
        )}

        {/* Neck and shoulders meet, so no floating gap under the jaw */}
        <path d="M54 69q0 12-9 15M66 69q0 12 9 15" />

        {/* Head, ears, and a few marks for the face */}
        <ellipse cx="60" cy="48" rx="19" ry="22" />
        <path d="M41 46q-3 3 0 7M79 46q3 3 0 7" opacity="0.55" />
        <g opacity="0.7">
          <path d="M51 45.5h4.5M64.5 45.5H69" />
          <path d="M60 50v5.5h-3" />
          <path d="M55.5 61q4.5 3.5 9 0" />
        </g>

        {v.beard ? <path d={v.beard} opacity="0.6" /> : null}
        {v.hair ? <path d={v.hair} {...hairFill} /> : null}
        {v.fringe ? <path d={v.fringe} {...hairFill} /> : null}
        {v.earrings ? (
          <g fill="currentColor" opacity="0.55" stroke="none">
            <circle cx="41.5" cy="56" r="1.9" />
            <circle cx="78.5" cy="56" r="1.9" />
          </g>
        ) : null}
        {v.halo ? <path d={v.halo} /> : null}
        {v.bun ? <ellipse cx="60" cy="22" rx="8.5" ry="6.5" {...hairFill} /> : null}

        {v.glasses ? (
          <g opacity="0.85">
            <path d="M45.5 42h9.5v7h-9.5zM65 42h9.5v7H65zM55 45.5h10M45.5 43l-4-2M74.5 43l4-2" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}

export default function TeamMembers() {
  const people = site.about.people || [];

  return (
    <ul className="grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person, i) => {
        const accent = ACCENTS[i % ACCENTS.length];

        return (
          <Reveal as="li" key={person.name} delay={(i % 3) * 80} className="">
            <article className={`b-card flex h-full flex-col overflow-hidden ${i % 3 === 1 ? 'b-card-volt' : ''}`}>
              <div className={`overflow-hidden border-b-[3px] border-ink bg-paper ${'text-ink'}`}>
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={`${person.name}, ${person.title}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="mx-auto aspect-square w-[58%] max-w-[200px]">
                    <SketchPortrait
                      name={person.name}
                      variant={person.avatar || ORDER[i % ORDER.length]}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="b-display text-[1.05rem] text-ink">{person.name}</h3>
                <p className="b-label mt-2 text-blazeText">{person.title}</p>
                <p className="b-body mt-4 text-[13px] text-muted">{person.focus}</p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </ul>
  );
}

/**
 * Person entries for the About page graph. Only what the site can actually
 * stand behind: the name, the designation and who they work for.
 */
export function peopleSchema() {
  return (site.about.people || []).map((person) => ({
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    description: person.focus,
    worksFor: { '@id': `https://${site.domain}/#organization` }
  }));
}
