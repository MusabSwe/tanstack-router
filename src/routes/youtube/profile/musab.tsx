import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/profile/musab')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/youtube/profile/musab"!</div>
}
