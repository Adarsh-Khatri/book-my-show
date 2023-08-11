import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDetails, storeDetails } from '../services/storageServices.js'

function PaymentPage() {

  const BOOK_A_SMILE_IMG = "https://media.licdn.com/dms/image/C4E12AQGCRon--5boqg/article-cover_image-shrink_600_2000/0/1520127578615?e=2147483647&v=beta&t=vpd2dDbyKZN7cZnYQ10QY9_ugmUOiHT0i9RWB7JwG78";

  const [contribution, setContribution] = useState(true);

  const details = getDetails();

  console.log(details);

  const navigate = useNavigate();


  // ---------------------------------------------------------------------- CALCULATING AMOUNTS

  const subTotal = details.totalPrice.toFixed(2);

  const convenienceFee = (subTotal * 0.15).toFixed(2);

  const totalAmount = (+subTotal + +convenienceFee).toFixed(2);

  const payableAmount = (+totalAmount + (contribution && details.selectedSeats.length)).toFixed(2);



  const formatDate = () => {
    let curDate = new Date(details.date);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
    let month = months[curDate.getMonth()];
    const day = days[curDate.getDay()];
    const date1 = curDate.getDate();
    const year = curDate.getFullYear()
    return `${day}, ${date1 < 10 ? '0' + date1 : date1} ${month}, ${year}`
  }

  const [payment, setPayment] = useState();

  const paymentsArr = ["QuikPay", "Debit/Credit Card", "Net Banking", "Mobile Wallets", "Gift Voucher", "UPI", "Redeem Points"];

  const makingPayment = () => {
    if (!payment) {
      return alert("Please Choose Any Payment Option")
    }
    let finalData = { ...details, date: formatDate(), payment };
    storeDetails(finalData)
    navigate('/payment/confirm');
  }

  const paymentOptions = () => {
    return (
      <>
        <div className="row">
          <div className='paymentpage-payment-img-container'>
            <img src={BOOK_A_SMILE_IMG} alt="book a smile to donate money" />
          </div>
        </div>
        <div className="row">
          <div className='bg-danger text-center fw-bold py-3 text-light fs-2 border'>Payment Options</div>
          <div className="col-md-4 p-0 border border-top-0">
            <div className='bg-danger'>
              {
                paymentsArr.map(pay => (
                  <React.Fragment key={pay}>
                    <div className={`form-check w-100 ${payment === pay ? "bg-body-secondary" : 'bg-light'} py-3 border border-end-0 my-0 px-5`}>
                      <input className='form-check-input' type="radio" id={pay} name='payment' value={pay} checked={pay === payment} onChange={e => setPayment(e.target.value)} />
                      <label type="button" className='form-check-label' htmlFor={pay}>{pay}</label>
                    </div>
                  </React.Fragment>
                ))
              }
            </div>
          </div>
          <div className="col-md-8 border border-top-0 position-relative">
            <body>
              <div>
                {payment && <div className='fs-4 fw-bold text-center mt-5'>Enter Your Details - {payment}</div>}
              </div>
              <div>
                <button type='button' className='btn btn-danger px-5 position-absolute bottom-0 mb-3' onClick={makingPayment}>MAKE PAYMENT</button>
              </div>
            </body>
          </div>
        </div>
      </>
    )
  }

  const bookASmile = () => {
    return (
      <>
        <div className="row rounded rounded-2 bg-light p-3 paymentpage-bookasmile">
          <div className="col-md-9">
            <div className={`${!contribution && 'text-secondary'}`}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnVm3tn6QGP4ta5VYqyZ3GyZ2jhAnXpwEWdoTa67pjyqYbFW7T1r4jo2Jk4QHlbAg78RI&usqp=CAU" alt="bookasmile logo" /> {contribution ? "Contribution" : "Contribute"} to BookASmile</div>
            <span>(₹1 per ticket has been added)</span>
          </div>
          <div className="col-md-3">
            <div className={`${!contribution && 'text-secondary'}`}>{!contribution && "+"}Rs. {details.selectedSeats.length}</div>
            <div>
              <span type="button" className='text-danger' onClick={() => setContribution(!contribution)}>{contribution ? 'Remove' : 'Add'}</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  const orderSummary = () => {
    return (
      <>
        <div className="row mx-3">
          <h4 className='lead fw-bold fs-3 mt-3 p-3 shadow text-center rounded'>ORDER SUMMARY</h4>
        </div>
        <div className="row mx-3">
          <div className="col-md-8 paymentpage-order-summary">
            <div className='fs-5 fw-bold'>{details.title}</div>
            <div className='text-secondary'><span>{details.language}</span>, <span>{details.format}</span></div>
            <div>
              <div className='text-secondary'>{details.movieHall}</div>
              <div className='text-secondary'>{details.city} - {details.slotTime}</div>
            </div>
            <div className='text-secondary'>M-Ticket</div>
            <div>
              <div>{details.selectedSeats.map(seat => seat.slice(0, 3)).join(", ")}</div>
              <div>{formatDate()}</div>
              <div>{details.slotTime}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className='d-flex flex-column align-items-center paymentpage-order-summary-ticket'>
              <div>{details?.selectedSeats.length}</div>
              <div>Tickets</div>
            </div>
          </div>
        </div>
        <div className='mx-4 paymentpage-order-summary-line'></div>
        <div className="row mx-3">
          <div className='d-flex justify-content-between'>
            <div className='text-secondary'>Sub Total</div>
            <div className='fw-bold'>Rs. {subTotal}</div>
          </div>
          <div className='d-flex justify-content-between'>
            <div>+Convenience Fees</div>
            <div className='fw-bold'>Rs. {convenienceFee}</div>
          </div>
        </div>
        <div className="row m-3">
          <div>{bookASmile()}</div>
        </div>
        <div className="row mx-3">
          <div className='d-flex justify-content-between align-items-center py-3 px-4 paymentpage-order-summary-total-payable-amount'>
            <div>Amount Payable</div>
            <div>Rs. {payableAmount}</div>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className='d-flex gap-5 justify-content-center mt-3'>
            <div className="col-md-8">{paymentOptions()}</div>
            <div className="col-md-4 border pt-3">{orderSummary()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage