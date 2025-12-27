import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize filters based on URL params or default
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || ''
    });

    // Update filters if URL changes (e.g. clicking navbar link)
    useEffect(() => {
        setFilters({
            category: searchParams.get('category') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || ''
        });
    }, [searchParams]);

    // Fetch products with filters
    useEffect(() => {
        const query = new URLSearchParams();
        if (filters.category) query.append('categorie', filters.category); // Changed from 'category' to 'categorie' to match backend
        if (filters.minPrice) query.append('minPrice', filters.minPrice);
        if (filters.maxPrice) query.append('maxPrice', filters.maxPrice);

        fetch(`http://localhost:3000/api/products?${query.toString()}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, [filters]);

    const handleFilterChange = (name, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(name, value);
        } else {
            newParams.delete(name);
        }
        setSearchParams(newParams);
    };

    const categories = ['Salon', 'Chambre', 'Bureau', 'Cuisine', 'Salle de bain', 'Décoration', 'Jardin'];

    // Configuration for Category Hero Sections ("Modeles")
    const categoryConfig = {
        'Salon': {
            title: 'Le Salon, cœur de la maison',
            description: 'Canapés profonds, fauteuils design et éclairage d\'ambiance. Créez un espace où il fait bon vivre.',
            image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
        },
        'Chambre': {
            title: 'Douces nuits, beaux réveils',
            description: 'Lits confortables, linges douillets et rangements astucieux pour une chambre apaisante.',
            image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
        },
        'Bureau': {
            title: 'Un espace de travail inspirant',
            description: 'Bureaux ergonomiques et chaises confortables pour booster votre créativité.',
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
        },
        'Cuisine': {
            title: 'La recette du bonheur',
            description: 'Tout pour cuisiner, recevoir et partager des moments gourmands.',
            image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1200&q=80'
        }
    };

    const activeCategory = filters.category && categoryConfig[filters.category];

    return (
        <div>
            {/* Category Hero Section (Only if a category is selected and exists in config) */}
            {activeCategory && (
                <div className="relative bg-gray-900 h-[40vh] overflow-hidden mb-8">
                    <img
                        src={activeCategory.image}
                        alt={activeCategory.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4 sm:text-5xl lg:text-6xl">
                            {activeCategory.title}
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl">
                            {activeCategory.description}
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="sticky top-4 space-y-8">
                            {/* Category Filter */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="category"
                                                    value={cat}
                                                    checked={filters.category === cat}
                                                    onChange={() => {
                                                        // Toggle: if checked, remove param, else set it
                                                        const newVal = filters.category === cat ? '' : cat;
                                                        handleFilterChange('category', newVal);
                                                    }}
                                                    className="peer h-5 w-5 border-2 border-gray-300 rounded-sm text-ikea-blue focus:ring-ikea-blue cursor-pointer appearance-none checked:bg-ikea-blue checked:border-ikea-blue transition-all"
                                                />
                                                <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-1 top-1" viewBox="0 0 14 14" fill="none">
                                                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <span className={`transition-colors ${filters.category === cat ? 'font-bold text-ikea-blue' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Prix</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        name="minPrice"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-ikea-blue focus:border-ikea-blue"
                                    />
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-ikea-blue focus:border-ikea-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {filters.category ? `Produits : ${filters.category}` : 'Tous les produits'}
                                <span className="ml-2 text-gray-500 text-base font-normal">({products.length})</span>
                            </h2>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-[4/5] bg-gray-200"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map(product => (
                                    <div key={product.id} className="fade-in-up">
                                        {/* Animation class placeholder */}
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {products.length === 0 && !loading && (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 text-lg">Aucun produit ne correspond à vos critères.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
