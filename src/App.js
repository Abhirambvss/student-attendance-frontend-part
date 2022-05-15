import Login from './pages/Login';
import Profession from './pages/Profession';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import CourseDetails from './components/CourseDetails'
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
          <ProtectedRoute path="/course" exact component={CourseDetails} />
          <ProtectedRoute path="/teacher/:CourseCode" exact component={Teacher} />

        </Switch>
      </Router>
    </>
  );
}

export default App;