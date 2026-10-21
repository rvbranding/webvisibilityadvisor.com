import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Reveal from './Reveal';

/**
 * An accordion rather than a two-column list, because these answers run long
 * enough that showing all of them at once buries the questions.
 */
export default function Faq({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;

        return (
          <Reveal key={item.q} delay={i * 50}>
            <div
              className={`border-[3px] border-ink ${isOpen ? 'bg-volt' : 'bg-paper2'}`}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-8 px-6 py-5 text-left"
                >
                  <span className="b-title text-[15.5px] text-ink sm:text-[1.05rem]">
                    {item.q}
                  </span>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-ink text-volt">
                    {isOpen ? (
                      <Minus size={14} strokeWidth={3} />
                    ) : (
                      <Plus size={14} strokeWidth={3} />
                    )}
                  </span>
                </button>
              </h3>

              {isOpen ? (
                <p className="b-body max-w-3xl px-6 pb-6 text-[14px] text-ink/80">{item.a}</p>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
