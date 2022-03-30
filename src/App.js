import Login from './pages/Login';
import Profession from './pages/Profession';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import ProtectedRoute from './components/ProtectedRoute'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>

      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <ProtectedRoute path="/profession" exact component={Profession} />
          <ProtectedRoute path="/student" exact component={Student} />
          <ProtectedRoute path="/teacher" exact component={Teacher} />

        </Switch>
      </Router>
    </>
  );
}

export default App;