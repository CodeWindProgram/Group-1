
import './App.css';
import Teacher from "./Teacher"
import Student  from "./Student"
import { Route,Switch } from "react-router-dom";
import ForgotPassword from './ForgotPassword';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Student}/>
        <Route exact path ="/teacher" component={Teacher }/>
        <Route exact path="/forgotpassword" component={ForgotPassword}/>
      </Switch>
      
       {/* <Student /> */}
        {/* <Teacher/>  */}
      </div>
  );
}

export default App;
