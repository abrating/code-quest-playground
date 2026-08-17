import { Play, RotateCcw } from 'lucide-react';
import CodeSurface from './CodeSurface.jsx';

export default function CodeEditor({ code, onChange, onRun, onReset, isRunning }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-surface-700 bg-surface-900 shadow-glow/0">
      <div className="flex items-center justify-between border-b border-surface-700 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-danger-500/80" />
          <span className="h-3 w-3 rounded-full bg-warn-400/80" />
          <span className="h-3 w-3 rounded-full bg-success-500/80" />
          <span className="ml-3 text-sm font-medium text-slate-400">playground.js</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset code"
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-surface-700 hover:text-slate-200"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Play size={14} />
            {isRunning ? 'Running…' : 'Run Code'}
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <CodeSurface value={code} onChange={onChange} language="javascript" placeholder="// Write your JavaScript here..." />
      </div>
    </div>
  );
}
