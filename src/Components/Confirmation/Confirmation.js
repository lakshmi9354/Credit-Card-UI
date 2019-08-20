import React, { Component } from 'react'
import './Confirmation.css'
export class Confirmation extends Component {
    constructor(props){
        super(props)
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.history.push({
            pathname: '/login',
            search: '?query=confirmation'

        })
    }
    render() {
        return (
            <div className="confirmation">
               <h3>Thank you for registering! Your account number is {this.props.location.state.data} </h3><br/>
               
               <h3>You can now login with your registered account number and password</h3>
                <br></br><br></br><br></br>
                <button type="submit" className="btn btn-primary buttonconfirm" onClick={this.handleSubmit} >Login</button>
            </div>
        )
    }
}

export default Confirmation
