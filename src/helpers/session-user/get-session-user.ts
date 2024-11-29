import { SESSION_USERS_KEY } from "../storage-keys";

export default function getSessionUser() {
    const key = SESSION_USERS_KEY;
    const SessionUser = localStorage.getItem(key)
    if (SessionUser) {
        return JSON.parse(SessionUser)
    }
    return null
}