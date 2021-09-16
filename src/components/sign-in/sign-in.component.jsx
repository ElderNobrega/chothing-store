import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { Component} from "react";

import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in.styles.scss'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target

    this.setState({[name]: value})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { email, password } = this.state
    try {
      await signInWithEmailAndPassword(auth, email, password)

      this.setState({
        email: '',
        password: ''
      })
      } catch (error) {
        console.log(error)
    }    
  }

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput name="email" type="email" value={this.state.email} label="email" onChange={this.handleChange} required/>
          <FormInput name="password" type="password" value={this.state.password} label="password" onChange={this.handleChange} required/>
          <div className='buttons'>
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn