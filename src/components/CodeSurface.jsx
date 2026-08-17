import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

const FONT_SIZE = 14;
const LINE_HEIGHT = 21;

// Bare code-editing surface (no window chrome/buttons) shared by the JS
// console mode and the multi-tab web builder mode.
export default function CodeSurface({ value, onChange, language = 'javascript', placeholder }) {
  const lineCount = value.split('\n').length;

  return (
    <div className="scrollbar-thin flex h-full overflow-auto px-2 py-2 font-mono text-sm">
      <div
        className="sticky left-0 z-10 select-none border-r border-surface-700 bg-surface-900 pr-2 text-right text-slate-600"
        style={{ paddingTop: 12, lineHeight: `${LINE_HEIGHT}px`, fontSize: FONT_SIZE }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="min-w-0 flex-1 pl-2">
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={(text) => highlight(text, languages[language] || languages.javascript, language)}
          padding={12}
          tabSize={2}
          insertSpaces
          preClassName="code-nowrap"
          textareaClassName="code-nowrap"
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", ui-monospace, monospace',
            fontSize: FONT_SIZE,
            lineHeight: `${LINE_HEIGHT}px`,
            minHeight: '100%',
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
