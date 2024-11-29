import { SESSION_USERS_KEY } from "../storage-keys";

export function removeSessionUser() {
    const key = SESSION_USERS_KEY;
    localStorage.removeItem(key)

}
