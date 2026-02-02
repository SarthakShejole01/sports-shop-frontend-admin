import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminLayout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar />
            <div className="flex-1 ml-72 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-8 overflow-x-hidden overflow-y-auto w-full max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
