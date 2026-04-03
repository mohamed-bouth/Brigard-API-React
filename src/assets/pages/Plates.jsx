import React from 'react';
import { useState } from 'react';
import PlateFilter from '../components/PlateFilter';
import PlateCard from '../components/PlateCard';

export default function Plates({plates}){

    const [is_filtred , setFiltred] = useState(false)
    const [search , setSearch] =  useState('')

    function filtredPlate(is_filtred_bol , value){
        setFiltred(is_filtred_bol)
        setSearch(value)
    }

    console.log(plates)
    const filtered = plates.filter((plate)=>
        plate.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className='w-100% flex justify-start items-center bg-green-400 h-30 text-white'>
                <h1 className='pl-10 text-4xl'>Plates</h1>
            </div>
            <PlateFilter filtredPlate={filtredPlate}/>
            {
            
            filtered.length == 0 ?
            <h1 className='text-center my-5'>empty</h1>
            :
            filtered.map((plate) => (
                <PlateCard key={plate.id} id={plate.id} name={plate.name} price={plate.price} description={plate.description} is_available={plate.is_available}/>
            ))
            }
        </>
    );
};

