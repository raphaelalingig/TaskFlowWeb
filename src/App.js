import "./App.css";
import { AuthProvider } from "./components/Auth/AuthContext";
import LandingPage from "./components/LandingPage.js/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Forms/Login";
import Register from "../src/components/Forms/Register";
import PrivateRoute from "../src/components/utils/PrivateRoute";
import Dashboard from "../src/components/ContentSidebars/Dashboard";
import Projects from "../src/components/ContentSidebars/Projects";
import Groups from "../src/components/ContentSidebars/Groups";
import Tasks from "../src/components/ContentSidebars/Tasks";
import ProjectContents from "../src/components/ContentSidebars/InsideProject/ProjectContents";
import InsideTask from "./components/ContentSidebars/InsideComponents/InsideTask";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact component={LandingPage} path="/" />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <PrivateRoute exact component={Dashboard} path="/dashboard" />
          <PrivateRoute exact component={Projects} path="/projects" />
          <PrivateRoute exact component={Groups} path="/groups" />
          <PrivateRoute exact component={Tasks} path="/tasks" />
          <PrivateRoute
            component={ProjectContents}
            path="/projects/:project_name"
          />
          <PrivateRoute component={InsideTask} path="/task/view_task" />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
