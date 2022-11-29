import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useState } from 'react';
import { setTokenData, StateTokenModel } from "../../../features/slices/tokenSlice";
import { LoginModel } from "../../../models";
import { getUserData, loginUser } from "../../../services/auth.service";
import store from "../../../store/store";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = store.dispatch;
    const [resultMessage, setResultMessage] = useState('');

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required')
            })}
            onSubmit={async (fields, { resetForm }) => {
                const model: LoginModel = {
                    email: fields.email,
                    password: fields.password
                }
                resetForm({
                    values: {
                        password: '',
                        email: ''
                    }
                });
                try {
                    let data: StateTokenModel = {
                        token: '',
                        refreshToken: '',
                        data: [],
                        permissions: []
                    };
                    const result = await loginUser(model);

                    data.refreshToken = result.data.refreshToken;
                    data.token = result.data.token;

                    dispatch(setTokenData(data));

                    const userData = await getUserData();

                    data.data = {
                        firstName: userData.data.firstName,
                        lastName: userData.data.lastName,
                    }
                    data.permissions = userData.data.permissions;

                    dispatch(setTokenData(data));

                    navigate('/');
                }
                catch (err: any) {
                    const { status } = err.message.response;

                    if (status === 400 || status === 400) {
                        setResultMessage('Email or password is not good');
                    } else if (status === 403) {
                        setResultMessage('User is not verificated');
                    } else {
                        setResultMessage('Application error');
                    }
                }
            }}>
            {({ errors, status, touched }) => (
                <>
                    <Form name='login-form'>
                        <div className="form-group">
                            <label>Your email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Your password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div>
                            <h6>{resultMessage}</h6>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Login </button>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    )

}

export default Login;