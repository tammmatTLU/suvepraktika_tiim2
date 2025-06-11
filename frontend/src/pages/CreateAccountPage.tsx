import { useState } from "react";

export default function CreateAccountPage() {
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const checkPasswordsMatch = () =>{
        if (password !== passwordAgain) {
            alert("Paroolid ei kattu!");
        } else {
            //siia tuleb konto registreerimine apiga ja redirect loodud vaate redigeerimise lehele
        }
    
    }
    return (
        <>
            <header>
                <h1>Lisa uus pult</h1>
            </header>
            <div className="login-form">
                <form action={"localhost:3006/register"} method="post">
                    <div className="form-group">
                        <label htmlFor="username">Kasutajanimi:</label>
                        <input type="text" id="username" name="username" placeholder="Kasutajanimi" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Parool:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Parool"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordAgain">Parool uuesti:</label>
                        <input
                            type="password"
                            id="passwordAgain"
                            name="passwordAgain"
                            placeholder="Parool uuesti"
                            required
                            value={passwordAgain}
                            onChange={e => setPasswordAgain(e.target.value)}
                        />
                    </div>
                    <button
                        id="submitBtn"
                        type="submit"
                        className="btn-grad"
                        onClick={checkPasswordsMatch}
                    >
                        Loo uus konto
                    </button>
                </form>
            </div>
        </>
    );
}