import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext.jsx';
import UserContext from './context/UserContext.jsx';
import ShopContext from './context/ShopContext.jsx';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before creating the root
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AuthContext>
          <UserContext>
            <ShopContext>
              <App />
            </ShopContext>
          </UserContext>
        </AuthContext>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error('Root element with ID "root" not found in the document.');
}
