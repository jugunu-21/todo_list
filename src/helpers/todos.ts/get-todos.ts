import { generateUserKey } from "../generateUserKey";
import { useCurrentUser } from "./../zustand"
import { TODOS_KEY } from "../storage-keys";
export default function getTodos() {
    const { currentUser } = useCurrentUser()
    if (!currentUser) {
        return
    }
    const key = TODOS_KEY(currentUser)
    const todos = localStorage.getItem(key)
    if (todos) {
        return JSON.parse(todos)
    }
    return null
}