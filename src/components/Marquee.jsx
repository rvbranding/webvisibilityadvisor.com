import site from '../site.config';

/**
 * A slow ticker of the industries we work in. The track is duplicated and
 * translated -50%, which is what makes the loop seamless; the copy is hidden
 * from assistive tech so the list is not announced twice.
 */
export default function Marquee() {
  return (
    <div className="b-ticker overflow-hidden border-b-[3px] border-ink bg-volt py-4">
      <div className="b-ticker-track animate-ticker">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {site.industries.map((industry) => (
              <li key={`${copy}-${industry}`} className="flex items-center">
                <span className="b-label whitespace-nowrap px-8 text-ink">{industry}</span>
                <span className="h-2 w-2 bg-ink" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
