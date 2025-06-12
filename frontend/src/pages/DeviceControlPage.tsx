import { useEffect } from 'react';
import BackButton from '../components/BackButton';
import ControlPanel from '../components/ControlPanel';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadElements } from '../store/slices/elementsSlice';

export default function DeviceControlPage() {
    const { remoteName = 'A-001' } = useParams<{ remoteName?: string }>();

    const dispatch = useAppDispatch();
    const elements = useAppSelector(state => state.elements.elements);
    const loading = useAppSelector(state => state.elements.loading);
    const error = useAppSelector(state => state.elements.error);

    useEffect(() => {
        dispatch(loadElements(remoteName));
    }, [dispatch, remoteName]);

    if (loading) return <p>Loading devices...</p>;
    if (error) return <p>Error: {error}</p>;

    const devices = Object.values(elements).map(element => ({
        id: element.id.toString(),
        name: element.name
    }));

    return (
        <div className="grid-layout">
            <header>
                <h1>{remoteName}</h1>
                <BackButton />
            </header>
            <ControlPanel devices={devices} />
        </div>
    );
}
