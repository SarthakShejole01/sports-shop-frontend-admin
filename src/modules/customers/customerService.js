import apiClient from '../../services/apiClient';

// Mapper for customer list
const mapCustomerFromApi = (customer) => ({
    ...customer,
    gstNumber: customer.gst_number,
    mobileNumber: customer.mobile, // Contract says 'mobile' in API, UI used 'mobileNumber' previously
});

// Mapper for customer create payload
const mapCustomerToApi = (data) => ({
    name: data.name,
    mobile: data.mobileNumber,
    type: data.customerType, // UI: customerType, API: type
    gst_number: data.gstNumber,
});

export const getCustomers = async () => {
    const response = await apiClient.get('/api/customers');
    // API: { success: true, customers: [...] }
    const customers = response.data.customers || [];
    return customers.map(mapCustomerFromApi);
};

export const createCustomer = async (data) => {
    const payload = mapCustomerToApi(data);
    const response = await apiClient.post('/api/customers', payload);
    return response.data;
};

export const getCustomerHistory = async (id) => {
    const response = await apiClient.get(`/api/customers/${id}/history`);
    // API: { success: true, history: { quotations: [], bills: [] } }
    const history = response.data.history || { quotations: [], bills: [] };
    const customer = response.data.customer || {}; // Sometimes APIs return partial customer info, usually separate.

    // Map history items if needed (keys seem standard enough: quotation_number -> quotationNumber)
    const quotations = (history.quotations || []).map(q => ({
        ...q,
        quotationNumber: q.quotation_number,
        totalAmount: q.total_amount,
    }));

    const bills = (history.bills || []).map(b => ({
        ...b,
        invoiceNumber: b.invoice_number,
        finalAmount: b.final_amount,
    }));

    return { customer: mapCustomerFromApi(customer), quotations, bills };
};
