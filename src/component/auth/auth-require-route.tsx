
import { useCurrentUser } from '../../helpers/zustand';
import getUserSession from '../../helpers/session-user/get-session-user';
import { Navigate } from 'react-router-dom';
export function SignedInRequireRoute({ children }: { children: React.ReactNode }) {
    const { currentUser } = useCurrentUser();
    const usersession = getUserSession();
    if (!(currentUser || usersession)) {
        console.log("No user session detected. Redirecting to /signin.");
        return <Navigate to="/signin" replace />;
    }

    console.log("User is signed in:", currentUser || usersession);
    return <>{children}</>;
}