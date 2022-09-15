import { ErrorMessage, Field, Form, Formik } from "formik";
import { Component } from "react";
import AuthService from "services/auth.service";
import * as Yup from 'yup';
import { LoginModel, RegistrationModel, RegistrationReturnModel, TokenModel } from "models";


const Registration = () => {
    const authService = new AuthService;

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                password: '',
                email: ''
            }}
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
            onSubmit={fields => {

                alert(process.env.API);

                const model: RegistrationModel = {
                    firstName: fields.firstName,
                    lastName: fields.lastName,
                    password: fields.password,
                    email: fields.email
                }
                authService.registerUser(model)
                    .then(x => {
                        if (x.status == 201) {
                            alert('User registered succefully')
                        }
                    })
                    .catch(x => {
                        console.log(x)
                    });

            }}
            render={({ errors, status, touched }) =>
                <Form  name='register-form'>
                    <div className="form-group">
                        <label>First name</label>
                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />                        </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />                        </div>
                    <div className="form-group">
                        <label>Your email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />                        </div>
                    <div className="form-group">
                        <label>Your password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />                        </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Registration </button>
                    </div>
                </Form>
            }
        />


    );
}

export default Registration;