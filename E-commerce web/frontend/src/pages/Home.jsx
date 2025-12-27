import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.slice(0, 4));
            })
            .catch(err => console.error(err));
    }, []);

    const categories = [
        {
            name: 'Salon',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
            link: '/category/Salon'
        },
        {
            name: 'Bureau',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
            link: '/category/Bureau'
        },
        {
            name: 'Chambre',
            image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=800&q=80',
            link: '/category/Chambre'
        },
        {
            name: 'Cuisine',
            image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80',
            link: '/category/Cuisine'
        },
        {
            name: 'Salle de bain',
            image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
            link: '/category/Salle de bain'
        },
        {
            name: 'Jardin',
            image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80',
            link: '/category/Jardin'
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-[#f5f5f5] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-[#f5f5f5] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                                    <span className="block xl:inline">Le design scandinave,</span>{' '}
                                    <span className="block text-ikea-blue xl:inline">chez vous.</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Transformez votre espace avec notre collection automne-hiver. Minimalisme, fonctionnalité et chaleur pour chaque pièce de la maison.
                                </p>
                                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                                    <div className="rounded-full shadow">
                                        <Link
                                            to="/shop"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-ikea-blue hover:bg-blue-800 md:py-4 md:text-lg md:px-10 transition-transform active:scale-95"
                                        >
                                            Explorer la collection
                                        </Link>
                                    </div>
                                    <div>
                                        <Link
                                            to="/register"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-transform active:scale-95"
                                        >
                                            Rejoindre le club
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                        alt="Interior"
                    />
                </div>
            </div>

            {/* Categories Section (New Stylish Photos) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Parcourir par pièce</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.link} className="group relative h-80 overflow-hidden rounded-lg cursor-pointer">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute bottom-6 left-6 z-20">
                                <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
                                <span className="text-white text-sm font-medium flex items-center gap-1 mt-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    Voir les produits <ArrowRight size={16} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Featured Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Nos icônes du moment
                        </h2>
                        <Link to="/shop" className="hidden sm:flex items-center text-sm font-medium text-gray-900 hover:text-ikea-blue hover:underline">
                            Tout voir <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="relative bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-2 left-2 z-10 bg-ikea-yellow text-ikea-blue text-xs font-bold px-2 py-1 rounded-sm">
                                    POPULAIRE
                                </div>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className="bg-ikea-blue">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Design démocratique.</span>
                        <span className="block text-blue-200 text-xl mt-2 font-medium">Rejoignez 2 millions de membres IKEA-ish.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-ikea-blue bg-white hover:bg-gray-50"
                            >
                                S'inscrire gratuitement
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
