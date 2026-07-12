import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Link to='/youtube/profile' className='bg-blue-500 rounded-lg p-4 cursor-pointer'>
      Profile
    </Link>
  </div>
}
