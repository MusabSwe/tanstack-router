// import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

const fetchPost = async (postId: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const data = await res.json()
    return data
}

export const Route = createFileRoute('/posts/$postId')({
    component: RouteComponent,
    loader: ({ params }) => fetchPost(params.postId) // I can pass more than params such as deps, 
})

function RouteComponent() {
    const data = useLoaderData({ from: '/posts/$postId' });
   
    // const { postId } = useParams({ from: '/posts/$postId' }); // useParams is a hook from @tanstack/react-router that allows you to access the parameters of the current route. In this case, it retrieves the postId parameter from the URL.
    // const { data } = useQuery({
    //     queryKey: ['post', postId], // The query key is an array that uniquely identifies the query. In this case, it consists of the string 'post' and the postId parameter. This allows React Query to cache and manage the data for each post separately.
    //     queryFn: () => fetchPost(postId), // The query function is a function that fetches the data for the query. In this case, it calls the fetchPost function with the postId parameter.
    // })
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
