import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../api/hooks";
import { removeTokenData } from "../features/slices/tokenSlice";

const Logout = () => {
    const dispatch = useAppDispatch(); 
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        dispatch(removeTokenData());

        navigate('/login');
    }

    return (
        <Link onClick={handleClick} to='#'>Logout</Link>
    );
}

export default Logout;