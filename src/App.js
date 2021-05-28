import {  Redirect, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./hoc/Layout/Layout";
import {privateRoutes, publicRoutes} from "./routes/routes"

function App() {
  const user = true


  return (
    <Layout>
      <Navbar/>
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
    </Layout>
  );
}

export default App;
