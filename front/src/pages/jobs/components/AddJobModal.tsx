import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import plusItem from '../../../assets/icons/icon-plus.svg';
import * as Yup from 'yup';
import { JobModel } from "../../../models";
import { addJob } from "../../../services/jobs.service";
import { DateJobContext } from "../../../context/DateJobProvider";

export const AddJobModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const contextDate = useContext(DateJobContext);
    const [resultMessage, setResultMessage] = useState('');

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: () => validationSchema,
        onSubmit: async (fields, { resetForm }) => {
            const model: JobModel = {
                title: fields.title,
                description: fields.description
            };

            resetForm({
                values: {
                    description: '',
                    title: ''
                }
            });
            try {
                const result = await addJob(model);
                handleClose();
                alert("Added successfuly");
                contextDate.addNewJob(result.data);
            }
            catch (err: any) {
                const { status } = err.message.response;

                if (status === 400 || status === 400) {
                    setResultMessage('Title is not good');
                } else {
                    setResultMessage('Application error');
                }
            }
        },
    });

    return <>
        <span className="btn-job-icon" onClick={handleShow}>
            <img className="icon icon-plus js-modal-init" src={plusItem} alt="Add New Item" />
        </span>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name='add-job-form' className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label className="font-weight-bolder" htmlFor="title">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="string"
                            className={'form-control' + (formik.errors.title && formik.touched.title ? ' is-invalid' : '')}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="invalid-feedback">{formik.errors.title}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label className="font-weight-bolder" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        ></textarea>
                    </div>
                    <div>
                        <h6>{resultMessage}</h6>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block"> Add </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </>;
};