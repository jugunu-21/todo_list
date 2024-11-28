
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/signin';
import SignOut from './pages/signout';
import { Home } from './pages/home';
import { SignedOutRequireRoute } from './component/auth/signed-out-require-route';
import { SignedInRequireRoute } from './component/auth/auth-require-route';
export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignedInRequireRoute><Home /></SignedInRequireRoute>} />
                <Route path="/signin" element={<SignedOutRequireRoute><SignIn /></SignedOutRequireRoute>} />
                <Route path="/signout" element={<SignedInRequireRoute><SignOut /></SignedInRequireRoute>} />
            </Routes>
        </Router>
    );
}
