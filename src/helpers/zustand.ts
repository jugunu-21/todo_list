"use client"
import { create } from 'zustand';
import getUserSession from "./get-current-user";
interface Iuser {
    username: string
    password: string
}
const usersession = getUserSession()
interface IuseUser {
    currentUser: Iuser | null;
    setCurrentUser: (user: Iuser) => void;
}
export const useCurrentUser = create<IuseUser>((set: any) => ({
    currentUser: usersession,
    setCurrentUser: (user: Iuser) => set(() => ({
        user: user
    })),
}));