import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { resendVerification } from "../../../services/auth.service";
import { useState } from 'react';

const ResendVerification = () => {
    const [resultMessage, setResultMessage] = useState('');
    const init = {
        email: ''
    };
    return (<div className="container pt-5 ">
        <h1 className="text-center">Resend email for verification</h1>
        <div className="row d-flex justify-content-center"> 
        <div className=" col-lg-4 col-md-6 col-sm-8">
  <Formik
            initialValues={init}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .required('Email is required')
                    .email('Email is invalid')
            })}
            onSubmit={async (fields, {resetForm}) => {
                try {
                    await resendVerification(fields.email);
                    resetForm({
                        values: init
                    });
                    setResultMessage('Verification sent successfully');
                }
                catch(err: any) {
                    const { status } = err.message.response;
                    if (status === 404) {
                        setResultMessage('Token is not exist');
                    } else {
                        setResultMessage('Application error');
                    }
                }
            }}>
            {({ errors, status, touched }) => (
                <Form name="resend-verification">
                    <div className="form-group">
                        <label>Your email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Resend</button>
                    </div>
                    <div>
                        <h5>{resultMessage}</h5>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
      
      
    </div>);
}

export default ResendVerification;