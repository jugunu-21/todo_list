import { IUser } from "../../type/auth"
import { USERS_KEY } from "../storage-keys"
import getUsers from "./get-users"
export default function setUsers(user: IUser) {
    const users = getUsers()
    const key = USERS_KEY
    function userExists(users: IUser[]) {
        return users.some((u: IUser) => u.username === user.username && u.password === user.password)
    }
    if (users !== null) {
        if (userExists(users)) {
            return
        }
        else {
            users.push(user)
            return localStorage.setItem(key, JSON.stringify(users))
        }
    }
    return localStorage.setItem(key, JSON.stringify([user]))
}