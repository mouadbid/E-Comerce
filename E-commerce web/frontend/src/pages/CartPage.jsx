import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, Loader, CreditCard, CheckCircle, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleInitCheckout = () => {
        if (!user) {
            alert("Vous devez être connecté pour commander !");
            navigate('/login');
            return;
        }
        setShowPayment(true);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay for "processing" payment
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    items: cart,
                    total: getCartTotal()
                })
            });

            if (response.ok) {
                setOrderSuccess(true);
                clearCart();
                setShowPayment(false);
            } else {
                alert("Erreur lors de la commande.");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur réseau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 fade-in-up">
                <div className="bg-green-100 p-6 rounded-full mb-6">
                    <CheckCircle size={64} className="text-green-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Merci pour votre commande !</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                    Votre paiement a été accepté. Vous recevrez bientôt un email de confirmation.
                </p>
                <div className="space-x-4">
                    <Link to="/shop" className="inline-block bg-ikea-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
                        Continuer vos achats
                    </Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide.</h2>
                <p className="text-gray-500 mb-8">Il semblerait que vous n'ayez rien ajouté pour le moment.</p>
                <Link to="/shop" className="inline-block bg-ikea-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
                    Retourner à la boutique
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 fade-in-up">Votre Panier</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg fade-in-up delay-100">
                <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                        <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                    src={item.image_url || `https://via.placeholder.com/200x200?text=${item.titre}`}
                                    alt={item.titre}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 uppercase">
                                        <Link to={`/product/${item.id}`}>{item.titre}</Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                    <p className="mt-1 text-lg font-bold text-gray-900">{Number(item.prix).toFixed(2)} €</p>
                                </div>
                                <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 rounded-l-full transition"><Minus size={16} /></button>
                                        <span className="px-4 font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 rounded-r-full transition"><Plus size={16} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 flex justify-end fade-in-up delay-200">
                <div className="w-full sm:w-1/3 bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between mb-4"><span className="text-gray-600">Sous-total</span><span className="font-bold">{getCartTotal().toFixed(2)} €</span></div>
                    <div className="flex justify-between mb-6"><span className="text-gray-600">Livraison</span><span className="text-green-600 font-bold">Gratuit</span></div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-6"><span className="text-xl font-bold">Total</span><span className="text-2xl font-bold text-ikea-blue">{getCartTotal().toFixed(2)} €</span></div>
                    <button
                        onClick={handleInitCheckout}
                        className="w-full bg-ikea-blue text-white font-bold px-6 py-4 rounded-full hover:bg-blue-800 transition-all transform hover:scale-105"
                    >
                        Payer la commande
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm fade-in-up">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <CreditCard size={20} className="text-ikea-blue" />
                                Paiement Sécurisé
                            </h3>
                            <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titulaire de la carte</label>
                                <input required type="text" placeholder="M. Jean Dupont" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ikea-blue focus:border-transparent outline-none transition-all" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                                <div className="relative">
                                    <input required type="text" placeholder="0000 0000 0000 0000" maxLength="19" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ikea-blue focus:border-transparent outline-none transition-all font-mono" />
                                    <CreditCard size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                                    <input required type="text" placeholder="MM/AA" maxLength="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ikea-blue focus:border-transparent outline-none transition-all text-center" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                    <input required type="text" placeholder="123" maxLength="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ikea-blue focus:border-transparent outline-none transition-all text-center" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-ikea-blue text-white font-bold px-6 py-3 rounded-full hover:bg-blue-800 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {isSubmitting ? <Loader className="animate-spin" /> : "Payer " + getCartTotal().toFixed(2) + " €"}
                                </button>
                                <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Paiement crypté SSL 256-bit
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
