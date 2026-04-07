import React from 'react';
import PlateForm from '../components/PlateForm'

export default function PlatesCreate() {

    return (
        <>
            <div className='w-full bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 py-10 text-white'>
                <div className='mx-auto flex max-w-6xl items-center px-6'>
                    <h1 className='text-4xl font-semibold tracking-tight'>Create Plate</h1>
                </div>
            </div>
            <PlateForm />
        </>
    );
}