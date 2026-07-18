// import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/slowPosts')({
  loader: () => fetchSlowPosts(), // this will run before the component is rendered or mounts, and the data will be available in the component via the useQuery hook. The loader function is called when the route is matched, and it returns a promise that resolves with the data to be used in the component.
  component: RouteComponent,
})

const fetchSlowPosts = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    }, 2000)
  })
}

function RouteComponent() {
  //  The diff between useQuery and useLoaderDate
  //  when use loader the component will not mount until the data is fetched, 
  // while useQuery will mount the component immediately and then fetch the data in the background. This means that when using useLoaderData, you can be sure that the data is available when the component mounts, while with useQuery, you may need to handle loading states and potential errors.

  //  1. useLoader approach
  const data = useLoaderData({ from: '/slowPosts' }); // useLoaderData is a hook from @tanstack/react-router that allows you to access the data returned by the loader function for the current route. In this case, it retrieves the data fetched by the fetchSlowPosts function, which is a promise that resolves with the posts data after a 2-second delay. The data can then be used in the component to render the posts or perform other operations.

  // 2. useQuery approach
  // const { data, isPending } = useQuery({
  //   queryKey: ['slowPosts'],
  //   queryFn: fetchSlowPosts // (when component mounts) This is a function that fetches data from the API and returns a promise that resolves with the data after a 2-second delay. The useQuery hook will call this function to fetch the data when the component mounts or when the query key changes.
  // })

  return (
    <div>
      {/* without using loaders in the route (useQuery) */}
      {/* {isPending ?
        <>loading...</>
        :
        <div>{JSON.stringify(data)}</div>
      } */}

      {/* with loaders in the route (useLoaderData) */}
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
