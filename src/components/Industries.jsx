import {
  ShoppingBag,
  Factory,
  Briefcase,
  HeartPulse,
  Truck,
  Landmark,
  GraduationCap,
  Building2
} from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

const ICONS = {
  ShoppingBag,
  Factory,
  Briefcase,
  HeartPulse,
  Truck,
  Landmark,
  GraduationCap,
  Building2
};

/**
 * Sectors we have shipped in, each with the thing that is actually different
 * about building software for it. A list of industry names on its own says
 * nothing; the note is the part that earns the section.
 */
export default function Industries() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {site.industryNotes.map((industry, i) => {
        const Icon = ICONS[industry.icon] || Briefcase;

        return (
          <Reveal key={industry.name} delay={(i % 4) * 70}>
            <div className="h-full border-[3px] border-ink bg-paper p-6">
              <Icon size={19} strokeWidth={2.2} className="text-blazeText" aria-hidden="true" />
              <h3 className="b-display mt-5 text-[0.95rem] text-ink">{industry.name}</h3>
              <p className="b-body mt-3 text-[13px] text-muted">{industry.body}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
