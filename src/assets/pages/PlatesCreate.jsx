import React from 'react';
import PlateForm from '../components/PlateForm'

export default function PlatesCreate({addPlate , idCalcul , tableNextID}) {
    

    return (
        <>
            <div className='w-100% flex justify-start items-center bg-green-400 h-30 text-white'>
                <h1 className='pl-10 text-4xl'>Plates</h1>
            </div>
            <PlateForm addPlate={addPlate} idCalcul={idCalcul} tableNextID={tableNextID}/>
        </>
    );
}