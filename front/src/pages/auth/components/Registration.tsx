import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import {useState} from 'react';
import { RegistrationModel } from "../../../models";
import { registerUser } from "../../../services/auth.service";

const Registration = () => {
    const [resultMessage, setResultMessage] = useState('');
    const init = {
        firstName: '',
        lastName: '',
        password: '',
        email: ''
    };

    return (<>               
        <Formik
            initialValues={init}
            validationSchema={Yup.object().shape({
                firstName: Yup.string()
                    .required('First Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required')
            })}
            onSubmit={(fields, {resetForm}) => {
                const model: RegistrationModel = {
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    password: fields.password,
                    email: fields.email
                }                
                registerUser(model)
                    .then(x => {
                        resetForm({
                            values: init
                        });

                        if (x.status === 201) {
                            setResultMessage(`Verification email sent or <a href='verification/resend'>Resend again</a>`);
                        }
                        else if(x.status === 400) {
                            setResultMessage('Any data is not in good format');
                        }
                        else if(x.status === 404)
                        {
                            setResultMessage('User is not saved');
                        }
                        else {
                            setResultMessage('Server error, try again later');
                        }
                    })
                    .catch(x => {
                        setResultMessage('Application error, try again later');
                    });
            }}
        >
            {({ errors, status, touched }) =>
                <Form  name='register-form'>
                    <div className="form-group">
                        <label>First name</label>
                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} ></Field>
                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />                        </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} ></Field>
                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" ></ErrorMessage>                    </div>
                    <div className="form-group">
                        <label>Your email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} ></Field>
                        <ErrorMessage name="email" component="div" className="invalid-feedback" ></ErrorMessage>                        </div>
                    <div className="form-group">
                        <label>Your password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} ></Field>
                        <ErrorMessage name="password" component="div" className="invalid-feedback" ></ErrorMessage>                        </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Registration </button>
                    </div>
                    <div>
                        <h5>{resultMessage}</h5>
                    </div>
                </Form>
            }
        </Formik>
        </>
    );
}

export default Registration;