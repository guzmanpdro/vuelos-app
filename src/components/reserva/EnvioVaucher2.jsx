import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './FormDemo.css';

export default function EnvioVaucher2() {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const formik = useFormik({
        initialValues: {
            email: '',
            ConfirmaEmail: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (ConfirmaEmail) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (ConfirmaEmail) => {
        return isFormFieldValid(ConfirmaEmail) && <small className="p-error">{formik.errors[ConfirmaEmail]}</small>;
    };

    

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">
					¿A dónde enviamos tus vouchers?
                    El email que elijas será fundamental para que gestiones tu reserva y recibas información importante sobre tu viaje.
					</h5>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
						
						<div className="field">
                            <span className="p-float-label">
                                <InputText id="ConfirmaEmail" name="ConfirmaEmail" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('ConfirmaEmail') })} />
                                <label htmlFor="ConfirmaEmail" className={classNames({ 'p-error': isFormFieldValid('ConfirmaEmail') })}>ConfirmaEmail*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>                                                
                    </form>
                </div>
            </div>
        </div>
    );
}


/* FormDemo.css */

.form-demo .card {
  min-width: 450px;
}
.form-demo .card form {
  margin-top: 2rem;
}
.form-demo .card .field {
  margin-bottom: 1.5rem;
}
@media screen and (max-width: 960px) {
  .form-demo .card {
      width: 80%;
  }
}
@media screen and (max-width: 640px) {
  .form-demo .card {
      width: 100%;
      min-width: 0;
  }
}