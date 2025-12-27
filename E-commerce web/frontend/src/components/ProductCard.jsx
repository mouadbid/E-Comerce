import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="group cursor-pointer">
            <Link to={`/product/${product.id}`}>
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#f5f5f5] relative mb-4">
                    <img
                        src={product.image_url || `https://via.placeholder.com/400x500?text=${product.titre}`}
                        alt={product.titre}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation when clicking 'Add to Cart'
                            addToCart(product);
                        }}
                        className="absolute bottom-4 right-4 bg-ikea-blue text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-800 hover:scale-110 active:scale-95 z-10"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </Link>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                <Link to={`/product/${product.id}`}>{product.titre}</Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 truncate">{product.description}</p>
            <div className="mt-2 flex items-baseline gap-1">
                <span className="text-xs align-top font-bold">€</span>
                <span className="text-2xl font-bold text-gray-900">{Math.floor(product.prix)}</span>
                <span className="text-xs font-bold">{(product.prix % 1).toFixed(2).substring(2)}</span>
            </div>
        </div>
    );
}
