import BackButton from "../components/BackButton";
import { useEffect } from 'react';
import { loadButtonTemplates } from "../store/slices/buttonTemplateSlice";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import AdminDeviceControlPanel from "../components/AdminDeviceControlPanel";
import { Navigate, useOutletContext } from "react-router-dom";

export default function AdminDeviceControlPage() {
	const admin: boolean = useOutletContext<boolean>();
	const username = localStorage.getItem("userName");
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadButtonTemplates());
	}, [dispatch]);

    const loading = useAppSelector(state => state.buttonTemplate.loading);
    const error = useAppSelector(state => state.buttonTemplate.error);

    if (loading) return <p>Laeb...</p>;
    if (error) return <p>Error: {error}</p>;

	return admin ?
		<div className="grid-layout">
			<header>
				<h1>Keskne kontrollpaneel</h1>
				<BackButton />
			</header>
			<AdminDeviceControlPanel />
		</div>
        :
		<Navigate to={`/ui-config/${username}`} />
}