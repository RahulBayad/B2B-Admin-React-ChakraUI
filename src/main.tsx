import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { theme } from '@/components/common/theme.ts'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>  
      <App />
    </ChakraProvider>
  </StrictMode>,
)
