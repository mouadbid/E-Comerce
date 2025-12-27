import { Link } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, LogOut, Package } from 'lucide-react'; // Imports updated
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // New import

export default function Navbar() {
    const { totalItems } = useCart();
    const { user, logout } = useAuth(); // authentication hook

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <span className="font-bold text-2xl tracking-tighter text-ikea-blue">IKEA-ish.</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden sm:flex space-x-8">
                        <Link to="/" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">Accueil</Link>
                        <Link to="/shop" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">Tous les produits</Link>
                        <Link to="/category/Salon" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Salon</Link>
                        <Link to="/category/Bureau" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Bureau</Link>
                        <Link to="/category/Chambre" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Chambre</Link>
                        <Link to="/category/Cuisine" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Cuisine</Link>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">

                        {/* Admin Link (Only if Admin) */}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-gray-500 hover:text-ikea-blue flex items-center gap-1 text-sm font-medium">
                                <Package size={18} />
                                Admin
                            </Link>
                        )}

                        {/* Auth State */}
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-900 hidden md:block">
                                    Bonjour, {user.nom ? user.nom.split(' ')[0] : 'Membre'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                    title="Se déconnecter"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                <UserIcon size={20} strokeWidth={2} />
                            </Link>
                        )}

                        {/* Cart Icon */}
                        <Link to="/cart" className="group -m-2 flex items-center p-2">
                            <div className="relative">
                                <ShoppingBag
                                    className="h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-ikea-blue text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">Panier</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
