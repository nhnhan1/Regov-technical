import { Outlet } from 'react-router-dom'
import SidebarMenu from 'src/components/SidebarMenu'
import TopBar from 'src/components/TopBar'

export default function MainLayout() {
  return (
    <div className='main-layout flex min-h-[100vh]'>
      <SidebarMenu />
      <div className='w-full'>
        <TopBar />
        <div className=' p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
