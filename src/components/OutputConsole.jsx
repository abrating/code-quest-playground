import { useEffect, useRef } from 'react';
import { Terminal, Trash2, AlertTriangle, ArrowRight } from 'lucide-react';

const LEVEL_STYLES = {
  log: 'text-slate-200',
  info: 'text-brand-400',
  warn: 'text-warn-400',
  error: 'text-danger-400',
  return: 'text-success-400',
};

export default function OutputConsole({ entries, onClear }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [entries]);

  return (
    <div className="flex h-full flex-col rounded-xl border border-surface-700 bg-surface-900">
      <div className="flex items-center justify-between border-b border-surface-700 px-4 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <Terminal size={15} />
          Console Output
        </div>
        <button
          onClick={onClear}
          title="Clear console"
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-surface-700 hover:text-slate-200"
        >
          <Trash2 size={13} />
          Clear
        </button>
      </div>

      <div className="scrollbar-thin flex-1 overflow-auto px-4 py-3 font-mono text-sm">
        {entries.length === 0 && (
          <p className="text-slate-500">
            Nothing here yet — hit <span className="text-brand-400">Run Code</span> to see your output. 🚀
          </p>
        )}

        {entries.map((entry, idx) => (
          <div key={idx} className="mb-1.5 flex gap-2 whitespace-pre-wrap break-words">
            {entry.level === 'error' ? (
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-danger-400" />
            ) : entry.level === 'return' ? (
              <ArrowRight size={15} className="mt-0.5 shrink-0 text-success-400" />
            ) : (
              <span className="mt-0.5 shrink-0 select-none text-slate-600">›</span>
            )}
            <span className={LEVEL_STYLES[entry.level] || 'text-slate-200'}>{entry.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
