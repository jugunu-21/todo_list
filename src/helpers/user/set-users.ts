import { IUser } from "../../type/auth"
import getUsers from "./get-users"
export default function setUsers(user: IUser) {
    const users = getUsers()
    const userExists = users.some((u: IUser) => u.username === user.username && u.password === user.password)
    console.log("cvhjbk", users)
    if (users && users.length > 0) {
        if (userExists) {
            return
        }
        else {
            users.push(user)
            return localStorage.setItem("users", JSON.stringify(users))
        }
    }
    else {
        return localStorage.setItem("users", JSON.stringify([user]))
    }

}