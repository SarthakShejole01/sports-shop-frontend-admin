import React from 'react';
import { useAuth } from '../modules/auth/authContext';
import { User, Bell, Search, Menu } from 'lucide-react';

const Header = () => {
    const { user } = useAuth();
    const email = user?.email || 'Admin User';
    const role = user?.role || 'Administrator'; // Fallback if no role in user obj

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm transition-all text-slate-800">

            {/* Left: Search or Title */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <Menu className="w-6 h-6" />
                </button>

                <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-4 py-2 w-64 border border-transparent focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <Search className="w-4 h-4 text-slate-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
                            {email.split('@')[0]}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">{role}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                        <span className="font-bold text-sm">
                            {email.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
