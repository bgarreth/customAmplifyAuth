import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator,Authenticator,Greetings} from "aws-amplify-react";
import { CustomSignIn } from "./CustomSignIn";
import Content from "./Content";
import config from "./aws-exports";
Amplify.configure(config);




class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div>
      <Authenticator hideDefault={true}>
    <Greetings
        inGreeting={(username) => 'Welcome to the homepage ' + username}
        outGreeting="Please sign in..."
    />
  </Authenticator>
        <Content/>
      </div>
    );
  }
}

export default withAuthenticator(App, true, [
      <CustomSignIn/>
]); 


