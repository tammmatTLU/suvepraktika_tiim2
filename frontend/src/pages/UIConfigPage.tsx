import BackButton from '../components/BackButton'
import Toolbar from '../components/Toolbar';
import EditPanel from '../components/EditPanel';
//import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadElements } from '../store/slices/buttonElementsSlice';

export default function UIConfigPage() {
    const { userName: userName = 'A-001' } = useParams<{ userName?: string }>();

    const [gridEnabled, setGridEnabled] = useState(true);
    const gridSize: [number, number] = [20, 20]; // preset grid size

    const dispatch = useAppDispatch();
    const buttonElements = useAppSelector(state => state.buttonElements.elements);
    const spanElements = useAppSelector(state => state.spanElements.elements);
    const loading = useAppSelector(state => state.buttonElements.loading);
    const error = useAppSelector(state => state.buttonElements.error);

    const allElements = [
        ...Object.values(buttonElements),
        ...Object.values(spanElements)
    ];

    useEffect(() => {
        dispatch(loadElements(userName));
    }, [dispatch, userName]);

    if (loading) return <p>Loading devices...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="grid-layout">
            <header>
                <h1>Kasutajavaate redigeerimine</h1>
                <BackButton />
                <Toolbar
                    gridEnabled={gridEnabled}
                    onGridToggle={() => setGridEnabled(g => !g)}
                />
            </header>
            <EditPanel
                elements={allElements}
                gridEnabled={gridEnabled}
                gridSize={gridSize}
            />
        </div>
    )
}