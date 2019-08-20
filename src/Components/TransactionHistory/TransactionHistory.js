import React, { Component } from 'react'
import './TransactionHistory.css'
export class TransactionHistory extends Component {
    constructor(props){
        super(props)
        this.state={
            txnHistory:[{
                'transactionDate': '22-12-1987',
                'merchantName':'CCD',
                'accountNo':'12345666565',
                'amount': 200,
                'status':'FAILURE'
            },{
                'transactionDate': '23-12-1987',
                'merchantName':'Starbucks',
                'accountNo':'423398432234',
                'amount': 200,
                'status':'SUCCESS'
            },
            {
                'transactionDate': '23-12-1987',
                'merchantName':'BigBazaar',
                'accountNo':'828292899',
                'amount': 25000,
                'status':'SUCCESS'
            },
            {
                'transactionDate': '23-12-1987',
                'merchantName':'FabIndia',
                'accountNo':'64565747',
                'amount': 20000,
                'status':'SUCCESS'
            },{
                'transactionDate': '22-12-1987',
                'merchantName':'CCD',
                'accountNo':'12345666565',
                'amount': 200,
                'status':'SUCCESS'
            },{
                'transactionDate': '23-12-1987',
                'merchantName':'Starbucks',
                'accountNo':'423398432234',
                'amount': 200,
                'status':'SUCCESS'
            },
            {
                'transactionDate': '23-12-1987',
                'merchantName':'BigBazaar',
                'accountNo':'828292899',
                'amount': 25000,
                'status':'FAILURE'
            },
            {
                'transactionDate': '23-12-1987',
                'merchantName':'FabIndia',
                'accountNo':'64565747',
                'amount': 20000,
                'status':'FAILURE'
            }]
        }
    }
    componentDidMount(){
        console.log("Inside txn hisorty", localStorage.getItem('accountNo'))
    }
    render() {
        return (
            <div>
                <h3 className="historyheading">Last 10 transactions</h3>
               <br></br><br></br>
                <table className="historyTable">
                    <thead className="tableheading">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">MerchantName</th>
                            <th scope="col">Account Number</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.txnHistory.map((each,index)=>(
                                <tr className="datarow" scope="row">
                                    <td> {each.transactionDate}</td>
                                    <td> {each.merchantName}</td>
                                    <td> {each.accountNO}</td>
                                    <td> {each.amount}</td>
                                    <td> {each.status}</td>
                                </tr>
                            ))
                        }
        
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default TransactionHistory
