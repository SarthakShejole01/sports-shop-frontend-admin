import apiClient from '../../services/apiClient';

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/api/auth/login', { email, password });

        // Normalize response data
        const { token, user } = response.data;

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user || { email }));
        }

        return { token, user: user || { email } };
    } catch (error) {
        // Extract meaningful error message
        const message = error.response?.data?.message || error.message || 'Login failed';
        throw new Error(message);
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optional: Call functionality to invalidate token on backend if exists
};

export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        return null;
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
