// Inline SVG flags — no external CDN and no emoji (Windows browsers do not
// render regional-indicator flag emoji at all). Every flag uses a 60x40 viewBox
// so one set of width/height classes keeps a row of them visually even.
//
// The hairline is `ring-current`, so a flag picks up the surrounding text
// colour and stays visible on a dark fold and a light one without the caller
// having to say which it is in.

const base = 'inline-block flex-shrink-0 rounded-[2px] ring-1 ring-current/25';

function Flag({ title, className = 'h-4 w-6', children }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`${base} ${className}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid slice"
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

const unionJack = (
  <>
    <rect width="60" height="40" fill="#012169" />
    <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
    <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="3.2" />
    <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13.4" />
    <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8" />
  </>
);

export function FlagUS({ className }) {
  const stripe = 40 / 13;
  return (
    <Flag title="United States" className={className}>
      <rect width="60" height="40" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * stripe} width="60" height={stripe} fill="#B22234" />
      ))}
      <rect width="24" height={stripe * 7} fill="#3C3B6E" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <circle key={`${row}-${col}`} cx={2.4 + col * 3.9} cy={2.4 + row * 4.2} r="0.85" fill="#fff" />
        ))
      )}
    </Flag>
  );
}

export function FlagUK({ className }) {
  return (
    <Flag title="United Kingdom" className={className}>
      {unionJack}
    </Flag>
  );
}

export function FlagCA({ className }) {
  const leaf =
    '50,12 53.5,21 61,19 58.5,28.5 68,26.5 65.5,33 79,43 75,46.5 77.5,53 59,49.5 57.5,53 62.5,68 ' +
    '51.5,65.5 51.5,88 48.5,88 48.5,65.5 37.5,68 42.5,53 41,49.5 22.5,53 25,46.5 21,43 34.5,33 ' +
    '32,26.5 41.5,28.5 39,19 46.5,21';
  return (
    <Flag title="Canada" className={className}>
      <rect width="60" height="40" fill="#fff" />
      <rect width="15" height="40" fill="#D80621" />
      <rect x="45" width="15" height="40" fill="#D80621" />
      <g transform="translate(30 20) scale(0.34) translate(-50 -50)">
        <polygon points={leaf} fill="#D80621" />
      </g>
    </Flag>
  );
}

export function FlagSG({ className }) {
  return (
    <Flag title="Singapore" className={className}>
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="20" fill="#ED2939" />
      <circle cx="13" cy="10" r="7" fill="#fff" />
      <circle cx="17.5" cy="10" r="6.2" fill="#ED2939" />
      {[
        [20.5, 5.6],
        [25.4, 8.9],
        [23.6, 14.4],
        [17.5, 14.4],
        [15.7, 8.9]
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill="#fff" />
      ))}
    </Flag>
  );
}

export function FlagAU({ className }) {
  return (
    <Flag title="Australia" className={className}>
      <rect width="60" height="40" fill="#012169" />
      <g transform="scale(0.5)">{unionJack}</g>
      <circle cx="15" cy="30" r="2.6" fill="#fff" />
      <circle cx="45" cy="9" r="1.5" fill="#fff" />
      <circle cx="52" cy="18" r="1.7" fill="#fff" />
      <circle cx="44" cy="26" r="1.5" fill="#fff" />
      <circle cx="38" cy="18" r="1.2" fill="#fff" />
      <circle cx="47" cy="17" r="0.9" fill="#fff" />
    </Flag>
  );
}

export function FlagAE({ className }) {
  return (
    <Flag title="United Arab Emirates (Dubai)" className={className}>
      <rect width="60" height="13.34" fill="#00732F" />
      <rect y="13.34" width="60" height="13.33" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#000" />
      <rect width="15" height="40" fill="#FF0000" />
    </Flag>
  );
}

export function FlagSA({ className }) {
  return (
    <Flag title="Saudi Arabia" className={className}>
      <rect width="60" height="40" fill="#006C35" />
      {/* stylised shahada script */}
      <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <path d="M13 15h6M22 15h4M29 15h9M41 15h6" />
        <path d="M15 12v3M31 11.5v3.5M44 12v3" />
      </g>
      {/* sword */}
      <path d="M12 24h30l5 1.6-5 1.6H12z" fill="#fff" />
      <path d="M42 22.5v6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </Flag>
  );
}

export function FlagIN({ className }) {
  return (
    <Flag title="India" className={className}>
      <rect width="60" height="13.34" fill="#FF9933" />
      <rect y="13.34" width="60" height="13.33" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#138808" />
      <circle cx="30" cy="20" r="5.2" fill="none" stroke="#000080" strokeWidth="1.1" />
      <circle cx="30" cy="20" r="1.1" fill="#000080" />
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={i}
          x1="30"
          y1="20"
          x2={30 + 5.2 * Math.cos((i * Math.PI) / 6)}
          y2={20 + 5.2 * Math.sin((i * Math.PI) / 6)}
          stroke="#000080"
          strokeWidth="0.5"
        />
      ))}
    </Flag>
  );
}

/** Where RV Technologies' clients are, in the order every site prints them. */
export const trustedCountries = [
  { label: 'United States', Flag: FlagUS },
  { label: 'United Kingdom', Flag: FlagUK },
  { label: 'Canada', Flag: FlagCA },
  { label: 'Singapore', Flag: FlagSG },
  { label: 'Australia', Flag: FlagAU },
  { label: 'Dubai', Flag: FlagAE },
  { label: 'Saudi Arabia', Flag: FlagSA },
  { label: 'India', Flag: FlagIN }
];
