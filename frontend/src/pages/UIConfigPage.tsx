import BackButton from '../components/BackButton'
import Toolbar from '../components/Toolbar';
import EditPanel from '../components/EditPanel';
//import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadButtonElements, clearButtons } from '../store/slices/buttonElementsSlice';
import {loadUserPageState, clearSpans} from '../store/slices/userPageSlice';

export default function UIConfigPage() {
    const dispatch = useAppDispatch();
    const { userName: userName = 'A-001' } = useParams<{ userName?: string }>();

    const [gridEnabled, setGridEnabled] = useState(true);
    const gridSize: [number, number] = [20, 20]; // preset grid size

    const pageStyle = useAppSelector(state => state.undoableRoot.present.userPage.pageStyle);
    useEffect(() => {
        dispatch(clearButtons());
        dispatch(clearSpans());
        dispatch(loadUserPageState(userName)); 
        dispatch(loadButtonElements(userName));
        // Set CSS variables when this page is mounted
        document.documentElement.style.setProperty('--page-bg', pageStyle.backgroundColor);
        document.documentElement.style.setProperty('--page-font', pageStyle.fontFamily);
        document.documentElement.style.setProperty('--page-font-size', `${pageStyle.fontSize}px`);
        document.documentElement.style.setProperty('--page-color', pageStyle.color);

    }, [pageStyle, dispatch, userName]);

    const buttonElements = useAppSelector(state => state.undoableRoot.present.buttonElements.elements);
    const spanElements = useAppSelector(state => state.undoableRoot.present.userPage.elements);
    const loading = useAppSelector(state => state.undoableRoot.present.buttonElements.loading);
    const error = useAppSelector(state => state.undoableRoot.present.buttonElements.error);

    const allElements = [
        ...Object.values(buttonElements),
        ...Object.values(spanElements)
    ];

    if (loading) return <p>Loading devices...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div className="themed-page grid-layout">
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