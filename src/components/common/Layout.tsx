import { Outlet } from 'react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import { Box, Spinner } from '@chakra-ui/react'
import { Suspense } from 'react'

const Layout = () => {
  console.log("layout")
  return (
    <div className='h-screen w-screen overflow-hidden '>
      <Header/>
      <Box p={2} bgColor="gray.50" _dark={{bgColor: "transparent"}} className='h-full w-full flex gap-3 p-7'>
        <Sidebar/>  
        <Box overflow="auto" height="92%" width="full" >
          <Suspense fallback={
            <div className='h-full w-full flex items-center justify-center'>
              <Spinner/>
            </div>
          }>
            <Outlet/>
          </Suspense>
        </Box>
      </Box>
    </div>
  )
}

export default Layout