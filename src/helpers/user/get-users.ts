export default function getUsers() {
    const users = localStorage.getItem("users")
    if (users) {
        return JSON.parse(users)
    }
    return null
}