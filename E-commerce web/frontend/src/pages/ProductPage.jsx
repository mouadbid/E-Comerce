import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 border-4 border-ikea-blue border-t-transparent rounded-full"></div></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-xl">Produit non trouvé</div>;

    return (
        <div className="bg-white min-h-screen fade-in-up">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Retour à la boutique
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Section */}
                    <div className="relative">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100 relative">
                            <img
                                src={product.image_url}
                                alt={product.titre}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-start pt-6">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">{product.categorie}</span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{product.titre}</h1>

                        <div className="flex items-baseline mb-8">
                            <span className="text-sm align-top font-bold mt-1">€</span>
                            <span className="text-5xl font-bold text-gray-900">{Math.floor(product.prix)}</span>
                            <span className="text-lg font-bold">{(product.prix % 1).toFixed(2).substring(2)}</span>
                        </div>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-12">
                            <div className="flex items-center text-gray-600">
                                <span className={product.stock > 0 ? "h-3 w-3 bg-green-500 rounded-full mr-3" : "h-3 w-3 bg-red-500 rounded-full mr-3"}></span>
                                {product.stock > 0 ? "En stock - Disponible pour livraison" : "Rupture de stock"}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Truck size={20} className="mr-3" /> Livraison standard gratuite
                            </div>
                            <div className="flex items-center text-gray-600">
                                <ShieldCheck size={20} className="mr-3" /> Garantie 2 ans incluse
                            </div>
                        </div>

                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-ikea-blue text-white text-lg font-bold py-4 rounded-full hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={24} /> Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
