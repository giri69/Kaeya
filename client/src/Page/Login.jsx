import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to log in. Please check your credentials.');
            }

            const data = await response.json();
            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            alert('Login successful!');

            // Optional: Redirect to another page
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center px-4 ps">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img
                        src="https://res.cloudinary.com/do5e8qwxk/image/upload/v1732354208/Screenshot_2024-11-23_145750_gr3gjx.png"
                        width={150}
                        className="mx-auto"
                        alt="Logo"
                    />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-blue-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="text-white">
                            Don't have an account?{' '}
                            <a
                                href="/register"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                    <div>
                        <label className="font-medium text-white">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-white">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <a href="/forgot-password" className="hover:text-indigo-600">
                            Forgot password?
                        </a>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
