import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlateCard from '../components/PlateCard';
import api from '../../api/axios';

export default function PlateDetails() {
    const { id } = useParams();
    const [plate, setPlate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function fetchPlate() {
            try {
                setLoading(true);
                setError("");

                const { data } = await api.get(`/plats/${id}`);
                const item = data.plat ?? data;

                if (isMounted) {
                    setPlate(item ?? null);
                }
            } catch (err) {
                if (isMounted) {
                    const message = err?.response?.data?.message ?? err?.message ?? "Failed to load plate.";
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPlate();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <>
            <div className='w-full bg-gradient-to-r from-emerald-600 via-green-500 to-lime-400 py-10 text-white'>
                <div className='mx-auto flex max-w-6xl items-center px-6'>
                    <h1 className='text-4xl font-semibold tracking-tight'>Plate Details</h1>
                </div>
            </div>
            {loading && <h1 className='mx-auto my-10 max-w-6xl px-6 text-sm font-semibold text-gray-500'>Loading...</h1>}
            {!loading && error && (
                <h1 className='mx-auto my-10 max-w-6xl px-6 text-sm font-semibold text-red-600'>{error}</h1>
            )}
            {!loading && !error && !plate && (
                <h1 className='mx-auto my-10 max-w-6xl px-6 text-sm font-semibold text-gray-500'>Plate not found</h1>
            )}
            {!loading && !error && plate && (
                <div className='mx-auto max-w-6xl px-6 py-10'>
                    <PlateCard
                        key={plate.id}
                        id={plate.id}
                        name={plate.name}
                        price={plate.price}
                        description={plate.description}
                        is_available={plate.is_available}
                    />
                </div>
            )}
        </>
    );
}