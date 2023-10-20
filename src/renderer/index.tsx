import { createRoot } from 'react-dom/client';
import { App } from './app/app';
import { Providers } from './app/providers';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Providers>
    <App />
  </Providers>,
);
