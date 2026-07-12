import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/profile/')({
  component: RouteComponent,
})

// in route tree the first route is the root route,
//  while the last route is the basic route.
// and routes between the root and basic are the index routes
//  index route is the index.tsx of the folder, and it is the default route for that folder
function RouteComponent() {
  return (
    <div>
      <Link to='/youtube/profile/musab' className='bg-blue-500 rounded-lg p-4 cursor-pointer'>
        Musab
      </Link>
      <Link to='/youtube/profile/fahad' className='bg-blue-500 rounded-lg p-4 cursor-pointer'>
        Fahad
      </Link>
    </div>
  )
}
