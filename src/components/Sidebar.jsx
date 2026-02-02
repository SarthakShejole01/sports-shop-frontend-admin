import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    ChevronRight,
    FileText,
    Receipt
} from 'lucide-react';
import { useAuth } from '../modules/auth/authContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'Quotations', path: '/quotations' }, // Added
        { icon: Receipt, label: 'Billing', path: '/billing' }, // Added
        { icon: ShoppingBag, label: 'Products', path: '/products' },
        { icon: Users, label: 'Customers', path: '/customers' },
        { icon: ShoppingCart, label: 'Orders', path: '/orders' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-20">

            {/* Brand Header */}
            <div className="h-20 flex items-center px-8 border-b border-slate-800 bg-slate-950">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 mr-3">
                    <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-white text-lg leading-tight tracking-tight">Sports Shop</h1>
                    <p className="text-xs text-slate-400 font-medium">Admin Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 border border-transparent
               ${isActive
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                            }`
                        }
                    >
                        <div className="flex items-center">
                            <item.icon className={`w-5 h-5 mr-3 transition-colors ${({ isActive }) => isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'
                                }`}
                            />
                            <span className="font-medium text-sm tracking-wide">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0`} />
                    </NavLink>
                ))}
            </nav>

            {/* User Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950">
                <button
                    onClick={logout}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-red-400 bg-red-400/10 hover:bg-red-400/20 hover:text-red-300 rounded-xl transition-all border border-red-400/10"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
