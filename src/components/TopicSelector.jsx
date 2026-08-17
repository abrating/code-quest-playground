import { BookOpen, Box, Plus, Repeat, Shuffle } from 'lucide-react';
import { TOPICS } from '../snippets/starterSnippets.js';

const TOPIC_ICONS = {
  box: Box,
  plus: Plus,
  repeat: Repeat,
  shuffle: Shuffle,
};

export default function TopicSelector({ activeTopicId, onSelect }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-surface-700 bg-surface-900 p-3">
      <div className="flex items-center gap-2 px-1 text-sm font-medium text-slate-400">
        <BookOpen size={15} />
        Starter Snippets
      </div>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const isActive = topic.id === activeTopicId;
          const Icon = TOPIC_ICONS[topic.icon];
          return (
            <button
              key={topic.id}
              onClick={() => onSelect(topic)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'border-brand-500 bg-brand-600/20 text-brand-400 shadow-glow'
                  : 'border-surface-700 bg-surface-800 text-slate-300 hover:border-brand-500/50 hover:text-slate-100'
              }`}
            >
              <Icon size={15} />
              {topic.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
