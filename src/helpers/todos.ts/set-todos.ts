
import { ITodos } from "../../type/todo"
import { IUser } from "../../type/auth"
import getTodos from "./get-todos"
import { generateUserKey } from "./../generateUserKey"
import { useCurrentUser } from "./../zustand"
export default function setTodos(usertodos: ITodos) {
    const { currentUser } = useCurrentUser()
    const userSession = currentUser;
    if (!currentUser) {
        return
    }

    const key = generateUserKey(currentUser)
    return localStorage.setItem(key, JSON.stringify(usertodos))
}
