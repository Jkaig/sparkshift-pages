import { ExpoRoot } from 'expo-router';
import { createRoot } from 'react-dom/client';
import React from 'react';

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('.', true, /^(?!\.\/(\+api|\+html)).*\.[jt]sx?$/);
  return <ExpoRoot context={ctx} />;
}

// Use createRoot for web, registerRootComponent for native
if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} else {
  // For native platforms
  const { registerRootComponent } = require('expo');
  registerRootComponent(App);
}
