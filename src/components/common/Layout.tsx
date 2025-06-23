import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import { Box } from '@chakra-ui/react'

const Layout = () => {
  
  return (
    <div className='h-screen w-screen overflow-hidden flex'>
      <Sidebar/>  
      <div className='h-full w-full'>
        <Header/>
        <Box p={6} overflow="auto" height="91%" >
          <Outlet/>
        </Box>
      </div>
    </div>
  )
}

export default Layout