

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../helpers/zustand';
import { setUser, checkUser } from '../helpers/user/set-users';
import setSessionUser from '../helpers/session-user/set-session-user';
import { Button } from '../components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
export default function SignIn() {
    const navigate = useNavigate();
    const { setCurrentUser } = useCurrentUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const data = useSelector((state: RootState) => state.todo.value)
    const handleSignInSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const user = {
                username: username,
                password: password
            }
            if (checkUser(user)) {
                setCurrentUser(user);
                setSessionUser(user)
                setUsername('');
                setPassword('');
                navigate('/')
            }

        }
        catch (err) {
            return err
        }
    };
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignInSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>

                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md text-gray-900"
                                    required
                                />
                            </div>
                        </div>

                        <div className='  flex justify-center items-center w-full'>
                            <Button className='w-full' type="submit"  >

                                Sign in
                            </Button>

                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Doesn't have account.?
                        <a href="/signup" className=" ml-1 font-semibold text-amber-800 hover:text-amber-900">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    )
}




