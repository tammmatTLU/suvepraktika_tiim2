import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function CreateAccountPage() {
	interface IErrorMessage {
		errMsg: string
	}

	const apiUrl = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	async function handleRegister(e: FormEvent) {
		e.preventDefault();
		try {
			const response = await fetch(`${apiUrl}/register`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"username": username,
						"password": password,
						"passwordAgain": passwordAgain
					})
				}
			);

			if (password !== passwordAgain) throw new Error("Paroolid ei ühti");
			if (!response.ok) {
				throw new Error("Registreerimine ebaõnnestus. Proovi uuesti!")
			};

			setErrorMsg("");
			navigate(`/ui-config/${username}`, { replace: true });
		}
		catch (error) {
			setErrorMsg("Tundmatu viga registreerimisel");
			if (error instanceof Error) setErrorMsg(error.message);
		}
	}

	function ErrorMessage({ errMsg }: IErrorMessage) {
		if (errMsg) {
			return <h2 className="login-error-msg">{errMsg}</h2>
		}
	}

	return (
		<div className="grid-layout">
			<header>
				<h1>Lisa uus kasutaja</h1>
				<BackButton />
			</header>
			<div className="login-form">
				<ErrorMessage errMsg={errorMsg} />
				<form onSubmit={handleRegister}>
					<div className="form-group">
						<label htmlFor="username">Kasutajanimi:</label>
						<input
							onChange={e => setUsername(e.target.value)}
							type="text"
							id="username"
							name="username"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Parool:</label>
						<input
							type="password"
							id="password"
							name="password"
							required
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="passwordAgain">Parool uuesti:</label>
						<input
							type="password"
							id="passwordAgain"
							name="passwordAgain"
							required
							onChange={e => setPasswordAgain(e.target.value)}
						/>
					</div>
					<button
						id="submitBtn"
						type="submit"
						className="btn-grad"
					>
						Loo uus konto
					</button>
				</form>
			</div>
		</div>
	);
}
