import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDucument } from './firebase/firebase.utils';
import { onAuthStateChanged } from 'firebase/auth'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';
import { getDoc } from '@firebase/firestore';

class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDucument(userAuth)
        const docSnap = await getDoc(userRef)
        console.log(docSnap.data(), 'This is a test 2')

        setCurrentUser({
          id: docSnap.id,
          ...docSnap.data()
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          <Route exact path="/signin" render={() => this.props.currentUser ? <Redirect to='/'/> : <SignInAndSignUp/>}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);
