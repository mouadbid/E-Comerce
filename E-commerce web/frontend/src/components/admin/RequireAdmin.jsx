import { useAuth } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireAdmin({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Vérification des droits...</div>;
    }

    if (!user || user.role !== 'admin') {
        // Redirect to login if not logged in, or home if logged in but not admin
        // Actually, better to redirect to login if no user, and show 403 if user but not admin
        if (!user) {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-4xl font-bold text-gray-200 mb-4">403</h1>
                <p className="text-gray-600">Accès refusé. Réservé aux administrateurs.</p>
            </div>
        );
    }

    return children;
}
