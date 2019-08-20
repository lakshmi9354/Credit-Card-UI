import React, { Component } from 'react';
import INGlogo from '../../Assets/Images/Logo.png'
import './Header.css'
import Logout from '../Logout/Logout';

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        let flag= localStorage.getItem('isLoggedIn')
        console.log("flag inside header", flag)
        this.setState(
            {
                isLoggedIn: flag
            }
        )
    }
    handleSubmit(e) {
        React.createElement(<Logout />)
    }
    logout() {
        alert('Are you sure you want to logout?');
        console.log("logout called")
        localStorage.removeItem('');
       
    }
    render() {
        return (
            <div>
                {

                    this.state.isLoggedIn ? (
                        <div className="header">
                            <img className="INGLogo" src={INGlogo} alt="ING Logo" />
                            <button className='login' onClick={this.logout}>Logout</button>
                        </div>
                    ) :
                        (
                            <div className="header">
                                <img className="INGLogo" src={INGlogo} alt="ING Logo" />
                                <button className='login' onClick={this.logout}>Login</button>
                            </div>
                        )
                }
            </div>

        )
    }
}

export default Header;