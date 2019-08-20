import React, { Component } from 'react'
import './AccountSummary.css'
import axios from 'axios';
import url from '../../config.json'

export class AccountSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Darsana',
            email: 'Darsana.M@hcl.com',
            mobileNo: '8861977885',
            accountType: 'Current',
            accountNo: '12345678',
            balance:'10000'
        }
    }
    componentDidMount(prevProps, prevState) {
        console.log("Inside component did mount", localStorage.getItem('accountId'))
        // this.getData().then(accountSummary=>{
        //     console.log(accountSummary)
        //     this.setState({
        //         name: accountSummary.name,
        //         email: accountSummary.email,
        //         mobileNo: accountSummary.mobileNo,
        //         accountType: accountSummary.accountType,
        //         balance: accountSummary.balance,
        //         accountNo: accountSummary.accountNumber
        //     })
        // })
       
        // this.getData().then((accountSummary) => {
        //     console.log("Account summary inside summary", accountSummary)
        //     this.setState({
        //         name: accountSummary.name,
        //         email: accountSummary.email,
        //         mobileNo: accountSummary.mobileNo,
        //         accountType: accountSummary.accountType,
        //         balance: accountSummary.balance,
        //         accountNo: accountSummary.accountNo
        //     })
        // })
    }
    async getData(user) {
        return new Promise((resolve, reject) => {
            let accountId=localStorage.getItem('accountId')
            console.log("Accountid", accountId)
            axios.get(`${url.url}/accountSummary/${accountId}`, user)
                .then(res => {
                    console.log("My response", res)
                    if (res.status === 200 ) {
                        resolve(res.data)
                    } else {
                    
                    }
                }).catch((err) => {
                    alert("Error in fetching accoutn summary", err)
                })
        })
    }
    render() {
        return (
            <div>
                <div className='btn-group buttontabs'>
                    <button onClick={()=> this.props.history.push({
                         pathname: '/transactionhistory',
                         search: '?query=confirmation'
                    })} type="button" id="txnhistory" class="btn btn-warning" >Txn History</button>
                    <button type="button" id="fundstransfer" class="btn btn-warning">Funds Transfer</button>
                    <button type="button" id="makePayment" class="btn btn-warning" onClick={()=>{this.props.history.push('/payment')}}>Make Payment</button>
                    <button type="button" id="cardStatement" class="btn btn-warning" onClick={()=>{this.props.history.push('/cardStatement')}}>Card Statement</button>
                </div>
                {/* <h1>Account Summary {this.props.location.state.accountNo}</h1>  */}
                <h1> Account Summary</h1>
                <div className="accountsummary">
                    <h4>Account Holder Name :{this.state.name}</h4>
                    <h4> Account Number :{this.state.accountNo}</h4>  
                    <h4>Account Type :{this.state.accountType}</h4>
                    <h4>Account Number:{this.state.accountNo}</h4>
                    <h4>Mobile Number :{this.state.mobileNo}</h4>
                    <h4>Balance :{this.state.balance}</h4>
                </div>


            </div>

        )
    }
}

export default AccountSummary
