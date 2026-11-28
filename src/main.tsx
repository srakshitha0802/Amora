import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminPortal from './components/AdminPortal';
import './index.css';

const isAdminRoute = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  isAdminRoute ? <AdminPortal /> : <App />
);
