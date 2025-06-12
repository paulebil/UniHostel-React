'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios'; // Adjust this import if needed

const AccountActivationSuccess = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activationStatus, setActivationStatus] = useState<'success' | 'error' | null>(null);

    useEffect(() => {
        const activateAccount = async () => {
            const search = window.location.search || window.location.hash.split('?')[1] || '';
            const params = new URLSearchParams(search);
            const token = params.get('token');
            const email = params.get('email');

            if (!token || !email) {
                setActivationStatus('error');
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.post('/users/verify', { email, token });

                if (response.status === 200) {
                    setActivationStatus('success');
                } else {
                    setActivationStatus('error');
                }
            } catch (error: any) {
                console.error('Activation failed:', error.response?.data || error.message);
                setActivationStatus('error');
            } finally {
                setIsLoading(false);
            }
        };

        activateAccount();
    }, []);

    const handleDashboardClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            window.location.href = '/owner/login';
            setIsLoading(false);
        }, 1000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (activationStatus === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center p-5">
                <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-lg w-full text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Activation Failed</h1>
                    <p className="text-gray-700 mb-8">The link is invalid or has expired.</p>
                    <button
                        onClick={handleDashboardClick}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-5">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl max-w-lg w-full relative">
                <div className="animate-[fadeInUp_0.8s_ease-out]">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounceIn_1s_ease-out]">
                        <svg
                            className="w-10 h-10 text-white animate-[checkDraw_0.8s_ease-out_0.3s_both]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Account Activated!</h1>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Welcome aboard! Your account has been successfully activated, only approval left and you will be ready to get started.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={handleDashboardClick}
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transform transition-all duration-200 shadow-lg ${isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                'Go to Login'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountActivationSuccess;
