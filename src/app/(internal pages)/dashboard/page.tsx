"use client";
import getRoutes from '@/api/getRoutes';
import React from 'react';

const DashboardPage = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>Get Routes</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DashboardPage;
