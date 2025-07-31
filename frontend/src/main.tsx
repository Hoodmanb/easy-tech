import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAuthListener } from './store/useAuthStaor.ts';

initAuthListener()

createRoot(document.getElementById("root")!).render(<App />);
