import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Configuration for "Inspiration" Hero Images
    const categoryConfig = {
        'Salon': {
            title: 'Le Salon, cœur de la maison',
            subtitle: 'Un espace pour se détendre, recevoir et vivre.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80'
        },
        'Chambre': {
            title: 'Votre sanctuaire de repos',
            subtitle: 'Douceur, calme et sérénité pour des nuits parfaites.',
            image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=1600&q=80'
        },
        'Bureau': {
            title: 'Espace de travail créatif',
            subtitle: 'Productivité et style, sans compromis.',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
        },
        'Cuisine': {
            title: 'L\'art de recevoir',
            subtitle: 'Des ustensiles et du mobilier pour les chefs du quotidien.',
            image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80'
        },
        'Salle de bain': {
            title: 'Bien-être au quotidien',
            subtitle: 'Organisation et pureté pour votre routine.',
            image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80'
        },
        'Décoration': {
            title: 'Les détails qui changent tout',
            subtitle: 'Personnalisez votre intérieur avec nos touches finales.',
            image: 'https://images.unsplash.com/photo-1534349762913-96c87130f6bf?auto=format&fit=crop&w=1600&q=80'
        },
        'Jardin': {
            title: 'Oasis extérieure',
            subtitle: 'Profitez du soleil avec confort et élégance.',
            image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1600&q=80'
        }
    };

    const config = categoryConfig[categoryName] || {
        title: categoryName,
        subtitle: 'Découvrez notre collection.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'
    };

    useEffect(() => {
        setLoading(true);
        // Correct query param is 'categorie', referencing the backend requirement
        fetch(`http://localhost:3000/api/products?categorie=${categoryName}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching category products:', err);
                setLoading(false);
            });
    }, [categoryName]);

    return (
        <div className="bg-white min-h-screen">
            {/* Massive Inspirational Hero */}
            <div className="relative h-[70vh] w-full">
                <img
                    src={config.image}
                    alt={config.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 shadow-sm">
                        {config.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-100 font-light max-w-2xl">
                        {config.subtitle}
                    </p>
                </div>
            </div>

            {/* "Shop the Look" Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Reproduire ce style
                    </h2>
                    <div className="w-16 h-1 bg-ikea-blue mx-auto mt-4" />
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                        {products.map((product, index) => (
                            <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Aucun produit pour l'instant dans cette collection.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
