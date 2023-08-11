import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../services/httpServices';
import { getDetails } from '../services/storageServices';

function PaymentConfirm() {

  const postData = async () => {
    try {
      let data = await postApi('/movieBookingDone', getDetails());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    postData();
  }, [])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className='paymentconfirm'>
          <div>
            <h1>Thank You For Your Purchase!</h1>
            <Link type='button' className='btn btn-danger' to='/movies'>Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirm;

