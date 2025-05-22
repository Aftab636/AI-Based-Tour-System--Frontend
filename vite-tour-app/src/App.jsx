// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';    // ← all routes
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComparisonProvider } from './hooks/comparisonContext';
import { AuthProvider } from './hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
   
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ComparisonProvider>
            <AppRoutes /> {/* 👈 All pages are rendered here */}
          </ComparisonProvider>
        </QueryClientProvider>
      </AuthProvider>
    
  );
}

export default App;
