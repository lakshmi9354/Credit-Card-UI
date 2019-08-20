import React, { Component } from 'react'

export class Logout extends Component {
    componentDidMount(){
        console.log("Inside component did mount of logout")
        localStorage.removeItem('accountNo');
        localStorage.removeItem('accountNumber');
        localStorage.removeItem('accountId');
    }
    render() {
        return (
            <div>
                You have successfully logged out
            </div>
        )
    }
}

export default Logout
