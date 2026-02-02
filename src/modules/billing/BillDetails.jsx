import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Ban, Printer } from 'lucide-react';
import { getBill, cancelBill } from './billingService';

const BillDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const res = await getBill(id);
            setData(res);
        } catch (err) {
            setError('Failed to load bill');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to CANCEL this bill? This cannot be undone.')) return;
        try {
            setActionLoading(true);
            await cancelBill(id);
            fetchDetails();
        } catch (err) {
            alert('Failed to cancel bill');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin w-8 h-8 text-indigo-600" /></div>
    }

    if (!data) return <div className="p-8 text-center text-red-500">Bill Not Found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <button onClick={() => navigate('/billing')} className="flex items-center text-slate-500 hover:text-slate-800">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <div className="flex gap-3">
                    {data.status === 'ACTIVE' && (
                        <button
                            onClick={handleCancel}
                            disabled={actionLoading}
                            className="btn bg-white border border-red-200 text-red-600 hover:bg-red-50"
                        >
                            <Ban className="w-4 h-4 mr-2" /> Cancel Bill
                        </button>
                    )}
                    <button className="btn bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => window.print()}>
                        <Printer className="w-4 h-4 mr-2" /> Print Invoice
                    </button>
                </div>
            </div>

            {/* Invoice Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" id="invoice-area">
                <div className="bg-slate-900 text-white px-8 py-8 flex justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">INVOICE</h1>
                        <p className="opacity-75 mt-1"># {data.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-xl">Sports Shop Inc.</p>
                        <p className="opacity-75 text-sm">123 Stadium Road, Mumbai</p>
                        <p className="opacity-75 text-sm">GSTIN: 27AAAAA0000A1Z5</p>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-2 gap-8 border-b border-slate-100">
                    <div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Billed To</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">{data.customer?.name}</h3>
                        <p className="text-slate-500">{data.customer?.mobile}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-slate-500 uppercase">Payment Info</span>
                        <p className="text-slate-900 mt-1"><span className="font-semibold">Mode:</span> {data.paymentMode}</p>
                        <p className="text-slate-900"><span className="font-semibold">Status:</span> {data.status}</p>
                    </div>
                </div>

                <div className="p-8">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-y border-slate-200 text-slate-500">
                            <tr>
                                <th className="py-3 text-left pl-4">Item</th>
                                <th className="py-3 text-right">Qty</th>
                                <th className="py-3 text-right">Price</th>
                                <th className="py-3 text-right pr-4">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.items?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="py-4 pl-4 font-medium text-slate-900">{item.productName}</td>
                                    <td className="py-4 text-right text-slate-600">{item.quantity}</td>
                                    <td className="py-4 text-right text-slate-600">₹{item.price?.toLocaleString()}</td>
                                    <td className="py-4 text-right pr-4 font-bold text-slate-900">₹{item.total?.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-8 flex justify-end">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between items-center text-lg pt-4 border-t border-slate-200">
                                <span className="font-bold text-slate-900">Grand Total</span>
                                <span className="font-bold text-indigo-700 text-2xl">₹{data.finalAmount?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 px-8 py-4 text-center text-xs text-slate-400">
                    Computer generated invoice. No signature required.
                </div>
            </div>
        </div>
    );
};

export default BillDetails;
