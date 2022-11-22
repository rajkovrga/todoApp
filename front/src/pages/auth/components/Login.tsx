import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useState } from 'react';
import { setTokenData } from "../../../features/slices/tokenSlice";
import { LoginModel } from "../../../models";
import { loginUser } from "../../../services/auth.service";
import store from "../../../store/store";

const Login = () =>  {
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

               try
               {
                   const result = await loginUser(model);
                    dispatch(setTokenData(result.data));

                    navigate('/');
                }
                catch(err: any)
                {
                    const { status } = err.message.response;

                    if(status === 400 || status === 400) {
                        setResultMessage('Email or password is not good');
                    } else if(status == 403){
                        setResultMessage('User is not verificated');
                    } else {
                        setResultMessage('Application error');
                    }
                }
                
                resetForm({
                    values: {
                        password: '',
                        email: ''
                    }
                });
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
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Login </button>
                        </div>
                    </Form>
                    <div>
                        <h5>{resultMessage}</h5>
                    </div>
                </>
            )}
        </Formik>
    )

}

export default Login;