import React, { useEffect } from 'react'
import { removeUser } from '../services/storageServices'
import { useNavigate } from 'react-router-dom';

function SignOut() {

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      removeUser();
      navigate('/movies');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    logoutUser()
  }, [])

  return ("")
}

export default SignOut