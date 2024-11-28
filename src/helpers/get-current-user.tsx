
export default function getUserSession() {
    const user = localStorage.getItem("currentUser")
    if (user) {
        return JSON.parse(user)
    }
    return null
}