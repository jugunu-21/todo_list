
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import SignOut from './pages/sign-out';
import { Home } from './pages/home';
import { SignedOutRequireRoute } from './components/auth/signed-out-require-route';
import { SignedInRequireRoute } from './components/auth/auth-require-route';
export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignedInRequireRoute><Home /></SignedInRequireRoute>} />
                <Route path="/signin" element={<SignedOutRequireRoute><SignIn /></SignedOutRequireRoute>} />
                <Route path="/signup" element={<SignedOutRequireRoute><SignUp /></SignedOutRequireRoute>} />
                <Route path="/signout" element={<SignedInRequireRoute><SignOut /></SignedInRequireRoute>} />
            </Routes>
        </Router>
    );
}
