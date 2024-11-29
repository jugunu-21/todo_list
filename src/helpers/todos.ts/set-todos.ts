
import { ITodos } from "../../type/todo"
import { useCurrentUser } from "./../zustand"
import { TODOS_KEY } from "../storage-keys"
export default function setTodos(usertodos: ITodos) {
    const { currentUser } = useCurrentUser()
    if (!currentUser) {
        return
    }

    const key = TODOS_KEY(currentUser)
    return localStorage.setItem(key, JSON.stringify(usertodos))
}
