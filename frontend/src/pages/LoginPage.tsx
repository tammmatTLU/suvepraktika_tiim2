import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
	interface IErrorMessage {
		errorMsg: string
	}

	const apiUrl = import.meta.env.VITE_API_URL;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	async function handleLogin(e: FormEvent) {
		e.preventDefault();
		try {
			const response = await fetch(`${apiUrl}/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ "username": username, "password": password })
				}
			);

			if (!response.ok) {
				throw new Error("Login failed. Try again!");
			}

			setErrorMsg("");
			const responseBody = await response.json();
			localStorage.setItem('userToken', responseBody.token);
			localStorage.setItem('userName', responseBody.username);
		}
		catch (error) {
			setErrorMsg("Error occured upon login");

			if (error instanceof Error) { setErrorMsg(error.message); }
		}
	}

	function ErrorMessage({ errorMsg }: IErrorMessage) {
		if (errorMsg) {
			return <h3 className="login-error-msg">{errorMsg}</h3>;
		}
	}

    return (
        <>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Kasutajanimi:</label>
                        <input onChange={e => {setUsername(e.target.value)}}
							type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Parool:</label>
                        <input onChange={e => {setPassword(e.target.value)}}
							type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn-grad">Logi sisse</button>
					<Link to="/action-select"><button className="btn-grad">Testi nupp</button></Link>
                </form>
				<ErrorMessage errorMsg={errorMsg} />
            </div>
        </>
    );
}
