import { IUser } from "../type/auth";
import { generateUserKey } from "./generateUserKey";
export const USERS_KEY = "users";
export const SESSION_USERS_KEY = "sessionUser";
export const TODOS_KEY = (currentUser: IUser) => generateUserKey(currentUser)
