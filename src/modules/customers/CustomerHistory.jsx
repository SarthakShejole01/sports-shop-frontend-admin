import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Loader2, Calendar, Receipt } from 'lucide-react';
import { getCustomerHistory } from './customerService';
import { getCustomers } from './customerService'; // We might need to fetch customer details if history doesn't return it

const CustomerHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Contract for history: { history: { quotations: [], bills: [] } }
            // It does NOT explicitly say it returns "customer" details.
            // So we might need to fetch the customer list to find the name, or just show ID/Header.
            // For best UX, let's assume we fetch history. Ideally we'd have getCustomer(id) but contract doesn't list it.
            // We'll rely on what the service returns.

            const historyData = await getCustomerHistory(id);
            setData(historyData);
        } catch (err) {
            setError('Failed to load customer history');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                    onClick={() => navigate('/customers')}
                    className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    Return to Customers
                </button>
            </div>
        );
    }

    const { quotations, bills } = data || {};
    // Since contract doesn't guarantee customer object in history endpoint, we handle fallback
    const customerName = data?.customer?.name || "Customer History";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => navigate('/customers')}
                    className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Customers
                </button>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{customerName}</h1>
                        <p className="text-slate-500 text-sm mt-1">
                            View transaction history and invoices
                        </p>
                    </div>
                    <div className="bg-indigo-50 px-5 py-3 rounded-xl border border-indigo-100">
                        <span className="text-sm text-indigo-900 font-medium block">Total Bill Value</span>
                        <span className="text-2xl font-bold text-indigo-700">
                            ₹{bills?.reduce((acc, b) => acc + (b.finalAmount || 0), 0).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quotations Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                    <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            Quotations
                        </h2>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {quotations?.length || 0}
                        </span>
                    </div>
                    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
                        {quotations?.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-400 text-sm">No quotations found</p>
                            </div>
                        ) : (
                            quotations?.map(q => (
                                <div key={q.id || q._id} className="p-5 hover:bg-slate-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-700 font-mono text-sm tracking-tight">
                                            {q.quotationNumber}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${q.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {q.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="text-xs text-slate-500 flex items-center">
                                            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                                            {formatDate(q.createdAt)}
                                        </div>
                                        <p className="font-bold text-slate-900">₹{q.totalAmount?.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Bills Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                    <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center">
                            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                                <Receipt className="w-5 h-5 text-emerald-600" />
                            </div>
                            Bills
                        </h2>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {bills?.length || 0}
                        </span>
                    </div>
                    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
                        {bills?.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-slate-400 text-sm">No bills found</p>
                            </div>
                        ) : (
                            bills?.map(b => (
                                <div key={b.id || b._id} className="p-5 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-slate-700 font-mono text-sm tracking-tight">
                                            {b.invoiceNumber}
                                        </span>
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                                            {b.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <div className="text-xs text-slate-500 flex items-center">
                                            <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                                            {/* If bill doesn't have createdAt in list, fallback or might be null */}
                                            {formatDate(b.createdAt)}
                                        </div>
                                        <p className="font-bold text-emerald-700">₹{b.finalAmount?.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerHistory;
