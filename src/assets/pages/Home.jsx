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
            <div className='w-full bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 py-10 text-white'>
                <div className='mx-auto flex max-w-6xl items-center px-6'>
                    <h1 className='text-4xl font-semibold tracking-tight'>Home</h1>
                </div>
            </div>
        </>
    );
};
