import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../modules/auth/Login';
import ProtectedRoute from '../guards/ProtectedRoute';
import AdminLayout from '../layout/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';

// Lazy load Modules
const Dashboard = lazy(() => import('../../modules/dashboard/Dashboard'));
const ProductList = lazy(() => import('../../modules/products/ProductList'));
const ProductForm = lazy(() => import('../../modules/products/ProductForm'));
const CustomerList = lazy(() => import('../../modules/customers/CustomerList'));
const CustomerForm = lazy(() => import('../../modules/customers/CustomerForm'));
const CustomerHistory = lazy(() => import('../../modules/customers/CustomerHistory'));
const QuotationList = lazy(() => import('../../modules/quotations/QuotationList'));
const QuotationDetails = lazy(() => import('../../modules/quotations/QuotationDetails'));
const BillList = lazy(() => import('../../modules/billing/BillList'));
const BillDetails = lazy(() => import('../../modules/billing/BillDetails'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Product Routes */}
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/new" element={<ProductForm />} />
                        <Route path="/products/:id/edit" element={<ProductForm />} />

                        {/* Customer Routes */}
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/customers/new" element={<CustomerForm />} />
                        <Route path="/customers/:id/history" element={<CustomerHistory />} />

                        {/* Quotation Routes */}
                        <Route path="/quotations" element={<QuotationList />} />
                        <Route path="/quotations/:id" element={<QuotationDetails />} />

                        {/* Billing Routes */}
                        <Route path="/billing" element={<BillList />} />
                        <Route path="/billing/:id" element={<BillDetails />} />

                        {/* Future routes */}
                        <Route path="/orders" element={<div className="p-8">Orders Module (Coming Soon)</div>} />
                        <Route path="/settings" element={<div className="p-8">Settings Module (Coming Soon)</div>} />
                    </Route>
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
