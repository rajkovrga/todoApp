import { MouseEvent } from "react";
import { Link } from "react-router-dom";

const Logout = () => {

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
    }

    return (
        <Link onClick={handleClick} to="#">Logout</Link>
    );
}

export default Logout;