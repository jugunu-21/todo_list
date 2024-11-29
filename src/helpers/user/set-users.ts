
import { IUser } from "../../type/auth"
import { USERS_KEY } from "../storage-keys"
import getUsers from "./get-users"
import { toast } from 'react-hot-toast';
export function setUser(user: IUser) {
    const users = getUsers()
    const key = USERS_KEY
    function userExists(user: IUser) {
        return users.some((u: IUser) => u.username === user.username && u.password === user.password)
    }
    try {
        if (users !== null) {
            if (userExists(user)) {
                throw Error
            }
            toast.success("account successfully created ")
            localStorage.setItem(key, JSON.stringify([user]))
            return true

        }
        toast.success("account successfully created ")
        localStorage.setItem(key, JSON.stringify([user]))
        return true
    }
    catch (error) {
        toast.error("Some error occur ")

    }

}
export function checkUser(user: IUser) {
    const users = getUsers()
    const key = USERS_KEY
    function userExists(user: IUser) {
        return users.some((u: IUser) => u.username === user.username && u.password === user.password)
    }
    try {
        if (users !== null) {
            if (userExists(user)) {
                console.log("hy", userExists(users))
                return true
            }
            console.log("false", userExists(users))
            toast.error("No user exsist with this credentials")
            return false
        }
        toast.error("No user exsist with this credentials")
        return false

    } catch (error) {
        toast.error("Some error occur ")

    }

}
