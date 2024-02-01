import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { 
  initializePositions, 
  setPosition, 
  updateActivePositions, 
  store 
} from './store';
import { PluginOptions } from './types';



declare global {
  interface Window {
    MY_APP: any,
    DAMAGE_SELECTOR_API: any
  }
}


if (import.meta.env.MODE === 'development') {
  const renderElement = document.getElementById('root');
  ReactDOM.createRoot(renderElement as HTMLElement).render(
    <React.StrictMode>
      <App
        options={{
          initializedOptions: store.getState(),
          onInit: initializePositions,
          onComplete: (positions: string[]) => setPosition(positions),
          onPositionChange: (positions: string[]) => updateActivePositions(positions),
        }}
      />
    </React.StrictMode>
  );
} else {
  window.DAMAGE_SELECTOR_API = {
    init: (options: PluginOptions) => {
      const { selector } = options;
      if (selector) {
        const renderElement = document.querySelector(selector);
        if (renderElement) {
          ReactDOM.createRoot(renderElement as HTMLElement).render(
            <React.StrictMode>
              <App options={{
                selector: selector,
                initializedOptions: store.getState(),
                onInit: initializePositions,
                onComplete: (positions: string[]) => setPosition(positions),
                onPositionChange: (positions: string[]) => updateActivePositions(positions),
              }} />
            </React.StrictMode>
          );
        }
      }
    },
  };
}
