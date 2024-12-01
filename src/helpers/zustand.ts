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
    setCurrentUserwithoutprops: () => void;
    setCurrentUser: (user: Iuser) => void;
    removeCurrentUser: () => void;
}
export const useCurrentUser = create<IuseUser>((set: any) => ({
    currentUser: usersession,
    setCurrentUserwithoutprops: () => set(() => ({
        user: getSessionUser()
    })),
    setCurrentUser: (user: Iuser) => set(() => ({
        user: user || usersession
    })),
    removeCurrentUser: () => set(() => ({
        user: null
    })),
}));