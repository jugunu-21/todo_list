
import { TODOS_KEY } from "../storage-keys";
import getSessionUser from "../session-user/get-session-user";
export default function getTodos() {
    const sessionUser = getSessionUser();
    if (!sessionUser) {
        return []
    }
    const key = TODOS_KEY(sessionUser)
    const todos = localStorage.getItem(key)
    if (todos) {
        return JSON.parse(todos)
    }
    return []
}