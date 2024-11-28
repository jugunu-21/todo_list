import { generateUserKey } from "../generateUserKey";
import { useCurrentUser } from "./../zustand"
export default function getTodos() {
    const { currentUser } = useCurrentUser()
    const userSession = currentUser;

    if (!currentUser) {
        return
    }
    const key = generateUserKey(currentUser)
    const todos = localStorage.getItem(key)
    if (todos) {
        return JSON.parse(todos)
    }
    return null
}