import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { Lock, Mail, Loader2, ShoppingBag, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            // Navigation happens in useEffect or here. 
            // Safe to do here for immediate feedback, but AuthContext update triggers useEffect too.
            navigate('/dashboard', { replace: true });
        } catch (err) {
            console.error(err);
            setError(err.message || 'Invalid email or password');
            setIsLoading(false); // Only stop loading on error. On success, we navigate away.
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 opacity-30 pattern-grid-lg"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md shadow-lg rotate-3">
                            <ShoppingBag className="text-white w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
                        <p className="text-indigo-100 mt-2 font-medium">Sports Shop Billing System</p>
                    </div>
                </div>

                {/* Login Form */}
                <div className="p-8 pt-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md text-sm animate-pulse-fast flex items-center">
                                <span className="font-medium mr-1">Error:</span> {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                    placeholder="admin@sportsshop.com"
                                    value={email}
                                    disabled={isLoading}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    disabled={isLoading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold text-sm tracking-wide
                transition-all duration-200 shadow-lg shadow-indigo-500/30
                ${isLoading
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 hover:translate-y-[-1px] hover:shadow-indigo-500/40 active:translate-y-[0px]'}
              `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In to Dashboard
                                    <ArrowRight className="w-5 h-5 ml-2 opacity-80" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            Protected by Enterprise Grade Security
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
