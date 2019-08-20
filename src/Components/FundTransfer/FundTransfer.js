import React, { Component } from 'react'
import './FundTransfer.css'
import axios from 'axios'
import url from '../../config.json'
export class FundTransfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromAccountNo: '',
            fromAccountNoError: '',
            toAccountNo: '',
            toAccountNoError: '',
            amount: '',
            amountError: '',
            comments: '',
            commentsError: '',
            isValid: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });

    }
    handleGoBack(){
        this.props.history.push('/home')
    }
    componentDidMount(){
        let accountNumber=localStorage.getItem('accountNo')
        console.log("Account number inside component did mount", accountNumber)
    }
    handleSubmit(e) {
        
        e.preventDefault()
        this.validate().then((res)=>{
            if(res){
            const transferdetails = {
                fromAccount: parseInt(this.state.fromAccountNo),
                amount: parseInt(this.state.amount),
                toAccount: parseInt(this.state.toAccountNo)
                
            };
            console.log(transferdetails);
           
            axios.post(`${url.url}/fundTransfer`,transferdetails ).then(res => {
                    console.log("Response from axios",res)
                    if (res.status === 200 ) {
                        alert("fund transfer successful",res.data.message)
                    } else {
                        alert(`Error in transferring fund... ${res.data.message}`)
                    }
                }).catch((err) => {
                    console.log("error in axios post")
                    alert("Error in transferring fund", err)
                })
            }
        }


        );
    
      
           
        }

    validate() {
        console.log("Inside validate")
        let isValid = true;
        const errors = {
            fromAccountNoError: '',
            toAccountNoError: '',
            amountError: '',
            commentsError: ''
        }
        if (this.state.amount > 0) {
            if (this.state.fromAccountNo.length >= 6 && this.state.fromAccountNo.length <= 8) {
                isValid = true;
            } else {
                isValid = false;
                errors.fromAccountNoError = "Account number should be between 6 to 8 digits"
            }
        } else {
            isValid = false;
            errors.amountError = "Amount should not be negative or zero"
        }

        
        // if (this.state.toAccountNo.length >= 6 && this.state.toAccountNo.length <= 8) {
        //     isValid = true;
        // } else {
        //     isValid = false;
        //     errors.toAccountNoError= "Account number should be between 6 to 8 digits"
        // }
        this.setState({
            ...this.state,
            ...errors
        })
        return Promise.resolve(isValid);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });
    }    
    render() {
        return (
            <div>
                <header >
                    <h1 headingfund>Fund Transfer</h1>
                </header>
                <form className="fundtransferform">
                        <div className="form-group ">
                        <span className="pull-right text-danger"><small>{this.state.fromAccountNoError}</small></span>
                        <br></br>
                            <label htmlFor="fromAccountNo" >From Account number</label>
                            <br></br>
                            <input id="fromAccountNo"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="fromAccountNo"
                                placeholder="From Account Number"
                                onChange={this.handleChange}
                                value={this.state.fromAccountNo}
                            />
                        </div>
                        <div className="form-group ">
                        <span className="pull-right text-danger"><small>{this.state.toAccountNoError}</small></span>
                        <br></br>
                            <label htmlFor="toAccountNumber" >To Account Number</label>
                            <br></br>
                            <span className="pull-right text-danger"><small>{this.state.toAccountNoError}</small></span>
                            <input id="toAccountNo"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="toAccountNo"
                                placeholder="To Account Number"
                                value={this.state.toAccountNo}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-xs-6">
                        <span className="pull-right text-danger"><small>{this.state.amountError}</small></span>
                        <br></br>
                            <label htmlFor="amount">Amount</label>
                            <br></br>
                            
                            <input id="amount"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="amount"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-xs-6">
                            <label htmlFor="comments" >Comments</label>
                            <br>
                            </br>
                            <input id="comments"
                                className="form-control input-group-lg reg_name"
                                type="text"
                                name="comments"
                                placeholder="Enter comments"
                                value={this.state.comments}
                                onChange={this.handleChange} />
                        </div>
                        <br>
                        </br>
                        <br>
                        </br>
                    <button type="submit" id="submit" className="btn btn-primary" onClick={this.handleSubmit}  >Transfer Funds</button>&nbsp;&nbsp;&nbsp;

                </form>
            </div>
        )
    }
}

export default FundTransfer
