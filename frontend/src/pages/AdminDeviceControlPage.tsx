import BackButton from "../components/BackButton";
import { useEffect } from 'react';
import { loadButtonTemplates } from "../store/slices/buttonTemplateSlice";
import { useAppDispatch } from '../store/hooks';
import AdminDeviceControlPanel from "../components/AdminDeviceControlPanel";

export default function AdminDeviceControlPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadButtonTemplates());
    }, [dispatch]);
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