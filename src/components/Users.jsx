import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
    const [users, setUsers] = useState([]); // State to hold user names
    const [error, setError] = useState(null); // State to handle errors
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        // Fetch user names when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://login-backend-rwls.onrender.com/api/users');
                setUsers(response.data); // Assuming the response is an array of user objects
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array means this runs once on mount

    if (isLoading) {
        return <div>Loading...</div>; // Simple loading indicator
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if there's an error
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <h1 className="text-4xl font-bold my-3">📢 Shoutout</h1>

                {/* Map through the users array to display each user's name */}
                {users.map((user) => (
                    <p key={user.id} className='text-center'>{user.username}</p> // Adjust 'user.name' based on your user object structure
                ))}
            </div>
        </div>
    );
}
