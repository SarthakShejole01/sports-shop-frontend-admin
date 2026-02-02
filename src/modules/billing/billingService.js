import apiClient from '../../services/apiClient';

// Helper: API Snake Case -> UI Camel Case
const mapBillFromApi = (bill) => ({
    ...bill,
    invoiceNumber: bill.invoice_number,
    customerName: bill.customer_name, // List view
    finalAmount: bill.final_amount,
    paymentMode: bill.payment_mode,
    createdAt: bill.createdAt,
    status: bill.status,
    // Detail view fields
    customer: bill.customer,
    items: bill.items?.map(item => ({
        ...item,
        productName: item.product_name,
        gstPercentage: item.gst_percentage,
    })) || [],
});

export const convertQuotationToBill = async (quotationId, paymentMode) => {
    const response = await apiClient.post(`/api/billing/convert/${quotationId}`, {
        payment_mode: paymentMode
    });
    return response.data;
};

export const getBills = async () => {
    const response = await apiClient.get('/api/billing');
    const bills = response.data.bills || [];
    return bills.map(mapBillFromApi);
};

export const getBill = async (id) => {
    const response = await apiClient.get(`/api/billing/${id}`);
    const bill = response.data.bill || response.data;
    return mapBillFromApi(bill);
};

export const cancelBill = async (id) => {
    const response = await apiClient.put(`/api/billing/${id}/cancel`);
    return response.data;
};
