import React, { Component } from 'react'
import './Login.css'
import axios from 'axios'
import url from '../../config.json'
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileNo: '',
            mobileNoError: '',
            password: '',
            passwordError: '',
            isValid: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            console.log(this.state)
        });

    }
  
    getData(user) {
        return new Promise((resolve, reject) => {
            console.log("url", url)
            axios.post(`${url.url}/login`, user)
                .then(res => {
                    console.log("My response", res)
                    if (res.status === 200 && res.data.status==='SUCCESS') {
                        resolve(res.data)

                    } else {
                        alert(res.data.message)
                    }
                }).catch((err) => {
                    alert("Error in Login", err)
                })

        })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.validate().then((res) => {
            if (res) {
                const user = {
                    mobileNo: this.state.mobileNo,
                    password: this.state.password
                };
                this.getData(user).then((res)=>{
                    if(res){
                        console.log(res.data)
                        localStorage.setItem('userId',res.data.userId)
                        this.props.history.push({
                            pathname: '/accountSummary',
                            search: '?query=accountSummary',
                        })
                    }
                }).catch(err=>{
                    localStorage.setItem('isLoggedIn', true)
                    console.log("localstorage inside login",localStorage.getItem('isLoggedIn'))
                    alert('Error in login', err)
                })
            }
            else{

            }
        })
    }   
   
    validate() {
        console.log("Inside validate")
        let isValid = false;
        const errors = {
            mobileNoError: '',
            passwordError: '',

        }
        if (this.state.mobileNo.length > 6) {
           isValid=true;
        } else {
            console.log("account no greater than 6")
            isValid = false;
            errors.mobileNoError = 'Account number should be more than 6 characters/digits'
        }
        if (this.state.password.length >=8) {
            isValid = true;
        } else {
            isValid = false;
            errors.passwordError = 'Password should be greater than 8 characters'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return Promise.resolve(isValid);
    }
    render() {
        return (
            <div>
                <h2 className="headinglogin">Login</h2>
                <form className="loginform">
                    <div className="form-group">
                        <span className="pull-right text-danger"><small>{this.state.mobileNoError}</small></span>
                        <br></br>
                        <label htmlFor="mobileNo">MobileNo</label><br></br>
                        <input
                            type="text"
                            id="mobileNo"
                            onChange={this.handleChange}
                            value={this.state.mobileNo}
                            className="form-control"
                            placeholder="Enter Mobile No" />
                    </div>

                    <div className="form-group">
                        <span className="pull-right text-danger"><small>{this.state.passwordError}</small></span>
                        <br></br>
                        <label htmlFor="password">Password</label><br></br>
                        <input
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            className="form-control"
                            placeholder="Enter the password" />
                    </div>
                    <br/>
                    <br/>

                    <button type="submit" id="loginsubmit" className="btn btn-primary loginButton" onClick={this.handleSubmit}  >Login </button>&nbsp;&nbsp;
            </form>
            </div>
        )
    }
}

export default Login
