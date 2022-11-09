import moment from "moment";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";

const Nav = () => {
    return (
        <nav className="nav">
            <div className="nav__title">TODO</div>
            <ul className="nav__title">
                <li className="nav__item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav__item">
                    <Link to="/login">Login</Link>
                </li>
                <li className="nav__item">
                    <Link to={`/${moment().format("DD-MM-YYYY")}`}>Jobs</Link>
                </li>
                    <li className="nav__item">
                        <Logout />
                    </li>
                
                
            </ul>
        </nav>
    );
}

export default Nav;