import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import { Box } from '@chakra-ui/react'

const Layout = () => {
  console.log("layout")
  return (
    <div className='h-screen w-screen overflow-hidden flex'>
      <Sidebar/>  
      <div className='h-full w-full bg-gray-50'>
        <Header/>
        <Box p={6} pb={0} overflow="auto" height="92%" >
          <Outlet/>
        </Box>
      </div>
    </div>
  )
}

export default Layout