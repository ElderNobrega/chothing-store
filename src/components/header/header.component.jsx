import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import './header.styles.scss'

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo"/>
      </Link>
      <div className="options">
        <Link className="option" to="/shop">Shop</Link>
        <Link className="option" to="/contact">Contact</Link>
        {
          currentUser ? (<div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> )
          : (<Link className="option" to='signin'>SIGN IN</Link>)
        }
        <CartIcon/>
      </div>
      {
        hidden ? null : <CartDropdown/>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)