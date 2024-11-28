
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../helpers/zustand';
import setUsers from '../helpers/user/set-users';
import setSessionUser from '../helpers/session-user/set-session-user';
const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useCurrentUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSignInSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const user = {
                username: username,
                password: password
            }

            setUsers(user)
            setSessionUser(user)
            setCurrentUser(user);
            setUsername('');
            setPassword('');

            navigate('/')
        }
        catch (err) {
            return err
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <form onSubmit={handleSignInSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SignIn;
