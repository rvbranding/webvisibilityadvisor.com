import { useMemo, useState } from 'react';
import {
  ShoppingCart, Shirt, Store, UtensilsCrossed, Car, Scissors, Factory,
  Warehouse, Truck, Building2, Landmark, ShieldCheck, Wrench, Users,
  Briefcase, Plane, Contact, Stethoscope, GraduationCap, Dumbbell
} from 'lucide-react';
import site from '../site.config';
import Reveal from './Reveal';

const ICONS = {
  ShoppingCart, Shirt, Store, UtensilsCrossed, Car, Scissors, Factory,
  Warehouse, Truck, Building2, Landmark, ShieldCheck, Wrench, Users,
  Briefcase, Plane, Contact, Stethoscope, GraduationCap, Dumbbell
};

/**
 * Industry platforms we have already built once — so the second build starts
 * from working software rather than from a blank page. Shared across every
 * brand, because the delivery team and the catalogue are the same.
 */
export default function SolutionsList({ limit, filterable = false }) {
  const [category, setCategory] = useState('All');

  const list = useMemo(() => {
    const all = category === 'All'
      ? site.solutions
      : site.solutions.filter((s) => s.category === category);
    return limit ? all.slice(0, limit) : all;
  }, [category, limit]);

  return (
    <div>
      {filterable ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {site.solutionCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`b-label border-[3px] border-ink px-3.5 py-2 transition-colors ${
                category === c ? 'bg-ink text-volt' : 'bg-paper text-ink hover:bg-volt'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((solution, i) => {
          const Icon = ICONS[solution.icon] || Briefcase;

          return (
            <Reveal key={solution.title} delay={(i % 3) * 70}>
              <article className="b-card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center bg-ink text-volt">
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="b-label text-muted">{solution.category}</span>
                </div>

                <h3 className="b-display mt-6 text-[1.05rem] text-ink">{solution.title}</h3>
                <p className="b-body mt-3 text-[13px] text-muted">{solution.outcome}</p>

                <ul className="mt-6 flex flex-1 flex-wrap content-start gap-1.5">
                  {solution.features.map((feature) => (
                    <li key={feature} className="b-mono border-2 border-ink/20 px-2 py-1 text-ink/70">
                      {feature}
                    </li>
                  ))}
                </ul>

                {solution.reporting ? (
                  <p className="b-label mt-6 border-t-2 border-ink/15 pt-4 text-blazeText">
                    {solution.reporting}
                  </p>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
