import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminProductForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        prix: '',
        stock: '',
        categorie: 'Général',
        image_url: '' // Fallback text URL
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetch(`http://localhost:3000/api/products/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Produit introuvable');
                    return res.json();
                })
                .then(data => {
                    console.log("Product fetched:", data); // Debug log
                    setFormData({
                        titre: data.titre,
                        description: data.description,
                        prix: data.prix,
                        stock: data.stock,
                        categorie: data.categorie || 'Général',
                        image_url: data.image_url
                    });
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    alert("Impossible de charger le produit.");
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isEditMode
            ? `http://localhost:3000/api/products/${id}`
            : 'http://localhost:3000/api/products';

        const method = isEditMode ? 'PUT' : 'POST';

        // Needs FormData for file upload
        const data = new FormData();
        data.append('titre', formData.titre);
        data.append('description', formData.description);
        data.append('prix', formData.prix);
        data.append('stock', formData.stock);
        data.append('categorie', formData.categorie);

        // If file exists, append it. If not, append the text URL (or handle in backend to keep old one)
        if (file) {
            data.append('image', file);
        } else {
            data.append('image_url', formData.image_url);
        }

        fetch(url, {
            method: method,
            // No Content-Type header needed for FormData, browser sets multipart/form-data with boundary
            body: data
        })
            .then(res => {
                if (res.ok) {
                    navigate('/admin/products');
                } else {
                    alert('Erreur lors de la sauvegarde');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Erreur réseau');
            })
            .finally(() => setLoading(false));
    };

    if (loading && isEditMode && !formData.titre) return <div className="p-8">Chargement...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {isEditMode ? 'Modifier le produit' : 'Ajouter un produit'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">

                {/* Text Fields (same as before) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" name="titre" required value={formData.titre} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
                        <input type="number" step="0.01" name="prix" required value={formData.prix} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" name="stock" required value={formData.stock} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                    <select name="categorie" value={formData.categorie} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                        <option value="Salon">Salon</option>
                        <option value="Chambre">Chambre</option>
                        <option value="Bureau">Bureau</option>
                        <option value="Cuisine">Cuisine</option>
                        <option value="Salle de bain">Salle de bain</option>
                        <option value="Décoration">Décoration</option>
                        <option value="Jardin">Jardin</option>
                    </select>
                </div>

                {/* Image Upload Selection */}
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Image du produit</h3>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Option 1: Upload depuis votre ordinateur</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OU</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Option 2: URL de l'image</label>
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    {/* Preview */}
                    <div className="mt-4">
                        <span className="block text-sm font-medium text-gray-700 mb-2">Aperçu :</span>
                        {(file || formData.image_url) ? (
                            <img
                                src={file ? URL.createObjectURL(file) : formData.image_url}
                                alt="Preview"
                                className="h-32 w-32 object-cover rounded-md border border-gray-200"
                            />
                        ) : (
                            <div className="h-32 w-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
                                Pas d'image
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex justify-end pt-4">
                    <button type="button" onClick={() => navigate('/admin/products')} className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 mr-4 hover:bg-gray-50">Annuler</button>
                    <button type="submit" disabled={loading} className="bg-ikea-blue text-white rounded-md px-4 py-2 hover:bg-blue-800 disabled:opacity-50">{loading ? '...' : 'Enregistrer'}</button>
                </div>
            </form>
        </div>
    );
}
