import { Link } from "react-router-dom";


export default function LoginPage() {
    return (
        <>
            <div className="login-form">
                <form action={"localhost:3006/login"} method="post">
                    <div className="form-group">
                        <label htmlFor="username">Kasutajanimi:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Parool:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn-grad">Logi sisse</button>
                </form>
                <Link to="/action-select"><button className="btb-grad">Testi nupp</button></Link>
            </div>
        </>
    );
}