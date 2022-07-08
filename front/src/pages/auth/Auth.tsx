import { Component } from "react";
import Login from "./components/Login";
import Registration from "./components/Registration";

const Auth = () => {

    return (
        <div className="auth">
            <Login />
            <Registration />
        </div>
    );

}

export default Auth;