import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Loader2, Calendar, Eye } from 'lucide-react';
import { getBills } from './billingService';

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            setLoading(true);
            const data = await getBills();
            setBills(data);
        } catch (err) {
            setError('Failed to load bills');
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = status === 'ACTIVE'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-red-100 text-red-700'; // CANCELLED
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles}`}>{status}</span>;
    };

    if (loading) {
        return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin w-8 h-8 text-indigo-600" /></div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Billing & Invoices</h1>
                    <p className="text-slate-500 mt-1">Transaction history and invoices</p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {bills.length === 0 ? (
                    <div className="p-12 text-center">
                        <Receipt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No bills found</h3>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Invoice No</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bills.map((b) => (
                                <tr key={b.id || b._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm font-medium text-slate-900">{b.invoiceNumber}</td>
                                    <td className="px-6 py-4 text-slate-700 font-medium">{b.customerName}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={b.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">₹{b.finalAmount?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-500 text-sm flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {new Date(b.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            to={`/billing/${b.id || b._id}`}
                                            className="inline-flex items-center px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
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

export default BillList;
