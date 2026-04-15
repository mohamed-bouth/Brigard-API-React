import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from './assets/context/ApiContext.jsx'
import { AuthProvider } from './assets/context/AuthContext.jsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApiProvider>
    </QueryClientProvider>
  </StrictMode>,
)
