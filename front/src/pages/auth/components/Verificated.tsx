import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { verifyUser } from "../../../services/auth.service";
import PageResult from "../../../components/PageResult";

const Verificated = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const fetchData = async () => {
        try {
            await verifyUser(token ?? "");
            setMessage('User verificated successfully');
        }
        catch (err: any) {
            console.log(err)
            const { status } = err.message.response;
            if (status === 405) {
                setMessage('Token is not valid');
            } else if (status === 403) {
                setMessage('Token is expired');
            } else if (status === 404) {
                setMessage('Token is not exist');
            } else {
                setMessage('Server error');
            }
        }
    }

    useEffect(() => {
        fetchData(); 
    });

    return (<div id='verificated' className="d-flex text-center justify-content-center align-items-center">
        <PageResult message={message} />
    </div>);
};

export default Verificated;