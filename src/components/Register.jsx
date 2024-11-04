import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Ensure axios is imported for making requests
import Error from './Error';
import Input from './Input';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Client-side validation example
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            // Make a POST request to the signup endpoint
            const response = await axios.post('https://login-backend-rwls.onrender.com/api/users', formData);
            // Handle successful signup
            console.log(response.data); // Log the response from the server
            // Optionally, redirect the user or show a success message
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {error && <Error errorName={error} />}

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <h1 className="text-4xl font-bold">👺Sign Up</h1>
                    <div className="card bg-base-100 w-full px-5 max-w-md shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />

                            <div className="form-control mt-6">
                                <button type="submit" disabled={isLoading} className="btn btn-error rounded">
                                    {isLoading ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </div>
                            <label className="label">
                                <Link to="/login" className="label-text-alt link link-hover">
                                    Already have an account? Login here
                                </Link>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}