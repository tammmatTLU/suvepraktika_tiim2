import BackButton from "../components/BackButton";
import { useEffect } from 'react';
import { loadButtonTemplates } from "../store/slices/buttonTemplateSlice";
import { useAppDispatch } from '../store/hooks';
import AdminDeviceControlPanel from "../components/AdminDeviceControlPanel";
import { useAppSelector } from "../store/hooks";

export default function AdminDeviceControlPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadButtonTemplates());
    }, [dispatch]);

    const loading = useAppSelector(state => state.buttonTemplate.loading);
    const error = useAppSelector(state => state.buttonTemplate.error);

    if(loading) return <div>Laeb...</div>;
    if(error) return <div>Error: {error}</div>;


    return (
        <div className="grid-layout">
            <header>
                <h1>Keskne kontrollpaneel</h1>
                <BackButton />
            </header>

        <AdminDeviceControlPanel />
        </div>
    )
}