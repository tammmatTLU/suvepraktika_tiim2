import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();

	async function handleLogout() {
		const token: string | null = localStorage.getItem("userToken");
		const response = await fetch(`${apiUrl}/logout`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ "userToken": token }),
				credentials: "include"
			}
		);

		console.log(token);
		console.log(response.status);
		localStorage.removeItem("userName");
		localStorage.removeItem("userToken");
		navigate("/");
	};

	return (
		<button onClick={handleLogout} className="logout-btn">
			Logi välja
		</button>
	);
}
