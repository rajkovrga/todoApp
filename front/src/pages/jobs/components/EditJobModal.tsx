import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import editItem from '../../../assets/icons/icon-edit.svg';
import * as Yup from 'yup';
import { JobModel, JobReturnModel } from "../../../models";
import { editJob } from "../../../services/jobs.service";
import { DateJobContext } from "../../../context/DateJobProvider";

type Props = {
    data: JobReturnModel;
};

export const EditJobModal = ({ data }: Props) => {
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
            title: data.title,
            description: data.description,
        },
        validationSchema: () => validationSchema,
        onSubmit: async (fields, { resetForm }) => {
            const model: JobModel = {
                title: fields.title,
                description: fields.description
            };

            try {
                const result = await editJob(model, data.id);
                handleClose();
                alert("Updated successfuly");
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
        <div className="edit-icon">
            <img  onClick={handleShow} src={editItem} alt="Edit" />
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name='edit-job-form' className="d-flex flex-column" onSubmit={formik.handleSubmit}>
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
                        <button type="submit" className="btn btn-primary btn-block"> Edit </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    </>;
};