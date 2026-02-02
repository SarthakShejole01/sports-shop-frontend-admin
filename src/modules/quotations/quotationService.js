import apiClient from '../../services/apiClient';

// Helper to map API API data (snake_case) to UI (camelCase)
const mapQuotationFromApi = (q) => ({
    ...q,
    quotationNumber: q.quotation_number,
    customerName: q.customer_name, // available in list view
    customer: q.customer, // object available in details view
    totalAmount: q.total_amount,
    validTill: q.valid_till,
    items: q.items?.map(item => ({
        ...item,
        productName: item.product_name,
        gstPercentage: item.gst_percentage,
    })) || [],
});

export const getQuotations = async () => {
    const response = await apiClient.get('/api/quotations');
    const quotations = response.data.quotations || [];
    return quotations.map(mapQuotationFromApi);
};

export const getQuotation = async (id) => {
    const response = await apiClient.get(`/api/quotations/${id}`);
    const quotation = response.data.quotation || response.data;
    return mapQuotationFromApi(quotation);
};

export const approveQuotation = async (id) => {
    const response = await apiClient.put(`/api/quotations/${id}/approve`);
    return response.data;
};

export const rejectQuotation = async (id, reason) => {
    const response = await apiClient.put(`/api/quotations/${id}/reject`, { reason });
    return response.data;
};
