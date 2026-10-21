import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

import portfolioShots from '../portfolio-shots';

// ---------------------------------------------------------------------------
// Screenshot matching. Files in public/portfolio are named after the client's
// domain, so a project is matched by its second-level domain (or, failing
// that, its display name). Longest overlap wins, and an exact match always
// beats a partial one.
// ---------------------------------------------------------------------------
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const shotIndex = portfolioShots
  .map((file) => ({
    key: normalize(file.replace(/\.[^.]+$/, '')),
    url: `/portfolio/${encodeURIComponent(file)}`
  }))
  .filter((entry) => entry.key.length >= 3);

const brandToken = (raw) => {
  try {
    const host = new URL(raw.startsWith('http') ? raw : `https://${raw}`)
      .hostname.replace(/^www\./, '');
    return normalize(host.split('.')[0]);
  } catch {
    return '';
  }
};

function findShot(url, name) {
  const tokens = [brandToken(url), normalize(name)].filter((t) => t.length >= 3);
  let best = null;
  for (const { key, url: assetUrl } of shotIndex) {
    for (const t of tokens) {
      if (!(key === t || key.includes(t) || t.includes(key))) continue;
      const score = (key === t ? 1000 : 0) + Math.min(key.length, t.length);
      if (!best || score > best.score) best = { url: assetUrl, score };
    }
  }
  return best ? best.url : null;
}

/**
 * Real, live client work — not invented case studies.
 *
 * Every entry links to a site that is actually running, so any claim on this
 * page can be checked in a new tab. The same projects are grouped three ways:
 * by the technology they are built on, by the sector they serve, and by the
 * operational problem they solve.
 */
/** The client's live site, or a lettered plate when we have no capture. */
function Shot({ url, name }) {
  const src = useMemo(() => findShot(url, name), [url, name]);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center border-b-[3px] border-ink bg-volt">
        <span className="b-display px-4 text-center text-[1.1rem] text-ink">{name}</span>
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] w-full overflow-hidden border-b-[3px] border-ink bg-paper2">
      <img
        src={src}
        alt={`${name} website`}
        loading="lazy"
        decoding="async"
        width="480"
        height="300"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

const VIEWS = [
  { id: 'technology', label: 'By technology' },
  { id: 'industry', label: 'By industry' },
  { id: 'solutions', label: 'By solution' }
];

/** Flatten a group map into a deduplicated, tagged list. */
function flatten(groups, only) {
  const entries = only ? { [only]: groups[only] || [] } : groups;
  const seen = new Set();
  const out = [];

  for (const [group, items] of Object.entries(entries)) {
    for (const item of items) {
      const key = item.url || item.name;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ ...item, group });
    }
  }
  return out;
}

export default function WorkGrid({ limit, browsable = false }) {
  const [view, setView] = useState('technology');
  const [group, setGroup] = useState(null);
  const [shown, setShown] = useState(limit || 12);

  const groups = site.portfolio[view] || {};
  const groupNames = useMemo(() => Object.keys(groups), [groups]);

  const items = useMemo(() => flatten(groups, group), [groups, group]);

  const pickView = (next) => {
    setView(next);
    setGroup(null);
    setShown(limit || 12);
  };

  const pickGroup = (next) => {
    setGroup(next);
    setShown(limit || 12);
  };

  // The home page shows a fixed sample; only the work page gets the controls.
  const visible = browsable ? items.slice(0, shown) : items.slice(0, limit || 12);

  return (
    <div>
      {browsable ? (
        <>
          <div className="flex flex-wrap gap-2">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => pickView(v.id)}
                className={`b-label border-[3px] border-ink px-3.5 py-2 transition-colors ${
                  view === v.id ? 'bg-ink text-volt' : 'bg-paper text-ink hover:bg-volt'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => pickGroup(null)}
              className={`b-mono border-2 border-ink px-3 py-1.5 transition-colors ${
                group === null ? 'bg-blaze text-paper' : 'bg-paper text-ink hover:bg-volt'
              }`}
            >
              All ({items.length})
            </button>
            {groupNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => pickGroup(name)}
                className={`b-mono border-2 border-ink px-3 py-1.5 transition-colors ${
                  group === name ? 'bg-blaze text-paper' : 'bg-paper text-ink hover:bg-volt'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </>
      ) : null}

      <div className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 ${browsable ? 'mt-8' : ''}`}>
        {visible.map((item, i) => (
          <Reveal key={`${item.url || item.name}-${i}`} delay={(i % 3) * 60}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="b-card b-card-hover group flex h-full flex-col overflow-hidden"
            >
              <Shot url={item.url} name={item.name} />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="b-label text-blazeText">{item.group}</span>
                  <ArrowUpRight size={17} strokeWidth={2.6} className="shrink-0 text-ink" aria-hidden="true" />
                </div>

                <h3 className="b-display mt-5 text-[1.05rem] text-ink">{item.name}</h3>
                <p className="b-body mt-2.5 flex-1 text-[13px] text-muted">{item.desc}</p>

                <span className="b-mono mt-6 truncate text-muted">
                  {(item.url || '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {browsable && shown < items.length ? (
        <button
          type="button"
          onClick={() => setShown((n) => n + 12)}
          className="b-btn b-btn-volt mt-8"
        >
          Show more work ({items.length - shown} left)
        </button>
      ) : null}
    </div>
  );
}
