import {
  KeyRound,
  GitPullRequest,
  ShieldCheck,
  FileText,
  Gauge,
  Rocket
} from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

const ICONS = { KeyRound, GitPullRequest, ShieldCheck, FileText, Gauge, Rocket };

/**
 * The engineering practice underneath every service line — ownership, review,
 * security, documentation, measurement and release. Buyers comparing IT
 * suppliers are really comparing this, and most sites leave it unsaid.
 */
export default function Standards({ onInk = false }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {site.standards.map((item, i) => {
        const Icon = ICONS[item.icon] || ShieldCheck;

        return (
          <Reveal key={item.name} delay={(i % 3) * 80}>
            <div
              className={`h-full border-[3px] p-7 ${
                onInk ? 'border-paper/25 bg-ink' : 'border-ink bg-paper'
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center ${
                  onInk ? 'bg-volt text-ink' : 'bg-ink text-volt'
                }`}
              >
                <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <h3
                className={`b-display mt-6 text-[1.05rem] ${onInk ? 'text-paper' : 'text-ink'}`}
              >
                {item.name}
              </h3>
              <p
                className={`b-body mt-4 text-[13.5px] ${onInk ? 'text-paper/70' : 'text-muted'}`}
              >
                {item.body}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
