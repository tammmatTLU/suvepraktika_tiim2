//import { useEffect } from 'react';
import BackButton from '../components/BackButton';
import ControlPanel from '../components/ControlPanel';
import { useParams } from 'react-router-dom';
import { /*useAppDispatch,*/ useAppSelector } from '../store/hooks';
//import { loadElements } from '../store/slices/buttonElementsSlice';

export default function DeviceControlPage() {
    const { userName: userName = 'A-001' } = useParams<{ userName?: string }>();

    //const dispatch = useAppDispatch();
    const elements = useAppSelector(state => state.buttonElements.elements);
    const loading = useAppSelector(state => state.buttonElements.loading);
    const error = useAppSelector(state => state.buttonElements.error);
/*
    useEffect(() => {
        dispatch(loadElements(userName));
    }, [dispatch, userName]);
*/
    if (loading) return <p>Loading devices...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="grid-layout">
            <header>
                <h1>{userName}</h1>
                <BackButton />
            </header>
            <ControlPanel elements={elements} />
        </div>
    );
}
