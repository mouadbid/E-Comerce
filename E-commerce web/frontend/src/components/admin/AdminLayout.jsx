import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, FileText, LogOut } from 'lucide-react';

export default function AdminLayout() {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Produits', href: '/admin/products', icon: Package },
        { name: 'Clients', href: '/admin/customers', icon: Users },
        { name: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Factures', href: '/admin/invoices', icon: FileText },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col bg-slate-900">
                {/* Logo */}
                <div className="flex items-center justify-center h-16 bg-slate-950">
                    <span className="text-white font-bold text-xl tracking-tighter">IKEA-ish Admin</span>
                </div>

                {/* Nav */}
                <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
                    <nav className="flex-1 px-2 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                            ? 'bg-slate-800 text-white'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Sidebar */}
                <div className="flex-shrink-0 flex bg-slate-950 p-4">
                    <Link to="/" className="flex items-center text-slate-300 hover:text-white transition-colors w-full">
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className="text-sm font-medium">Retour au site</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
