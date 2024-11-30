"use client"
import { create } from 'zustand';
import getSessionUser from "./session-user/get-session-user";
interface Iuser {
    username: string
    password: string
}
const usersession = getSessionUser()
interface IuseUser {
    currentUser: Iuser | null;
    setCurrentUser: (user: Iuser) => void;
    removeCurrentUser: () => void;
}
export const useCurrentUser = create<IuseUser>((set: any) => ({
    currentUser: usersession,
    setCurrentUser: (user: Iuser) => set(() => ({
        user: user
    })),
    removeCurrentUser: () => set(() => ({
        user: null
    })),
}));