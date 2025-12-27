import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#f5f5f5] text-gray-700 pt-16 pb-8 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Column 1 */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Rejoignez IKEA-ish Family</h3>
                        <p className="text-sm mb-4">Profitez de prix membres, d'événements et bien plus encore.</p>
                        <button className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
                            Rejoindre ou se connecter
                        </button>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Aide</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:underline">Service client</a></li>
                            <li><a href="#" className="hover:underline">Suivre ma commande</a></li>
                            <li><a href="#" className="hover:underline">Retours et échanges</a></li>
                            <li><a href="#" className="hover:underline">Rappels de produits</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">À propos de nous</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:underline">Travailler chez nous</a></li>
                            <li><a href="#" className="hover:underline">Développement durable</a></li>
                            <li><a href="#" className="hover:underline">Presse</a></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Services</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:underline">Livraison</a></li>
                            <li><a href="#" className="hover:underline">Montage</a></li>
                            <li><a href="#" className="hover:underline">Financement</a></li>
                        </ul>
                    </div>

                </div>

                {/* Social & Legal */}
                <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex space-x-6">
                        <Facebook size={24} className="hover:text-black cursor-pointer" />
                        <Instagram size={24} className="hover:text-black cursor-pointer" />
                        <Twitter size={24} className="hover:text-black cursor-pointer" />
                        <Youtube size={24} className="hover:text-black cursor-pointer" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                        <a href="#" className="hover:underline">Politique de confidentialité</a>
                        <a href="#" className="hover:underline">Politique relative aux cookies</a>
                        <a href="#" className="hover:underline">Conditions générales</a>
                        <span>© IKEA-ish Systems B.V. 2024</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
