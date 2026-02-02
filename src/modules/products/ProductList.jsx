import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Package, Loader2 } from 'lucide-react';
import { getProducts } from './productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data.products || data || []);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    <p className="text-slate-500 mt-1">Manage your product inventory</p>
                </div>
                <Link
                    to="/products/new"
                    className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                </Link>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-12 text-center">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                        <p className="text-slate-500 mt-1">Get started by adding your first product.</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Brand</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Discounted</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">GST %</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{product.category}</td>
                                    <td className="px-6 py-4 text-slate-600">{product.brand}</td>
                                    <td className="px-6 py-4 text-right text-slate-900">₹{product.actualPrice?.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-emerald-600 font-medium">₹{product.discountedPrice?.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">{product.gstPercentage}%</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stockQuantity > 10 ? 'bg-emerald-100 text-emerald-700' :
                                                product.stockQuantity > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {product.stockQuantity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            to={`/products/${product._id}/edit`}
                                            className="inline-flex items-center px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProductList;
