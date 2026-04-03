import React from 'react';
import { useParams } from 'react-router-dom';
import PlateCard from '../components/PlateCard';

export default function PlateDetails({plates}) {

    const { id } = useParams()

    const plateId = useParams().id

    const plateFiltered = plates.filter((plate) => plate.id === Number(plateId))
    console.log(plateFiltered);

    return (
        <>
            <div className='w-100% flex justify-start items-center bg-green-400 h-30 text-white'>
                <h1 className='pl-10 text-4xl'>Plate Details</h1>
            </div>
            <PlateCard key={plateFiltered[0].id} id={plateFiltered[0].id} name={plateFiltered[0].name} price={plateFiltered[0].price} description={plateFiltered[0].description} is_available={plateFiltered[0].is_available}/>
            
        </>
    );
}