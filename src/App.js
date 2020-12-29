import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import  { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action'

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
     if(userAuth){
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
          setCurrentUser({
             id: snapShot.id,
             ...snapShot.data()
           });
         console.log(this.state)
       });    
     }
     setCurrentUser(userAuth);
     console.log({currentUser:userAuth}); //when user is signed out set currentuser to null
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth(); //since auth.onAuthStateChanged is open subscribe we have to close it when componentWillUnmount() life cycle
    //to avoid memory leak
  }

  render(){
    return (
    <div>   
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
  }
  
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
