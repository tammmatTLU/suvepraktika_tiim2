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
    useEffect(() => {
        dispatch(clearButtons());
        dispatch(clearSpans());
        dispatch(loadButtonElements(userName));
        dispatch(loadUserPageState(userName));
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
        <div className="grid-layout">
            <header>
                <h1>{userName}</h1>
                <BackButton />
            </header>
            <ControlPanel elements={allElements} />
        </div>
    );
}
