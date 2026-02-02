import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-border-color">
                <h2 className="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
                <p className="text-gray-600">
                    Select an option from the sidebar to get started. This is the main admin area.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                        <h3 className="font-semibold text-indigo-900">Total Orders</h3>
                        <p className="text-3xl font-bold text-indigo-700 mt-2">1,245</p>
                    </div>
                    <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                        <h3 className="font-semibold text-emerald-900">Revenue</h3>
                        <p className="text-3xl font-bold text-emerald-700 mt-2">$45,230</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h3 className="font-semibold text-blue-900">Active Users</h3>
                        <p className="text-3xl font-bold text-blue-700 mt-2">892</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
