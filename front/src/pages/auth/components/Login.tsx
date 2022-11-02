import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { ActionTypes } from "../../../constants/ActionTypes";
import { LoginModel } from "../../../models";
import { getToken } from "../../../services/auth.service";
import { token } from "../../../store/token";

const Login = () =>  {
    
    const getTokenFromService = async (model: LoginModel) => {
        await getToken(model);
    }

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
            onSubmit={(fields, { resetForm }) => {
                const model: LoginModel = {
                    email: fields.email,
                    password: fields.password
                }

                let resultField = document.getElementById('register-result') as HTMLElement;

                try {
                    const result = getTokenFromService(model);
                    console.log(result);
                        token.dispatch({type: ActionTypes.ADD_TOKEN_DATA, payload:{
                            token: result.data.token,
                            permissions: [],
                            user: {}
                        }});
                } catch(error)
                {

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
                        <h5 id="login-result"></h5>
                    </div>
                </>
            )}
        </Formik>
    )

}

export default Login;