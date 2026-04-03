import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Home () {

    let [data , setData] = useState()

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/test")
        .then(response => response.json())
        .then(apiData => {setData(apiData); console.log(apiData)})
    }, [])

    return (
        <>
            <div className='w-100% flex justify-start items-center bg-green-400 h-30 text-white'>
                <h1 className='pl-10 text-4xl'>Home</h1>
            </div>
        </>
    );
};
