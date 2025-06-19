import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const [verified, setVerified]: any = useState(null);
	const [admin, setAdmin]: any = useState(null);

	useEffect(() => {
		let active = true;

		async function verify() {
			try {
				const res = await fetch(`${apiUrl}/verify`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ userToken: localStorage.getItem("userToken") }),
					credentials: "include"
				});
				if (active) {
					const body = await res.json();
					setVerified(res.ok);
					setAdmin(body.isAdmin);
				}
			} catch (err) {
				if (active) {
					setVerified(false);
					setAdmin(false);
				}
			}
		}

		verify();

		return () => {
			active = false;
		}
	}, []);

	if (verified === null) {
		return <h1>Loading...</h1>
	}

	return verified ? <Outlet context={admin} /> : <Navigate to={"/"} />
}
