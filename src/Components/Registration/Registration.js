import React, { Component } from 'react'
import './Registration.css'
import axios from 'axios';
import url from '../../config.json'
export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            name: '',
            nameError: '',
            mobileNo: '',
            mobileNoError: '',
            accountType: '',
            accountTypeError: '',
            city:'',
            cityError:'',
            isValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setAccountType = this.setAccountType.bind(this);
    }
    componentDidMount(){
        localStorage.removeItem('accountNo');
        localStorage.removeItem('accountNumber');
        localStorage.removeItem('accountId');
    }
    setAccountType(e) {
        console.log(e.target.value)
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //console.log(this.state)
        });

    }
    getData(user){
        return new Promise((resolve, reject)=>{
            axios.post(`${url.url}/register`, user)
                .then(res => {
                    console.log("My response", res)
                    if (res.status === 201 ) {
                        resolve(res.data)
                    } else {
                       // reject(res.data)
                    }
                }).catch((err) => {
                    alert("Error in registration", err)
                })
        })
    }
    handleSubmit(e) {
        console.log("URL", url)
        e.preventDefault();
        this.validate().then((valid) => {
            console.log("isvalid inside validate submit", valid)
            if (valid) {
                const accountHolder = {
                    email: this.state.email,
                    name: this.state.name,
                    mobileNo: this.state.mobileNo,
                    accountType: this.state.accountType,
                    password: this.state.password,
                    city: this.state.city
                }
                this.getData(accountHolder).then((res)=>{
                    if(res){
                        console.log("res insiode getData",res)
                        alert('Registration is successful')

                        localStorage.setItem('accountNo', res.accountNo)
                        console.log(res.accountNo,"accountNo",localStorage.getItem('accountNo'))
                        this.props.history.push({
                            pathname: '/confirmation',
                            search: '?query=confirmation',
                            state:{data: res.accountNumber}
                        })
                    }
                   
                })
               
            } else {
                
            }

        })
    }
    
    
validate() {
    return new Promise((resolve,reject)=>{
        console.log("Inside validate")
        let isValid = true;
        const errors = {
            emailError: '',
            mobileNoError: '',
            passwordError: '',
            nameError: '',
            cityError:''
        }
        if (this.state.email.indexOf('@') != -1) {
            isValid=true;
           
        } else {
            console.log("is valid is false")
            isValid = false;
            errors.emailError = "Email should have @ and password should have more than 4 characters"
        }
        if (this.state.name.length > 4) {
            isValid=true;
        } else {
            isValid = false;
            errors.nameError = 'first name should be more than 4 characters'
        }
        if (this.state.mobileNo.length ===10) {
            isValid=true;
        } else {
            isValid = false;
            errors.mobileNoError = 'Mobile number should be 10 digits'
        }
        if (this.state.password.length >8) {
            isValid=true;
        } else {
            isValid = false;
            errors.mobileNoError = 'password should be more than 8 characters'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        resolve(isValid);

    })
}
render() {
    return (
        <div>
            <header >
                <h1>Register with ING online banking</h1>
            </header>
            <form className="registerform">
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.emailError}</small></span>
                    <br></br>
                    <label htmlFor="email">Email </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        className="form-control"
                        placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.firstNameError}</small></span>
                    <br></br>
                    <label htmlFor="name">Name  </label>
                    <input
                        type="text"
                        id="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        className="form-control"
                        placeholder="Enter the name" />
                </div>

                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.mobileNoError}</small></span>
                    <br></br>
                    <label htmlFor="mobileNo">Mobile Number  </label>
                    <input
                        type="text"
                        id="mobileNo"
                        onChange={this.handleChange}
                        value={this.state.mobileNo}
                        className="form-control"
                        placeholder="Enter the mobile number" />
                </div>
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.cityError}</small></span>
                    <br></br>
                    <label htmlFor="city">City  </label>
                    <input
                        type="text"
                        id="city"
                        onChange={this.handleChange}
                        value={this.state.city}
                        className="form-control"
                        placeholder="Enter the city" />
                </div>
                <div onChange={this.setAccountType} className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.accountTypeError}</small></span>
                    <br></br>
                    <label htmlFor="accountType">AccountType   </label>
                    <label htmlFor="accountType">Current</label>
                    <input
                        type="radio"
                        id="accountType"
                        value="Current"
                        className="form-control"
                        name="accounttype"
                    />
                    <label htmlFor="accountType">Savings</label>
                    <input
                        type="radio"
                        id="accountType"
                        value="Savings"
                        name="accounttype"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <span className="pull-right text-danger"><small>{this.state.passwordError}</small></span>
                    <br></br>
                    <label htmlFor="password">Password  </label>
                    <input
                        type="password"
                        id="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        className="form-control"
                        placeholder="Enter the password" />
                </div>
                <br>
                </br>
                <br>
                </br>
                <button type="submit" id="registerfreesubmit" className="btn btn-primary" onClick={this.handleSubmit}  >Register</button>

            </form>
        </div>
    )
}
}

export default Registration
