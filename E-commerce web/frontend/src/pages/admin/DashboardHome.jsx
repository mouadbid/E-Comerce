import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, Users, AlertTriangle, Package } from 'lucide-react';

export default function DashboardHome() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        users: 0,
        lowStock: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/dashboard')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Dashboard Fetch Error", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Chargement des données...</div>;

    const cards = [
        { name: 'Chiffre d\'Affaires', value: `${Number(stats.revenue).toFixed(2)} €`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Commandes', value: stats.orders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Clients', value: stats.users, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Stock Faible', value: stats.lowStock, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Vue d'ensemble</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((item) => (
                    <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden transition hover:shadow-md">
                        <dt>
                            <div className={`absolute rounded-md p-3 ${item.bg}`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                            </div>
                            <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                        </dt>
                        <dd className="ml-16 pb-1 flex items-baseline sm:pb-2">
                            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Dernières Commandes</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {stats.recentActivity.map((order) => (
                            <li key={order.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Package className="h-5 w-5 text-gray-400 mr-3" />
                                        <p className="text-sm font-medium text-ikea-blue truncate">Commande #{order.id}</p>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.statut === 'livré' ? 'bg-green-100 text-green-800' :
                                                order.statut === 'annulé' || order.statut === 'bloqué' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {order.statut}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500">
                                            {order.User ? order.User.nom : 'Client inconnu'}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                        <p>{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                        {stats.recentActivity.length === 0 && (
                            <li className="px-4 py-8 text-center text-gray-500">Aucune commande récente.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
