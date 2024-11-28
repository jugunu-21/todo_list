
export default function getSessionUser() {
    const userSession = localStorage.getItem("userSession")
    if (userSession) {
        return JSON.parse(userSession)
    }
    return null
}