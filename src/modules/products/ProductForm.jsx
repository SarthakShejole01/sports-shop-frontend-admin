import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { getProduct, createProduct, updateProduct } from './productService';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        actualPrice: '',
        discountedPrice: '',
        gstPercentage: '',
        stockQuantity: '',
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setFetching(true);
            const data = await getProduct(id);
            const product = data.product || data;
            setFormData({
                name: product.name || '',
                category: product.category || '',
                brand: product.brand || '',
                actualPrice: product.actualPrice || '',
                discountedPrice: product.discountedPrice || '',
                gstPercentage: product.gstPercentage || '',
                stockQuantity: product.stockQuantity || '',
            });
        } catch (err) {
            setError('Failed to load product');
        } finally {
            setFetching(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
        if (!formData.actualPrice || formData.actualPrice <= 0) newErrors.actualPrice = 'Valid price required';
        if (!formData.discountedPrice || formData.discountedPrice <= 0) newErrors.discountedPrice = 'Valid price required';
        if (formData.gstPercentage === '' || formData.gstPercentage < 0) newErrors.gstPercentage = 'Valid GST required';
        if (formData.stockQuantity === '' || formData.stockQuantity < 0) newErrors.stockQuantity = 'Valid stock required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                actualPrice: parseFloat(formData.actualPrice),
                discountedPrice: parseFloat(formData.discountedPrice),
                gstPercentage: parseFloat(formData.gstPercentage),
                stockQuantity: parseInt(formData.stockQuantity, 10),
            };

            if (isEdit) {
                await updateProduct(id, payload);
            } else {
                await createProduct(payload);
            }
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/products')}
                    className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </button>
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEdit ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                }`}
                            placeholder="Enter product name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.category ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                    }`}
                                placeholder="e.g. Cricket"
                            />
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.brand ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                    }`}
                                placeholder="e.g. Nike"
                            />
                            {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Actual Price (₹)</label>
                            <input
                                type="number"
                                name="actualPrice"
                                value={formData.actualPrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.actualPrice ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                    }`}
                                placeholder="0.00"
                            />
                            {errors.actualPrice && <p className="mt-1 text-sm text-red-600">{errors.actualPrice}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Discounted Price (₹)</label>
                            <input
                                type="number"
                                name="discountedPrice"
                                value={formData.discountedPrice}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.discountedPrice ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                    }`}
                                placeholder="0.00"
                            />
                            {errors.discountedPrice && <p className="mt-1 text-sm text-red-600">{errors.discountedPrice}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">GST Percentage (%)</label>
                            <input
                                type="number"
                                name="gstPercentage"
                                value={formData.gstPercentage}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.gstPercentage ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                    }`}
                                placeholder="18"
                            />
                            {errors.gstPercentage && <p className="mt-1 text-sm text-red-600">{errors.gstPercentage}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock Quantity</label>
                            <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                                min="0"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.stockQuantity ? 'border-red-300 bg-red-50' : 'border-slate-300'
                                    }`}
                                placeholder="0"
                            />
                            {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    {isEdit ? 'Update Product' : 'Create Product'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
