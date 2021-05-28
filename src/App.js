import { Fragment } from "react";
import {  Redirect, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./hoc/Container/Container";
import {privateRoutes, publicRoutes} from "./routes/routes"

function App() {
  const user = false


  return (
    <Fragment>
      <Navbar/>
      <Container>
        <Switch>
          {
            user
              ? privateRoutes.map(({path, Component}) => (
                <Route key={path} exact path={path} component={Component}/>
              ))
              : publicRoutes.map(({path, Component}) => (
                <Route key={path} exact path={path} component={Component}/>
              ))
          }
          <Redirect to={ user ? '/chat' : '/login'}/>
        </Switch>
      </Container>
    </Fragment>
  );
}

export default App;
