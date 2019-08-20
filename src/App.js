import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import {HashRouter, BrowserRouter, Route } from 'react-router-dom'
import Registration from './Components/Registration/Registration';
import Confirmation from './Components/Confirmation/Confirmation';
import AccountSummary from './Components/AccountSummary/AccountSummary';
import Login from './Components/Login/Login';
import AddPayee from './Components/AddPayee/AddPayee';
import FundTransfer from './Components/FundTransfer/FundTransfer';
import TransactionHistory from './Components/TransactionHistory/TransactionHistory';
import Logout from './Components/Logout/Logout';
import CardStatement from './Components/CardStatement/CardStatement';
function App() {
  return (
    <div className="App">
      <BrowserRouter>     
        <Header/> 
        {/* <Route path='/login' exact component={Login}></Route>
        <Route path='/logout' exact component={Logout}></Route> */}
        <Route path='/login' exact component={Login}></Route>
        <Route path='/logout' exact component={Logout}></Route>
        <Route path='/addPayee' exact component={AddPayee}></Route>
         <Route path='/accountSummary' exact component={AccountSummary}></Route>
        <Route path='/confirmation' exact component={Confirmation}></Route>
        <Route path='/fundtransfer' exact component={FundTransfer}></Route>
        <Route path='/transactionhistory' exact component={TransactionHistory}></Route>
        <Route path='/cardStatement' exact component={CardStatement}></Route>
        <Route path='/' exact component={Registration}></Route>
    </BrowserRouter>
    </div>
  );
}

export default App;