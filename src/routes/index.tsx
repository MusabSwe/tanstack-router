import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
        <h1>Pages</h1>
        <div className='flex  text-sm'>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to='/home'>Home</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to='/about'>about</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to='/contact'>contact</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to='/more'>more</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to='/posts'>posts</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to='/shop'>shop</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to="/posts">Posts</Link>
          <Link className='bg-blue-500 w-fit p-2 m-1 rounded shadow-2xl' to="/slowPosts">Slow Posts</Link>
        </div>
      </p>
    </div>
  )
}
