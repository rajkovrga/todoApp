import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { verifyUser } from "../../../services/auth.service";
import PageResult from "../../../components/PageResult";

const Verificated = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
        useEffect(() => {
            let result = document.getElementById('verificated-result') as HTMLElement;

            verifyUser(token ?? "")
            .then(response => {
                if (response.status == 204) {
                    setMessage('User ferificated successfully');
                } else {
                    setMessage('Server Error');
                }
            })
            .catch(error => {
                const status = error.response.status;
                if (status === 405) {
                    setMessage('Token is not valid');
                } else if (status === 403) {
                    setMessage('Token is expired');
                } else if (status === 404) {
                    setMessage('User is not exist');
                } else {
                    setMessage('Server error');
                }
            })
        }, [])

    return (<div id='verificated' className="d-flex text-center justify-content-center align-items-center">
        <PageResult message={message} />
    </div>);
};

export default Verificated;