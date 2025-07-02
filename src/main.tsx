import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { theme } from '@/components/common/theme.ts'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from "@/components/ui/color-mode"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>  
      <ColorModeProvider>
      <App />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)
