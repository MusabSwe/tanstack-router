import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await res.json()
            return data
        },
    })

    return (
        <div className='flex flex-col gap-8 p-4'>
            {posts?.map((post: any) => (
                <Link to={`/posts/$postId`} params={{ postId: String(post.id) }} key={post.id} className='no-underline'>
                    <div key={post.id} className='flex flex-col gap-2 rounded-lg border p-4'>
                        <h2 className='text-xl font-bold'>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
