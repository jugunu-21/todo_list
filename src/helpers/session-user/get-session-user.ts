import { SESSION_USERS_KEY } from "../storage-keys";

export default function getSessionUser() {
    const key = SESSION_USERS_KEY;
    const userSession = localStorage.getItem(key)
    if (userSession) {
        return JSON.parse(userSession)
    }
    return null
}