import { useUserStore } from '@/store/userStore'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const isAuthenticated = useUserStore(state=>state.isAuthenticated)
  const user = useUserStore(state=>state.user)
  return <div>Hello "/"!</div>
}
