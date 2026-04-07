import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, authLoading } = useAuth();

    if (authLoading) {
        return (
            <div className="mx-auto max-w-4xl px-6 py-10">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                    <p className="mt-3 text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                {user ? (
                    <p className="mt-3 text-sm text-gray-600">{user.name ?? user.email}</p>
                ) : (
                    <p className="mt-3 text-sm text-gray-500">No user loaded.</p>
                )}
            </div>
        </div>
    );
};

