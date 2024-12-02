

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../helpers/zustand';
import { setUser, checkUser } from '../helpers/user/set-users';
import setSessionUser from '../helpers/session-user/set-session-user';
import { Button } from '../components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function SignUp() {
    const navigate = useNavigate();
    const { setCurrentUser } = useCurrentUser();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const data = useSelector((state: RootState) => state.todo.value)
    const handleSignUpSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const user = {
                username: username,
                password: password
            }

            setCurrentUser(user);
            if (setUser(user)) {
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
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm ">
                <CardHeader>
                    <CardTitle className="text-2xl">Signup</CardTitle>
                    <CardDescription>
                        Enter your email below to signup to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {/* <link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </link> */}
                            </div>
                            <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                        </div>
                        <Button type="submit" onClick={handleSignUpSubmit} className="w-full">
                            signup
                        </Button>

                    </div>
                    <div className="mt-4 text-center text-sm">
                        Have an account?
                        <a href="/signin" className="underline">
                            Sign in
                        </a>
                    </div>
                </CardContent>
            </Card >
        </div>
    )
}