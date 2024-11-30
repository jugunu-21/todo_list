import { useCurrentUser } from '../../helpers/zustand';
import getUserSession from '../../helpers/session-user/get-session-user';
import { Navigate } from 'react-router-dom';

export function SignedOutRequireRoute({ children }: { children: React.ReactNode }) {
    const { currentUser } = useCurrentUser();
    const usersession = getUserSession();

    if (currentUser && usersession) {
        console.log("User is already signed in. Redirecting to /signout.");
        return <Navigate to="/" replace />;

    }

    console.log("No user session detected. Proceeding with SignIn.");
    return <>{children}</>;
}