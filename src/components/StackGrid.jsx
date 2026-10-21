import {
  LayoutTemplate,
  Server,
  Smartphone,
  Cloud,
  Database,
  Network
} from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

const ICONS = { LayoutTemplate, Server, Smartphone, Cloud, Database, Network };

/**
 * The stack, grouped the way a technical evaluator scans it. Deliberately set
 * as text rather than vendor logos: a logo wall implies a partner status or a
 * certification, and we do not claim either.
 */
export default function StackGrid({ compact = false }) {
  const groups = compact ? site.stack.slice(0, 4) : site.stack;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {groups.map((group, i) => {
        const Icon = ICONS[group.icon] || Server;

        return (
          <Reveal key={group.group} delay={(i % 3) * 80}>
            <div className="b-card h-full p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-volt">
                  <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="b-display text-[1rem] text-ink">{group.group}</h3>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="b-mono border-2 border-ink px-2.5 py-1 text-ink/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
