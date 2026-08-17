// Executes untrusted student code inside a sandboxed, srcdoc-based iframe with
// no `allow-same-origin`, so it can never touch the parent DOM, cookies, or
// localStorage. Communication happens only via window.postMessage.

const EXECUTION_TIMEOUT_MS = 3000;

// Rewrites console.* calls and the global scope so student code can only
// talk to us through postMessage — never through direct DOM/global access.
const SANDBOX_DOCUMENT = `
<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body>
    <script>
      const send = (type, payload) => {
        try {
          parent.postMessage({ type, payload }, '*');
        } catch (e) {
          /* parent gone — nothing to do */
        }
      };

      const serialize = (arg) => {
        if (arg instanceof Error) return arg.message ? \`\${arg.name}: \${arg.message}\` : String(arg);
        if (typeof arg === 'undefined') return 'undefined';
        if (typeof arg === 'function') return arg.toString();
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      };

      const makeLogger = (level) => (...args) => {
        send('console', { level, args: args.map(serialize) });
      };

      console.log = makeLogger('log');
      console.info = makeLogger('info');
      console.warn = makeLogger('warn');
      console.error = makeLogger('error');

      window.onerror = (message, source, lineno, colno) => {
        send('error', { message, lineno, colno });
        return true;
      };

      window.addEventListener('message', (event) => {
        if (!event.data || event.data.type !== 'execute') return;
        const { code } = event.data;
        try {
          const result = new Function(code)();
          if (typeof result !== 'undefined') {
            send('console', { level: 'return', args: [serialize(result)] });
          }
          send('done', {});
        } catch (err) {
          send('error', { message: err.message, name: err.name });
        }
      });

      send('ready', {});
    </script>
  </body>
</html>
`;

// Turns raw browser/JS error text into something a 13-year-old can act on.
export function friendlyError(name, message) {
  const map = [
    { test: /is not defined/i, hint: 'You used a variable or function before creating it — check your spelling and that it was declared with let/const.' },
    { test: /unexpected token/i, hint: 'There is a typo in your code — look for a missing bracket ), }, or ], or a missing comma.' },
    { test: /cannot read propert(y|ies) .* of undefined/i, hint: "You tried to use something that doesn't exist yet — double check the variable has a value first." },
    { test: /is not a function/i, hint: "You're calling something that isn't a function — check the spelling, or that it's not a number/string." },
    { test: /maximum call stack/i, hint: 'Your code is looping forever (infinite recursion or loop) — check your loop condition or base case.' },
    { test: /assignment to constant variable/i, hint: 'You tried to change a value declared with const — use let instead if it needs to change.' },
  ];
  const hit = map.find((m) => m.test.test(message || ''));
  return hit ? `${hit.hint}\n\n(${name || 'Error'}: ${message})` : `${name || 'Error'}: ${message}`;
}

export function runInSandbox(code, { onEvent } = {}) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    let settled = false;
    let timeoutId;

    const cleanup = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      window.removeEventListener('message', handleMessage);
      setTimeout(() => iframe.remove(), 0);
    };

    function handleMessage(event) {
      if (event.source !== iframe.contentWindow) return;
      const { type, payload } = event.data || {};

      if (type === 'ready') {
        iframe.contentWindow.postMessage({ type: 'execute', code }, '*');
        timeoutId = setTimeout(() => {
          onEvent?.({ type: 'error', payload: { name: 'TimeoutError', message: 'Your code took too long to run — check for an infinite loop.' } });
          cleanup();
          resolve({ timedOut: true });
        }, EXECUTION_TIMEOUT_MS);
        return;
      }

      if (type === 'console') {
        onEvent?.({ type: 'console', payload });
        return;
      }

      if (type === 'error') {
        onEvent?.({ type: 'error', payload });
        cleanup();
        resolve({ error: payload });
        return;
      }

      if (type === 'done') {
        cleanup();
        resolve({ ok: true });
      }
    }

    window.addEventListener('message', handleMessage);
    iframe.srcdoc = SANDBOX_DOCUMENT;
  });
}
