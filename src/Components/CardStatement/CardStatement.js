import React, { Component } from 'react'
import axios from 'axios';
import url from '../../config.json'
export class CardStatement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardNo: '',
            cardNoError: '',
            transactionFromDate: '',
            transactionFromDateError: '',
            transactionToDate: '',
            transactionToDateError: '',
            cardStatement: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.getStatement =this.getStatement.bind(this);
    }
    componentDidMount() {
        console.log("Inside component did mount of card statement")

    }
    componentDidUpdate() {
        console.log("Date", this.state.transactionDate)
        this.formatDate()
    }
    getStatement() {
        let userId= localStorage.getItem('userId')
        console.log("Userid inside statement", userId)
        const reqDetails={
            fromDate: this.state.transactionFromDate,
            toDate: this.state.transactionToDate,
            creditCardNumber: this.state.cardNo,
            userId: userId
        }
        this.validate().then(isValid => {
            if (isValid) {
                axios.post(`${url.url}/statement`, reqDetails)
                .then((res)=>{
                    this.setState(
                        {
                            cardStatement: res.data
                        }
                    )
                    alert("Transaction is sucessful")
                }).catch(err=>{
                    alert('Failure in transaction', err)
                })
            } else {
            
            }

        })
    }
    validate() {
        return new Promise((resolve, reject) => {
            let today=this.formatDate()
            console.log("Inside validate")
            let isValid = true;
            const errors = {
                transactionFromDateError: '',
                transactionToDateError: '',
                cardNoError: ''
            }

            if (this.state.cardNo.length === 16) {
            } else {
                isValid = false;
                errors.cardNoError = 'Card Number should be 16 digits'
            }
            if (this.state.transactionFromDate !== today) {
                isValid = true;
            } else {
                isValid = false;
                errors.transactionFromDateError = 'From Date cannot be today date'
            }

            this.setState({
                ...this.state,
                ...errors
            })
            resolve(isValid);

        })
    }
    handleChange(e) {
        console.log(e.target.value, e.target.id)
        this.setState({ [e.target.id]: e.target.value });

    }
    formatDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
    }
    render() {
        return (
            <div>
                <h1>Card Statement</h1>
                <div>
                    <span className="pull-right text-danger"><small>{this.state.cardNoError}</small></span>
                    <br></br>
                    <label htmlFor="password">Enter the card number to view the statement</label><br></br>
                    <input
                        type="text"
                        id="cardNo"
                        onChange={this.handleChange}
                        value={this.state.cardNo}
                        className="form-control"
                        placeholder="Enter the card number" />

                    <span className="pull-right text-danger"><small>{this.state.transactionFromDateError}{this.state.transactionToDateError}</small></span>
                    <br></br><br></br>
                    <label htmlFor="transactionDate">Choose the date range</label><br></br>
                    <input
                        type="date"
                        id="transactionFromDate"
                        onChange={this.handleChange}
                        value={this.state.transactionDate}
                        className="form-control"
                        placeholder="Enter the password" />&nbsp;&nbsp;&nbsp;
                        <input
                        type="date"
                        id="transactionToDate"
                        onChange={this.handleChange}
                        value={this.state.transactionDate}
                        className="form-control"
                        placeholder="Enter the password" />
                    <br></br>
                    <br></br>
                    <button id="getStatement" className="btn btn-primary" onClick={this.getStatement}> Get Statement</button>
                    <br></br><br></br>
                </div>
                <table className="table">
                    <thead className="tableheading">
                        <tr>
                            <th scope="col">Transaction Date</th>
                            <th scope="col">Credit Card Number</th>
                            <th scope="col">Transaction Amount</th>
                            <th scope="col">Transaction Type</th>
                            <th scope="col">Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cardStatement.map((each, index) => (
                                <tr className="datarow" scope="row">
                                    <td > {each.transactionDate}</td>
                                    <td> {each.creditCardNumber}</td>
                                    <td> {each.amount}</td>
                                    <td> {each.transactionType}</td>
                                    <td> {each.reason}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

export default CardStatement
