import React, { Component } from 'react'
import axios from 'axios'
import './AddPayee.css'
import url from '../../config.json'
import Axios from 'axios';
export class AddPayee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accountNumber: '',
            accountNumberError: '',
            mobileNo: '',
            mobileNoError: '',
            name: '',
            nameError: '',
            email: '',
            emailError: '',
            isValid: '',
            otpGenInit: false,
            otp: '',
            payeeList: [{
                'name': 'Darsana',
                'accountNumber': '3123123',
                'email': 'darsana@gmail.com',
                'mobileNo': 8861977885,
                'accountType': 'Savings'
            }, {
                'name': 'Deepthi',
                'accountNumber': '123456',
                'email': 'deepthi@gmail.com',
                'mobileNo': 9901666911,
                'accountType': 'Current'
            }]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAddPayee = this.handleAddPayee.bind(this);
        this.handleEditPayee = this.handleEditPayee.bind(this);
        this.handleDeletePayee = this.handleDeletePayee.bind(this);
        this.handleVerifyOTP = this.handleVerifyOTP.bind(this);
        this.setAccountType = this.setAccountType.bind(this)
    }

    handleEditPayee(e) {

        console.log("edit payee", this.state.name)
    }
    handleDeletePayee() {

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
    getData(fields) {
        console.log("getdata", fields)
        return new Promise((resolve, reject) => {
            axios.get(`${url}/payee`)
                .then(res => {
                    resolve(res)
                }).catch((err) => {
                    reject(err);
                    alert("Error in search", err)
                })

        })
    }
    componentDidMount() {
        let accountId=localStorage.getItem('accountId')
        console.log("accountId",accountId)
        axios.get(`${url}/payee`)
            .then(res => {
                this.setState({
                    payeeList: res.data.payeeList
                })
            }).catch((err) => {
                console.log('Error in getting payee list')
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
    validate() {
        return Promise.resolve(true);
    }
    render() {
        return (

            <div>
                <h1 className="headingpayee">AddPayee</h1>
                {
                    this.state.payeeList !== '' ? (
                        <div>
                            <form className="searchprofileform">
                                <span className="pull-right text-danger"><small>{this.state.accountNumberError}</small></span>
                                <div className="form-group col-xs-3">
                                    <label htmlFor="accountNumber">Account Number  </label><br></br>
                                    <input name=""
                                        className="form-control"
                                        placeholder="Account Number"
                                        type="text"
                                        value={this.state.accountNumber}
                                        id="accountNumber"
                                        onChange={this.handleChange} />
                                </div>
                                <span className="pull-right text-danger"><small>{this.state.mobileNoError}</small></span>
                                <div className="form-group col-xs-3">
                                    <label htmlFor="mobileNo">Mobile Number  </label><br></br>
                                    <input name=""
                                        className="form-control"
                                        placeholder="MobileNo"
                                        type="text"
                                        id="mobileNo"
                                        value={this.state.mobileNo}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <span className="pull-right text-danger"><small>{this.state.nameError}</small></span>
                                <div className="form-group col-xs-3">
                                    <label htmlFor="mobileNo">Name  </label><br></br>
                                    <input name=""
                                        className="form-control"
                                        placeholder="name"
                                        type="text"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group col-xs-3">
                                    <label htmlFor="mobileNo">Email </label>
                                    <br></br>
                                    <input name=""
                                        className="form-control"
                                        placeholder="email"
                                        type="text"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div onChange={this.setAccountType} className="form-group col-xs-3">
                                    <label htmlFor="accountType">AccountType   </label>
                                    <br></br>
                                    <input
                                        type="radio"
                                        id="accountType"
                                        value="Current"
                                        className="form-control"
                                        name="accounttype"
                                    />
                                    <label htmlFor="accountType">Current</label>
                                    <input
                                        type="radio"
                                        id="accountType"
                                        value="Savings"
                                        name="accounttype"
                                        className="form-control"
                                    />
                                    <label htmlFor="accountType">Savings</label>
                                </div>
                                <div className="form-group col-xs-2 ">
                                    <button type="submit" id="searchsubmit" className="btn btn-primary" onClick={this.handleAddPayee}  >Add Payee </button>&nbsp;&nbsp;
                            </div>

                            </form>

                            {
                                this.state.otpGenInit ? (
                                    <div>
                                        <label htmlFor="otp">Enter the OTP receved in your email</label><br></br>

                                        <input type="password" value={this.state.otp} onChange={this.handleChange} id='otp' />
                                        <button type="submit" id="searchsubmit" className="btn btn-primary" onClick={this.handleVerifyOTP}  >Verify OTP </button>&nbsp;&nbsp;
                                            </div>
                                ) : (
                                        <div>
                                        </div>
                                    )
                            }
                            <h1>List of Payees</h1>
                            <table className="table">
                                <thead className="tableheading">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Account Number</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Mobile Number</th>
                                        <th scope="col">Account Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.payeeList.map((each, index) => (
                                            <tr className="datarow" scope="row">
                                                <td contenteditable="true"> {each.name}</td>
                                                <td> {each.accountNumber}</td>
                                                <td> {each.email}</td>
                                                <td> {each.mobileNo}</td>
                                                <td> {each.accountType}</td>
                                                <td>  <button type="submit" id="editPayee" className="btn btn-primary" onClick={this.handleEditPayee}  >Edit</button></td>
                                                <td>  <button type="submit" id="deletePayee" className="btn btn-primary" onClick={this.handleDeletePayee}  >Delete</button></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>

                        </div>

                    ) : (

                            <div>
                                <form className="searchprofileform">
                                    <span className="pull-right text-danger"><small>{this.state.accountNumberError}</small></span>
                                    <div className="form-group col-xs-3">
                                        <label htmlFor="accountNumber">Account Number  </label>
                                        <input name=""
                                            className="form-control"
                                            placeholder="Account Number"
                                            type="text"
                                            value={this.state.accountNumber}
                                            id="accountNumber"
                                            onChange={this.handleChange} />
                                    </div>
                                    <span className="pull-right text-danger"><small>{this.state.mobileNoError}</small></span>
                                    <div className="form-group ">
                                        <label htmlFor="mobileNo">Mobile Number  </label>
                                        <input name=""
                                            className="form-control"
                                            placeholder="MobileNo"
                                            type="text"
                                            id="mobileNo"
                                            value={this.state.mobileNo}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <span className="pull-right text-danger"><small>{this.state.nameError}</small></span>
                                    <div className="form-group ">
                                        <label htmlFor="mobileNo">Name  </label>
                                        <input name=""
                                            className="form-control"
                                            placeholder="name"
                                            type="text"
                                            id="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="mobileNo">Email </label>
                                        <input name=""
                                            className="form-control"
                                            placeholder="email"
                                            type="text"
                                            id="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div onChange={this.setAccountType} className="form-group col-xs-3">
                                        <label htmlFor="accountType">AccountType   </label>

                                        <input
                                            type="radio"
                                            id="accountType"
                                            value="Current"
                                            className="form-control"
                                            name="accounttype"
                                        />
                                        <label htmlFor="accountType">Current</label>
                                        <input
                                            type="radio"
                                            id="accountType"
                                            value="Savings"
                                            name="accounttype"
                                            className="form-control"
                                        />
                                        <label htmlFor="accountType">Savings</label>
                                    </div>
                                    <div className="form-group col-xs-2 ">
                                        <button type="submit" id="searchsubmit" className="btn btn-primary" onClick={this.handleSubmit}  >Add Payee </button>&nbsp;&nbsp;
                            </div>

                                </form>
                            </div>
                        )
                }

            </div>
        )
    }
}

export default AddPayee
