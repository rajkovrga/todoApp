import moment from "moment";
import { Link } from "react-router-dom";
import { useAppSelector } from "../api/hooks";
import Logout from "../components/Logout";

const Nav = () => {
    const selector = useAppSelector(state => state.token);

    return (
        <nav className="nav">
            <div className="nav__title">TODO</div>
            <ul className="nav__title">
                <li className="nav__item">
                    <Link to="/">Home</Link>
                </li>
                {selector.token === '' &&

                    <li className="nav__item">
                        <Link to="/login">Login</Link>
                    </li>
                }
                
                <li className="nav__item">
                    <Link to={`/${moment().format("DD-MM-YYYY")}`}>Jobs</Link>
                </li>
                {selector.token !== '' &&
                    <li className="nav__item">
                        <Logout />
                    </li>
                }
            </ul>
        </nav>
    );
}

export default Nav;