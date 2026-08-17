import { X, BookMarked } from 'lucide-react';
import { JS_FORMULAS } from '../snippets/jsFormulas.js';

export default function FormulaSheet({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="scrollbar-thin flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-surface-700 bg-surface-900 shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-700 px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <BookMarked size={16} className="text-brand-400" />
            JavaScript Formula Sheet
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-surface-700 hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-auto px-5 py-4">
          {JS_FORMULAS.map((group) => (
            <div key={group.category} className="mb-5">
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-400">
                {group.category}
              </h3>
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.syntax}
                    className="rounded-lg border border-surface-700 bg-surface-800 px-3 py-2"
                  >
                    <code className="block break-words font-mono text-sm text-success-400">
                      {item.syntax}
                    </code>
                    <p className="mt-1 text-xs text-slate-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
