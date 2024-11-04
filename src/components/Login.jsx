import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported for making requests
import Error from './Error';
import Input from './Input';
import { useAuth } from '../context/AuthContext'; // Import the auth context

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Hook for navigation
    const { login } = useAuth(); // Get the login function from context

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await axios.post('https://login-backend-rwls.onrender.com/api/login', credentials);
            
            if (response.status === 200) {
                const token = response.data.token; // Extract token from response
                login(token); // Pass token to login function in AuthContext
                navigate('/user'); // Redirect to the user route
                console.log(token)
            } else {
                setError('Invalid login attempt.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <>
            {error && <Error errorName={error} />}

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <h1 className="text-4xl font-bold">📌Login</h1>
                    <div className="card bg-base-100 w-full px-5 max-w-md shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <Input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
                            <Input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
                            <label className="label">
                                <Link to="/register" className="label-text-alt link link-hover">
                                    Don't have an account? Register here
                                </Link>
                            </label>
                            <div className="form-control">
                                <button type="submit" disabled={isLoading} className="btn my-3 btn-error rounded">
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}