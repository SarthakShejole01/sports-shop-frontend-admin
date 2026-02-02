import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Loader2, Calendar, Eye } from 'lucide-react';
import { getQuotations } from './quotationService';

const QuotationList = () => {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        try {
            setLoading(true);
            const data = await getQuotations();
            setQuotations(data);
        } catch (err) {
            setError('Failed to load quotations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const StatusBadge = ({ status }) => {
        let styles = '';
        switch (status) {
            case 'APPROVED': styles = 'bg-emerald-100 text-emerald-700'; break;
            case 'REJECTED': styles = 'bg-red-100 text-red-700'; break;
            case 'PENDING': styles = 'bg-amber-100 text-amber-700'; break;
            default: styles = 'bg-slate-100 text-slate-700';
        }
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles}`}>{status}</span>;
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quotations</h1>
                    <p className="text-slate-500 mt-1">Manage and track sent quotations</p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {quotations.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No quotations found</h3>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reference</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Valid Till</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {quotations.map((q) => (
                                <tr key={q.id || q._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-sm font-medium text-slate-900">{q.quotationNumber}</td>
                                    <td className="px-6 py-4 text-slate-700 font-medium">{q.customerName}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={q.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">₹{q.totalAmount?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-500 text-sm flex items-center">
                                        <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {new Date(q.validTill).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link
                                            to={`/quotations/${q.id || q._id}`}
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

export default QuotationList;
