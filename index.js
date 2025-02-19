import 'expo-router/entry';
import { createRoot } from 'react-dom/client';
import App from './App';

if (typeof document !== 'undefined') {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
} else {
  // For non-web platforms, use Expo's registerRootComponent
  import('expo').then(({ registerRootComponent }) => {
    registerRootComponent(App);
  });
}