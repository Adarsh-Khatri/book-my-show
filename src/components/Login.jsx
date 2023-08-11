import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postApi } from '../services/httpServices';
import { storeUser } from '../services/storageServices';
import { MyUserContext } from './MainComponent';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string().required("Username is Required!").min(7, "Username Must Have Atleast 6 Characters!"),
  password: Yup.string().required("Password is Required!").min(7, "Password Must Have Atleast 6 Characters!")
})

function Login() {

  const { setUser } = useContext(MyUserContext);

  const location = useLocation();

  const onSubmit = async (values) => {
    console.log(location);
    if (location.pathname === '/movies') {
      window.location.reload();
    }
    try {
      let data = await postApi('/login', values);
      storeUser(data)
      setUser(data);
    } catch (error) {
      alert(error.response.data)
    }
  }

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit,
    validationSchema
  })

  const makingFields = (type, name, selValue, label) => {
    return (
      <>
        <div className="form-floating mb-3">
          <input className='form-control' placeholder={label} type={type} name={name} id={name} value={selValue} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          <label className='ms-3' htmlFor={name}>{label}</label>
          {formik.touched[name] && formik.errors[name] && <div className='text-danger text-center form-error seatselection-login-error'>{formik.errors[name]}</div>}

        </div>
      </>
    )
  }


  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">{makingFields("text", "username", formik.values.username, "Username")}</div>
        <div className="row">{makingFields("password", "password", formik.values.password, "Password")}</div>
        <div className="row">
          <div className='text-center mb-4'>
            <button type='submit' className='btn btn-danger btn-sm'>Sign In</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;


