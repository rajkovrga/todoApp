import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginModel } from "models";
import AuthService from "services/auth.service";
import * as Yup from 'yup';

const Login = () => {
    const authService = new AuthService;

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
                alert('SUCCESS!! :-)\n\n' + JSON.stringify(model))

                authService.getToken(model).then(response => {
                    if(response.status == 201)
                    {
                        console.log(response.data);
                    }
                }).catch(err => {
                    console.log(err)
                });

                resetForm({
                    values: {
                        password: '',
                        email: ''
                    }
                });
            }}
            render={({ errors, status, touched }) => (
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
            )}
        />
    )

}

export default Login;