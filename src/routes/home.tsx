import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
    component: RouteComponent,
})

function RouteComponent() {
    // useNavigate is a hook from @tanstack/react-router 
    // that returns a function for navigating to a different route.
    // It allows you to programmatically navigate to a different route
    // in your application.
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: '/about', });
    }

    return (
    <div className='flex justify-between items-center w-full h-screen'>

        <button onClick={handleClick} className='bg-blue-500 rounded-lg p-4 cursor-pointer'>
            About
        </button>

        <Link to='/contact' className='bg-blue-500 rounded-lg p-4 cursor-pointer'>
            Contact
        </Link>
        <Link to='/more' className='bg-blue-500 rounded-lg p-4 cursor-pointer'>
            More
        </Link>

    </div>
    );
}
