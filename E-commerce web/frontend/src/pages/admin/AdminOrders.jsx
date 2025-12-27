import { useState, useEffect } from 'react';
import { Package, Printer, AlertCircle } from 'lucide-react';
import { generateInvoice } from '../../utils/invoiceGenerator';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/orders')
            .then(res => {
                if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Impossible de charger les commandes.");
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        fetch(`http://localhost:3000/api/orders/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => {
                if (res.ok) {
                    setOrders(orders.map(o => o.id === id ? { ...o, statut: newStatus } : o));
                } else {
                    alert("Erreur lors de la mise à jour");
                }
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Chargement...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    const statusColors = {
        'en attente': 'bg-yellow-100 text-yellow-800',
        'payé': 'bg-blue-100 text-blue-800',
        'expédié': 'bg-purple-100 text-purple-800',
        'livré': 'bg-green-100 text-green-800',
        'annulé': 'bg-red-100 text-red-800',
        'bloqué': 'bg-gray-800 text-white', // Dark distinct style for Blocked
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gestion des Commandes</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-ikea-blue">
                                    #{order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {order.User ? order.User.nom : 'Inconnu'}
                                    <div className="text-xs text-gray-500">{order.User && order.User.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    {Number(order.total).toFixed(2)} €
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={order.statut}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-ikea-blue cursor-pointer ${statusColors[order.statut] || 'bg-gray-100'}`}
                                    >
                                        <option value="en attente">En attente</option>
                                        <option value="payé">Payé</option>
                                        <option value="expédié">Expédié</option>
                                        <option value="livré">Livré</option>
                                        <option value="annulé">Annulé</option>
                                        <option value="bloqué">⛔ Bloqué</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => generateInvoice(order)}
                                        className="text-gray-600 hover:text-gray-900 flex items-center justify-end gap-1 ml-auto"
                                        title="Générer Facture"
                                    >
                                        <Printer size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
