import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { getApi, postApi, putApi } from '../services/httpServices';
import * as Yup from 'yup';
import { getUser } from '../services/storageServices';
import { useNavigate } from 'react-router-dom';


const validationSchema = Yup.object({
  username: Yup.string().required("Email is Required").email("Invalid Email"),
  mobile: Yup.string().required("Mobile Is Required").matches(/[0-9]/, 'Mobile Should Have only digit').min(10, "Mobile should have atleast 10 digit").max(15, "no more than 15"),
  name: Yup.string().required("Name Is Required"),
  password: Yup.string().required("Password Is Required")
})


function EditProfile() {

  let [form, setForm] = useState({ username: "", mobile: "", name: "", password: "" });

  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      let data = await getApi(`/getUserById/${getUser()}`);
      setForm(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async () => {
    try {
      await putApi(`/updateUserById/${getUser()}`, formik.values);
      navigate('/movies')
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: form,
    enableReinitialize: true,
    onSubmit,
    validationSchema
  });


  const makingFields = (type, name, selValue, label) => {
    return (
      <>
        <div className="form-group mb-3">
          <div className="row">
            <div className="col-md-4">
              <label className='form-label lead' htmlFor={name}>{label}</label>
            </div>
            <div className="col-md-8">
              <input className='form-control' placeholder={label} type={type} name={name} id={name} value={selValue} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched[name] && formik.errors[name] && <div className='text-danger text-center form-error seatselection-login-error'>{formik.errors[name]}</div>}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="editProfile">
        <div className="row d-flex position-relative p-0 m-0">
          <div>
            <i className="bi bi-camera"></i>
            <div className='text-dark'>+Add</div>
          </div>
          <span>Hi, {form.name}</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <h3 className='mb-4 fw-bold'>Account Details</h3>
          </div>
          <div className="row">{makingFields("text", "username", formik.values.username, "Email Address")}</div>
          <div className="row">{makingFields("text", "mobile", formik.values.mobile, "Mobile")}</div>
          <div className="row">{makingFields("text", "name", formik.values.name, "Name")}</div>
          <div className="row">{makingFields("text", "password", formik.values.password, "Password")}</div>
          <div className="row">
            <div className='text-center mb-4'>
              <button type='submit' className='btn btn-primary'>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile;


