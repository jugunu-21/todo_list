
import { ITodos } from "../../type/todo"
import { TODOS_KEY } from "../storage-keys"
import getSessionUser from "../session-user/get-session-user";
export default function setTodos(todos: ITodos[]) {
    const currentUser = getSessionUser();
    console.log("seesionuser", currentUser)
    if (!currentUser) {
        return
    }
    const key = TODOS_KEY(currentUser)
    return localStorage.setItem(key, JSON.stringify(todos))
}
