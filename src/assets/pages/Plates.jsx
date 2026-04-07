import React from 'react';
import { useState } from 'react';
import PlateFilter from '../components/PlateFilter';
import PlateCard from '../components/PlateCard';
import { useContext } from 'react';
import { PlatesContext } from '../context/platesContext';

export default function Plates(){
    const { plates, loading, error } = useContext(PlatesContext)
    const [search , setSearch] =  useState('')
    

    function filtredPlate(_isFiltered, value){
        setSearch(value)
    }
    
    const filtered = plates.filter((plate)=>
        plate.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className='w-full bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 py-10 text-white'>
                <div className='mx-auto flex max-w-6xl items-center px-6'>
                    <h1 className='text-4xl font-semibold tracking-tight'>Plates</h1>
                </div>
            </div>
            <PlateFilter filtredPlate={filtredPlate}/>
            {loading && <h1 className='mx-auto my-10 max-w-6xl px-6 text-sm font-semibold text-gray-500'>Loading...</h1>}
            {!loading && error && (
                <h1 className='mx-auto my-10 max-w-6xl px-6 text-sm font-semibold text-red-600'>{error}</h1>
            )}
            {!loading && !error && (
                filtered.length === 0 ?
                <h1 className='mx-auto my-10 max-w-6xl px-6 text-sm font-semibold text-gray-500'>No plates found</h1>
                :
                <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-12 md:grid-cols-2 lg:grid-cols-3'>
                    {filtered.map((plate) => (
                        <PlateCard key={plate.id} id={plate.id} name={plate.name} price={plate.price} description={plate.description} is_available={plate.is_available}/>
                    ))}
                </div>
            )}
        </>
    );
};

