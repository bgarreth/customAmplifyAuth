import React from "react";
import { SignIn } from "aws-amplify-react";
import './App.css';
import { Button,Container,Row,Col  } from 'react-bootstrap';
 import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';


//  const oauth = {
//   'domain': 'xell-alexa.auth.us-east-1.amazoncognito.com',
//   'scope': ['email', 'openid', 'aws.cognito.signin.user.admin'],
//   'redirectSignIn': 'https://pitangui.amazon.com/api/skill/link/MAXBIFIBSN64H',
//   'redirectSignOut': 'http://localhost:3000/',
//   'responseType': 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
// };
// Amplify.configure(awsconfig);
// // Auth.configure({ oauth });
// Amplify.configure({
//   Auth: {
//     oauth: oauth
//   },
// });

export class CustomSignIn extends SignIn {
  constructor(props) {
   // debugger;
    super(props);
    //console.log(this.props);
    this.signOut = this.signOut.bind(this);
    // let the Hub module listen on Auth events
    Hub.listen('auth', (data) => {
      //debugger;
      switch (data.payload.event) {
        case 'signIn':
          this.setState({ authState: 'signedIn', authData: data.payload.data });
          break;
        case 'signIn_failure':
          this.setState({ authState: 'signIn', authData: null, authError: data.payload.data });
          break;
        case "xyz":
          this.setState({ customState: data });
        default:
          break;
      }
    });
    this.state = {
      authState: 'loading',
      authData: null,
      authError: null,
      user: null
    }
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];

  }

  // async componentDidMount() {
  //   console.log('on component mount');
  //   // check the current user when the App component is loaded
  //   Auth.currentAuthenticatedUser().then(user => {
  //     console.log(user);
  //      this.setState({ user: user });
  //     console.log("=================  Access Token Groups =============")
  //      console.log(user.signInUserSession.accessToken.payload['cognito:groups']);
  //     console.log("=======================================")
  //     console.log("================= Id token Groups =============")
  //      console.log(user.signInUserSession.idToken.payload['cognito:groups']);
  //     console.log("=======================================")
  //     this.setState({ authState: 'signedIn' });
  //   }).catch(e => {
  //     console.log(e);
  //     this.setState({ authState: 'signIn' });
  //   });

  //}



  signOut() {
    Auth.signOut().then(() => {
      this.setState({ authState: 'signIn' });
    }).catch(e => {
      console.log(e);
    });
  }


  showComponent(theme) {
    const { authState } = this.state;
    return (

        <Container>

  <Row>
    <Col></Col>
    <Col>
  <div className="wrapper">
      <h1>Hello Sign into your alexa application</h1>
        <form >
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              key="username"
              name="username"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              key="password"
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit"
             Button variant="primary"
              type="button"
              onClick={() => super.signIn()}
            >
              Sign in here
            </Button>
            <br/> <br/>
           
          </div>
        </form>
      </div>
    </Col>
    <Col></Col>
  </Row>
</Container>




    
    );
  }
}