import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	interface IErrorMessage {
		errorMsg: string
	}

	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const userToken = localStorage.getItem("userToken");

	async function handleLogin(e: FormEvent) {
		e.preventDefault();
		try {
			const response = await fetch(`${apiUrl}/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ "username": username, "password": password, "userToken": userToken }),
					credentials: "include"
				}
			);

			if (!response.ok) {
				throw new Error("Sisselogimine ebaõnnestus. Proovi uuesti!");
			}

			setErrorMsg("");
			const responseBody = await response.json();
			localStorage.setItem('userToken', responseBody.token);
			localStorage.setItem('userName', responseBody.username);
			await navigate(`/ui-config/${responseBody.username}`, { replace: true });
		}
		catch (error) {
			setErrorMsg("Tundmatu viga registreerimisel");

			if (error instanceof Error) setErrorMsg(error.message);
			if (error instanceof DOMException) setErrorMsg(error.message);
		}
	}

	function ErrorMessage({ errorMsg }: IErrorMessage) {
		if (errorMsg) {
			return <h2 className="login-error-msg">{errorMsg}</h2>;
		}
	}

	return (
		<>
			<div className="login-form">
				<ErrorMessage errorMsg={errorMsg} />
				<form onSubmit={handleLogin}>
					<div className="form-group">
						<label htmlFor="username">Kasutajanimi:</label>
						<input
							onChange={e => {setUsername(e.target.value)}}
							type="text"
							id="username"
							name="username"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Parool:</label>
						<input
							onChange={e => {setPassword(e.target.value)}}
							type="password"
							id="password"
							name="password"
							required
						/>
					</div>
					<button type="submit" className="btn-grad">Logi sisse</button>
				</form>
			</div>
		</>
	);
}
