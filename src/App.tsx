import './App.css'
import { store } from './redux/store'
import AppRoutes from './routes/AppRoutes'
import { Provider as ReduxProvider } from 'react-redux'

function App() {

  return (
   <>
      <ReduxProvider store={store}>
        <AppRoutes/>
      </ReduxProvider>
   </>
  )
}

export default App
