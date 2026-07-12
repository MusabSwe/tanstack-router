import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/profile/fahad')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/youtube/profile/fahad"!</div>
}
