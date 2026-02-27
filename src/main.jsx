
import { createRoot } from 'react-dom/client'
import './index.css'

import AppRoutes from './Routes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
 <HelmetProvider>
     <Toaster position="top-right" richColors />
    <AppRoutes />
  </HelmetProvider>
)
