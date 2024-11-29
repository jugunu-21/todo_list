
import { TODOS_KEY } from "../storage-keys";
import getSessionUser from "../session-user/get-session-user";
export default function getTodos() {
    const { currentUser } = getSessionUser();
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