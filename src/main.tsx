import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@app/App.tsx';
import { setupStore } from '@store/store';
const store = setupStore();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
