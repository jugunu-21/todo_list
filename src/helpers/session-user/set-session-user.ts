
import { IUser } from "../../type/auth"
export default function setSessionUser(userSession: IUser) {
    return localStorage.setItem("userSession", JSON.stringify(userSession))
}