import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // NEW
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CartPage from './pages/CartPage';
import Login from './pages/Login'; // NEW
import Register from './pages/Register'; // NEW

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminOrders from './pages/admin/AdminOrders';
import RequireAdmin from './components/admin/RequireAdmin';
import CategoryPage from './pages/CategoryPage'; // NEW
import ProductPage from './pages/ProductPage'; // NEW

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        {/* Public Routes with Main Layout */}
                        <Route path="/" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <Home />
                                <Footer />
                            </div>
                        } />
                        <Route path="/shop" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <Shop />
                                <Footer />
                            </div>
                        } />
                        <Route path="/product/:id" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <ProductPage />
                                <Footer />
                            </div>
                        } />
                        <Route path="/category/:categoryName" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <CategoryPage />
                                <Footer />
                            </div>
                        } />
                        <Route path="/cart" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <CartPage />
                                <Footer />
                            </div>
                        } />

                        {/* Auth Routes */}
                        <Route path="/login" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <Login />
                                <Footer />
                            </div>
                        } />
                        <Route path="/register" element={
                            <div className="min-h-screen bg-white flex flex-col">
                                <Navbar />
                                <Register />
                                <Footer />
                            </div>
                        } />

                        {/* Admin Routes with Admin Layout */}
                        <Route path="/admin" element={
                            <RequireAdmin>
                                <AdminLayout />
                            </RequireAdmin>
                        }>
                            <Route index element={<DashboardHome />} />

                            <Route path="products" element={<AdminProducts />} />
                            <Route path="products/new" element={<AdminProductForm />} />
                            <Route path="products/edit/:id" element={<AdminProductForm />} />

                            <Route path="customers" element={<AdminCustomers />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="invoices" element={<div className="p-8">Factures (À venir)</div>} />
                        </Route>

                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App
