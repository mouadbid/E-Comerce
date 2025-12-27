import { useState, useEffect } from 'react';
import { Mail, Shield, AlertCircle, Trash2 } from 'lucide-react';

export default function AdminCustomers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/users')
            .then(res => {
                if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Impossible de charger les clients.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment bloquer (supprimer) ce client ?")) {
            fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setUsers(users.filter(u => u.id !== id));
                    } else {
                        alert("Erreur lors de la suppression");
                    }
                })
                .catch(err => console.error(err));
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Chargement...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Clients</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscrit le</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.nom}</div>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Mail size={14} className="mr-1" />
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.date_creation ? new Date(user.date_creation).toLocaleDateString() : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Bloquer / Supprimer"
                                    >
                                        <Trash2 size={18} />
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
