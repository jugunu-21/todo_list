import { IUser } from "../../type/auth"
import getUsers from "./get-users"
export default function setUsers(user: IUser) {
    const users = getUsers()
    function userExists(users: IUser[]) {
        return users.some((u: IUser) => u.username === user.username && u.password === user.password)
    }
    console.log("cvhjbk", users)
    if (users !== null) {
        console.log("cvhjbkfcghvjbk", users)
        if (userExists(users)) {
            return
        }
        else {
            users.push(user)
            return localStorage.setItem("users", JSON.stringify(users))
        }
    }

    console.log("cvhjbk", users)
    return localStorage.setItem("users", JSON.stringify([user]))


}