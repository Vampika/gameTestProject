import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from './pages/MainPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <MainPage />
  </StrictMode>,
)
