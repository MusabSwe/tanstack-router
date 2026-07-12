import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/profile')({
  component: RouteComponent,
})

// Layout component for the /youtube/profile route. 
// It renders a gray bar at the top and an
// <Outlet /> component that will render 
// the child routes of /youtube/profile.
function RouteComponent() {
  return <div>
    <div className='bg-gray-500 w-screen h-7'></div>
    <Outlet />
  </div>
}
