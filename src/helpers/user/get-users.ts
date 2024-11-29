import { USERS_KEY } from "../storage-keys"

export default function getUsers() {
    const key = USERS_KEY
    const users = localStorage.getItem(key)
    if (users) {
        return JSON.parse(users)
    }
    return null
}