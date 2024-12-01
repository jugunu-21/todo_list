import { IUser } from "../type/auth";
function generateUserKey(user: IUser) {
    if (!user.username || !user.password) {
        throw new Error("Username and password are required to generate a key.");
    }
    return `todos_${user.username}_${user.password}`;
}
export { generateUserKey }