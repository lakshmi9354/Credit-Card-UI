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
            expiryDateMonth: '',
            expiryDateYearError: '',
            cvv: '',
            cvvError: '',
            reason: '',
            reasonError: '',
            cardType: '',
            cardTypeError: '',
            otpGenInit: false,
            otp: '',
            isValid: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    validate() {
        return new Promise((resolve, reject) => {
            let isValid = false;
            const errors = {
                creditCardNumberError: '',
            }
            if (this.state.amount <= 0) {
                isValid = false;
                errors.amountError = "Amount cant be negative or zero"
            } else {
                isValid = true;
            }
            // if (this.state.creditCardNumber.length === 16) {
            if (isLuhn(this.state.creditCardNumber)) {
                console.log("Is LUHN satisfied", isLuhn(this.state.creditCardNumber))
                console.log("card", this.state.creditCardNumber.slice(0, 1))

                isValid = true;
            } else {
                console.log("Invalid credit card number.")
                isValid = false;
                errors.creditCardNumberError = 'Invalid credit card number.'
            }
            // } else {
            //     console.log("Credit card number should be 16 digits")
            //     isValid = false;
            //     errors.creditCardNumberError = 'Credit card numnber should be 16 digits'
            // }

            this.setState({
                ...this.state,
                ...errors
            })
            console.log()
            resolve(isValid);

        })

    }

    handleSubmit(e) {
        console.log("handle submit")
        e.preventDefault()
        this.validate().then((res) => {
            if (this.state.creditCardNumber.slice(0, 1) === '4') {
                console.log("cardtyope visa")
                this.setState({
                    cardType: "visa"
                })
            } else if (this.state.creditCardNumber.slice(0, 1) === '5') {
                console.log("cardtyope master")
                this.setState({
                    cardType: "master"
                })
            }
            if (res) {
                this.setState({
                    otpGenInit: true
                })
                console.log("validate", res)
                const paymentDetails = {
                    amount: this.state.amount,
                    creditCardNumber: this.state.creditCardNumber,
                    expiryDate: this.state.expiryDate,
                    cvv: this.state.cvv,
                    reason: this.state.reason,
                    cardType: this.state.cardType
                };
                console.log("cardtype", this.state.cardType)
                if (this.state.cardType === "visa") {
                    alert('processing payment with Visa card')
                    console.log("Inside handle submit visa")
                    this.getDataVisa(paymentDetails).then((res) => {
                        if (res) {
                            console.log(res.data)
                            if (res.status === "200" && res.data.status === "SUCCESS") {
                                alert('processing payment with VISA card')
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

                } else if (this.state.cardType === "master") {
                    alert('processing payment with Master card')
                    this.getDataMaster(paymentDetails).then((res) => {
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
            }
            else {
            }
        })
    }

    handleVerifyOTP() {
        axios.get(`${url.url}/otpVerification/${this.state.otp}`)
            .then(res => {
                console.log("otp verified successfully")
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
                    alert("Error in paymenr", err)
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
                            <div className="form-group row">
                                {/* <span className="pull-right text-danger"><small>{this.state.expiryDateError}</small></span> */}
                                <div className="col-sm-3">
                                    <label htmlFor="expiryDateMonth">Expiry Date Month </label><br></br>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="expiryDateYear"
                                        value={this.state.expiryDateMonth}
                                        onChange={this.handleChange}
                                    />
                                </div> 
                                <h3>/</h3>
                                {/* <span className="pull-right text-danger"><small>{this.state.expiryDateError}</small></span> */}
                                <div className="col-sm-6">
                                    <label htmlFor="expiryDateYear">Expiry Date year </label><br></br>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="expiryDateYear"
                                        value={this.state.expiryDateYear}
                                        onChange={this.handleChange}
                                    />
                                </div>
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
                                <br></br><br></br>
                            </div>
                            {
                                this.state.otpGenInit ? (
                                    <div>
                                        <label htmlFor="reason">Enter the received OTP </label><br></br>
                                        <input name=""
                                            className="form-control"
                                            type="password"
                                            id="otp"
                                            value={this.state.otp}
                                            onChange={this.handleChange}
                                        />
                                        <br></br><br></br>
                                        <button type="submit" id="searchsubmit" className="btn btn-primary" onClick={this.handleVerifyOTP}  >Verify</button>&nbsp;&nbsp;
                                </div>) : (
                                        <div>

                                        </div>
                                    )
                            }
                        </form>
                    </div>
                }

            </div>
        )
    }
}

export default Payment
