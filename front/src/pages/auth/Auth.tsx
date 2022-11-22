import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { useAppSelector } from "../../api/hooks";
import PageResult from "../../components/PageResult";
import store from "../../store/store";
import Login from "./components/Login";
import Registration from "./components/Registration";

const Auth = () => {
    const [isAuth, setIsAuth] = useState(true);

    const selector = store.getState();

    useEffect(() => {
        setIsAuth(selector.token.token === '');
    }, [isAuth]);

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