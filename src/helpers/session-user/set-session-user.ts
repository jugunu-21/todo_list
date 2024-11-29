
import { IUser } from "../../type/auth"
import { SESSION_USERS_KEY } from "../storage-keys";
export default function setSessionUser(userSession: IUser) {
    const key = SESSION_USERS_KEY;
    return localStorage.setItem(key, JSON.stringify(userSession))
}