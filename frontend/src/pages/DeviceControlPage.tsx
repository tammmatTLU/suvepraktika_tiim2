import { useEffect } from 'react';
import BackButton from '../components/BackButton';
import ControlPanel from '../components/ControlPanel';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadButtonElements, clearButtons } from '../store/slices/buttonElementsSlice';
import { loadUserPageState, clearSpans} from '../store/slices/userPageSlice';

export default function DeviceControlPage() {
    const { userName: userName = 'A-001' } = useParams<{ userName?: string }>();
    const dispatch = useAppDispatch();

    const pageStyle = useAppSelector(state => state.undoableRoot.present.userPage.pageStyle);

    useEffect(() => {
        // Set CSS variables when this page is mounted
        document.documentElement.style.setProperty('--page-bg', pageStyle.backgroundColor);
        document.documentElement.style.setProperty('--page-font', pageStyle.fontFamily);
        document.documentElement.style.setProperty('--page-font-size', `${pageStyle.fontSize}px`);
        document.documentElement.style.setProperty('--page-color', pageStyle.color);
    }, [pageStyle]);

    useEffect(() => {
        dispatch(clearButtons());
        dispatch(clearSpans());
        dispatch(loadUserPageState(userName));
        dispatch(loadButtonElements(userName));
        
    }, [dispatch, userName]);

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
                <h1>{userName}</h1>
                <BackButton />
            </header>
            <ControlPanel elements={allElements} />
        </div>
    );
}
