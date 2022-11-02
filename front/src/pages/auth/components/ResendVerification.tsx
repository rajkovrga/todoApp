import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { resendVerification } from "../../../services/auth.service";

const ResendVerification = () => {
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
            onSubmit={(fields, {resetForm}) => {
                const result = document.getElementById("resend-result") as HTMLElement;
                
                resendVerification(fields.email).then(x => {
                    resetForm({
                        values: init
                    });
                    
                    if (x.status == 200) {
                        result.innerHTML = 'Verification sent successfully';
                    }
                })
                    .catch(x => {
                        console.log(x);
                        result.innerHTML = 'Server error';
                    })
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
                        <h5 id="resend-result"></h5>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
      
      
    </div>);
}

export default ResendVerification;