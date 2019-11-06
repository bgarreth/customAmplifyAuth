import React from "react";
import  {Auth } from 'aws-amplify';

class Content extends React.Component {
constructor() {
 super();
 //set the initial state 
 this.state = { user: null, username: null, userGroups: [] };
}
 
  async componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
       this.setState({ user: user });
       this.setState({ username: user.username }); //set the username state
       this.setState({userGroups: user.signInUserSession.accessToken.payload['cognito:groups'] }); //set the groups state
      console.log("=================  Access Token Groups =============")
      console.log(user.signInUserSession.accessToken.payload['cognito:groups']);
      console.log("=======================================")
      console.log("================= Id token Groups =============")
      console.log(user.signInUserSession.idToken.payload['cognito:groups']);
      console.log("=======================================")
     
    }).catch(e => {
      console.log(e);
    });
    //you can also retrieve the users groups from their session
    Auth.currentSession()
    .then(data => {
    	console.log("================= Groups from Session =============")
    	console.log(data.accessToken.payload['cognito:groups']);
    	  console.log("=======================================")
		}).catch(err => console.log(err));
  }

  render() {

    return (
      <div>
         <h1>Hello {this.state.username}</h1>
         <p> You below to these groups 
         {this.state.userGroups.map((item,i) => <li key={i}>{item}</li>)} </p>
      </div>
    );
  }
}

export default Content;