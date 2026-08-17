import { useEffect, useMemo, useRef, useState } from 'react';
import { Monitor, RefreshCw } from 'lucide-react';
import { friendlyError } from '../utils/sandboxRunner.js';

const DEBOUNCE_MS = 400;

function buildSrcDoc(html, css, js) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>
      window.onerror = function (message, source, lineno) {
        parent.postMessage({ type: 'web-preview-error', payload: { message, lineno } }, '*');
        return true;
      };
    </script>
    <script>
      try {
        ${js}
      } catch (err) {
        parent.postMessage({ type: 'web-preview-error', payload: { message: err.message, name: err.name } }, '*');
      }
    </script>
  </body>
</html>`;
}

export default function WebPreview({ html, css, js }) {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const srcDoc = useMemo(() => buildSrcDoc(html, css, js), [html, css, js, refreshKey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      if (iframeRef.current) {
        iframeRef.current.srcdoc = srcDoc;
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [srcDoc]);

  useEffect(() => {
    function handleMessage(event) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'web-preview-error') {
        setError(friendlyError(event.data.payload.name, event.data.payload.message));
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-xl border border-surface-700 bg-surface-900">
      <div className="flex items-center justify-between border-b border-surface-700 px-4 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <Monitor size={15} />
          Live Preview
        </div>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          title="Force refresh"
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-400 transition hover:bg-surface-700 hover:text-slate-200"
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      <div className="min-h-0 flex-1 bg-white">
        <iframe
          ref={iframeRef}
          title="Live preview"
          sandbox="allow-scripts"
          className="h-full w-full border-0"
        />
      </div>

      {error && (
        <div className="border-t border-danger-500/30 bg-danger-500/10 px-4 py-2 font-mono text-xs text-danger-400">
          {error}
        </div>
      )}
    </div>
  );
}
