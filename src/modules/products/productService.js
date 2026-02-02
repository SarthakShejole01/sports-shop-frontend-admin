import apiClient from '../../services/apiClient';

// Helper to map API response (snake_case) to UI (camelCase)
const mapProductFromApi = (product) => ({
    ...product,
    actualPrice: product.actual_price,
    discountedPrice: product.discounted_price,
    gstPercentage: product.gst_percentage,
    stockQuantity: product.stock_quantity,
});

// Helper to map UI data (camelCase) to API request (snake_case)
const mapProductToApi = (data) => ({
    name: data.name,
    category: data.category,
    brand: data.brand,
    actual_price: data.actualPrice,
    discounted_price: data.discountedPrice,
    gst_percentage: data.gstPercentage,
    stock_quantity: data.stockQuantity,
});

export const getProducts = async () => {
    const response = await apiClient.get('/api/products');
    // API: { success: true, products: [...] }
    const products = response.data.products || [];
    return products.map(mapProductFromApi);
};

export const getProduct = async (id) => {
    const response = await apiClient.get(`/api/products/${id}`);
    // API: { success: true, product: { ... } } -> or direct object? 
    // Contract doesn't specify GET /:id response format explicitly aside from PUT response, 
    // but usually it mimics list item. Safely handling both.
    const product = response.data.product || response.data;
    return mapProductFromApi(product);
};

export const createProduct = async (data) => {
    const payload = mapProductToApi(data);
    const response = await apiClient.post('/api/products', payload);
    return response.data;
};

export const updateProduct = async (id, data) => {
    const payload = mapProductToApi(data);
    const response = await apiClient.put(`/api/products/${id}`, payload);
    return response.data;
};
