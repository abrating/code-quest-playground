import { useState } from 'react';
import { RotateCcw, Download, FileCode2, Palette, Braces } from 'lucide-react';
import CodeSurface from './CodeSurface.jsx';
import WebPreview from './WebPreview.jsx';
import { WEB_STARTER } from '../snippets/webStarter.js';

const TABS = [
  { id: 'html', label: 'HTML', language: 'markup', icon: FileCode2, filename: 'index.html', mime: 'text/html' },
  { id: 'css', label: 'CSS', language: 'css', icon: Palette, filename: 'style.css', mime: 'text/css' },
  { id: 'js', label: 'JS', language: 'javascript', icon: Braces, filename: 'script.js', mime: 'text/javascript' },
];

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function WebBuilder() {
  const [files, setFiles] = useState(WEB_STARTER);
  const [activeTab, setActiveTab] = useState('html');

  const updateFile = (id, value) => setFiles((prev) => ({ ...prev, [id]: value }));
  const resetFiles = () => setFiles(WEB_STARTER);
  const activeTabData = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex h-full flex-col rounded-xl border border-surface-700 bg-surface-900">
        <div className="flex items-center justify-between border-b border-surface-700 px-2 py-1.5">
          <div className="flex items-center gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-400'
                      : 'text-slate-400 hover:bg-surface-700 hover:text-slate-200'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => downloadFile(activeTabData.filename, files[activeTabData.id], activeTabData.mime)}
              title={`Save ${activeTabData.filename}`}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-surface-700 hover:text-slate-200"
            >
              <Download size={13} />
              {activeTabData.filename}
            </button>
            <span className="mx-1 h-4 w-px bg-surface-700" />
            <button
              onClick={resetFiles}
              title="Reset all files"
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-surface-700 hover:text-slate-200"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1">
          {TABS.map((tab) =>
            tab.id === activeTab ? (
              <CodeSurface
                key={tab.id}
                value={files[tab.id]}
                onChange={(value) => updateFile(tab.id, value)}
                language={tab.language}
                placeholder={`// Write your ${tab.label} here...`}
              />
            ) : null
          )}
        </div>
      </div>

      <WebPreview html={files.html} css={files.css} js={files.js} />
    </div>
  );
}
