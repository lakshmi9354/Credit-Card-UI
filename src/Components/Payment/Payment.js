import React, { Component } from 'react'
import axios from 'axios'
import isLuhn from 'node-luhn'
import './Payment.css'
import url from '../../config.json'


export class Payment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            creditCardNumber: '',
            creditCardNumberError: '',
            amount: '',
            amountError: '',
            expiryDate: '',
            expiryDateError: '',
            cvv: '',
            cvvError: '',
            reason: '',
            reasonError: '',
            cardType: '',
            cardTypeError: '',
            otpGenInit: false,
            isValid: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    validate() {
        return new Promise((resolve, reject)=>{
            console.log("Inside validate")
        let isValid = false;
        const errors = {
            creditCardNumberError: '',
        }
        if (this.state.amount <=0){
            isValid=false;
            errors.amountError="Amount cant be negative or zero"
        }
        if (this.state.creditCardNumber.length === 16) {
            if (isLuhn(this.state.creditCardNumber)) {
                console.log("Is LUHN satisfied", isLuhn(this.state.creditCardNumber))
                isValid=true;
            } else {
                console.log("Invalid credit card number.")
                isValid = false;
                errors.creditCardNumberError = 'Invalid credit card number.'
            }
        } else {
            console.log("Credit card numnber should be 16 digits")
            isValid = false;
            errors.creditCardNumberError = 'Credit card numnber should be 16 digits'
        }

        this.setState({
            ...this.state,
            ...errors
        })
         return resolve(isValid);

        })
        
    }

    handleSubmit(e) {
        e.preventDefault()
        this.validate().then((res) => {
            if (res) {
                const paymentDetails = {
                    amount: this.state.amount,
                    creditCardNumber: this.state.creditCardNumber,
                    expiryDate: this.state.expiryDate,
                    cvv: this.state.cvv,
                    reason: this.state.reason,
                    cardType: this.state.cardType
                };
                this.getData(paymentDetails).then((res) => {
                    if (res) {
                        console.log(res.data)
                        if (res.status === "200" && res.data.status === "SUCCESS") {
                            this.setState({
                                otpGenInit: true
                            })
                        } else {
                            alert(res.data.message)
                        }
                    }
                }).catch(err => {
                    alert('Error in payment', err)
                })
            }
            else {
            }
        })
    }

    handleVerifyOTP() {
        axios.get(`${url.url}/otpVerification/${this.state.otp}`)
            .then(res => {
                console.log("otp evrified successfully")
                alert('OTP verified successfully')
            }).catch((err) => {
                alert("OTP error", err)
            })
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });

    }
    setAccountType(e) {
        console.log(e.target.value)
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        })
    }
    getDataVisa(fields) {
        console.log("getdataVisa", fields)
        return new Promise((resolve, reject) => {
            axios.post(`${url}/paymentVisa`)
                .then(res => {
                    resolve(res)
                }).catch((err) => {
                    reject(err);
                    alert("Error in search", err)
                })

        })
    }
    getDataMaster(fields) {
        console.log("getdataMaster", fields)
        return new Promise((resolve, reject) => {
            axios.post(`${url}/paymentMaster`)
                .then(res => {
                    resolve(res)
                }).catch((err) => {
                    reject(err);
                    alert("Error in search", err)
                })

        })
    }

    handleAddPayee(e) {
        console.log("Inside handle add payee")
        e.preventDefault()
        this.setState({
            otpGenInit: true
        })
        const payeedetail = {
            accountId: 2,
            payeeName: this.state.name,
            payeeAccountNumber: this.state.accountNumber,
            payeeMobileNo: this.state.mobileNo,
            payeeEmailId: this.state.email,
            payeeAccountType: this.state.accountType

        }
        console.log(url.url)
        axios.post(`${url.url}/payee`, payeedetail)
            .then(res => {
                alert("Inside response", res)
            }).catch((err) => {
                console.log('Error in getting payee list')
            })

    }
    render() {
        return (

            <div>
                <h1 className="headingpayee">Make Payment</h1>
                {
                    <div>
                        <form className="makepaymentform">
                            <span className="pull-right text-danger"><small>{this.state.amountError}</small></span>
                            <div className="form-group col-xs-3">
                                <label htmlFor="amount">Amount  </label><br></br>
                                <input name=""
                                    className="form-control"
                                    type="text"
                                    value={this.state.amount}
                                    id="amount"
                                    onChange={this.handleChange} />
                            </div>
                            <span className="pull-right text-danger"><small>{this.state.creditCardNumberError}</small></span>
                            <div className="form-group col-xs-3">
                                <label htmlFor="creditCardNumber">Credit Card Number  </label><br></br>
                                <input name=""
                                    className="form-control"
                                    type="text"
                                    value={this.state.creditCardNumber}
                                    id="creditCardNumber"
                                    onChange={this.handleChange} />
                            </div>
                            <span className="pull-right text-danger"><small>{this.state.expiryDateError}</small></span>
                            <div className="form-group ">
                                <label htmlFor="expiryDate">Expiry Date  </label><br></br>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="expiryDate"
                                    value={this.state.expiryDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <span className="pull-right text-danger"><small>{this.state.cvvError}</small></span>
                            <div className="form-group ">
                                <label htmlFor="cvv">cvv  </label><br></br>
                                <input name=""
                                    className="form-control"
                                    type="password"
                                    id="cvv"
                                    value={this.state.cvv}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="reason">Comments </label><br></br>
                                <input name=""
                                    className="form-control"
                                    type="text"
                                    id="reason"
                                    value={this.state.reason}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br></br><br></br>
                            <div className="form-group col-xs-2 ">
                                <button type="submit" id="searchsubmit" className="btn btn-primary" onClick={this.handleSubmit}  >Make Payment</button>&nbsp;&nbsp;
                            </div>

                        </form>
                    </div>
                }

            </div>
        )
    }
}

export default Payment
