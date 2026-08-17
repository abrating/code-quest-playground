import { useCallback, useState } from 'react';
import { Sparkles, Terminal, Globe, BookMarked } from 'lucide-react';
import CodeEditor from './components/Editor.jsx';
import OutputConsole from './components/OutputConsole.jsx';
import TopicSelector from './components/TopicSelector.jsx';
import WebBuilder from './components/WebBuilder.jsx';
import FormulaSheet from './components/FormulaSheet.jsx';
import { TOPICS } from './snippets/starterSnippets.js';
import { runInSandbox, friendlyError } from './utils/sandboxRunner.js';

const MODES = [
  { id: 'console', label: 'JS Console', icon: Terminal },
  { id: 'webpage', label: 'Web Page Builder', icon: Globe },
];

export default function App() {
  const [mode, setMode] = useState('console');
  const [showFormulas, setShowFormulas] = useState(false);
  const [activeTopic, setActiveTopic] = useState(TOPICS[0]);
  const [code, setCode] = useState(TOPICS[0].code);
  const [entries, setEntries] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const appendEntry = useCallback((entry) => {
    setEntries((prev) => [...prev, entry]);
  }, []);

  const handleRun = useCallback(async () => {
    setEntries([]);
    setIsRunning(true);

    await runInSandbox(code, {
      onEvent: ({ type, payload }) => {
        if (type === 'console') {
          appendEntry({ level: payload.level, text: payload.args.join(' ') });
        } else if (type === 'error') {
          appendEntry({ level: 'error', text: friendlyError(payload.name, payload.message) });
        }
      },
    });

    setIsRunning(false);
  }, [code, appendEntry]);

  const handleSelectTopic = useCallback((topic) => {
    setActiveTopic(topic);
    setCode(topic.code);
    setEntries([]);
  }, []);

  const handleReset = useCallback(() => {
    setCode(activeTopic.code);
    setEntries([]);
  }, [activeTopic]);

  return (
    <div className="flex h-screen flex-col gap-4 bg-surface-950 p-4 text-slate-100 md:p-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 shadow-glow">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Code Quest</h1>
            <p className="text-xs text-slate-400">Your JavaScript training grounds</p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-surface-700 bg-surface-900 p-1">
          {MODES.map((m) => {
            const Icon = m.icon;
            const isActive = m.id === mode;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-glow'
                    : 'text-slate-400 hover:bg-surface-700 hover:text-slate-200'
                }`}
              >
                <Icon size={14} />
                {m.label}
              </button>
            );
          })}
        </div>
      </header>

      {mode === 'console' ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <TopicSelector activeTopicId={activeTopic.id} onSelect={handleSelectTopic} />
            </div>
            <button
              onClick={() => setShowFormulas(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-surface-700 bg-surface-900 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-brand-500/50 hover:text-slate-100"
            >
              <BookMarked size={15} />
              JS Formulas
            </button>
          </div>

          <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRun}
              onReset={handleReset}
              isRunning={isRunning}
            />
            <OutputConsole entries={entries} onClear={() => setEntries([])} />
          </main>

          {showFormulas && <FormulaSheet onClose={() => setShowFormulas(false)} />}
        </>
      ) : (
        <WebBuilder />
      )}
    </div>
  );
}
