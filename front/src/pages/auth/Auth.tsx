import { useEffect, useState } from "react";
import { useAppSelector } from "../../api/hooks";
import PageResult from "../../components/PageResult";
import Login from "./components/Login";
import Registration from "./components/Registration";

const Auth = () => {
    const [isAuth, setIsAuth] = useState(true);
    const selector = useAppSelector(state => state.token);

    useEffect(() => {
        setIsAuth(selector.token === '');
    }, [isAuth, selector.token]);

    return (
        <div className="auth">
            {isAuth ?
                <>
                    <Login />
                    <Registration /></>
                : <PageResult message="Page not found" />
            }
        </div>

    );
}

export default Auth;