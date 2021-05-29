import { useContext } from "react";
import {  Redirect, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./hoc/Layout/Layout";
import {firebaseContext} from './context/firebaseContext'
import {privateRoutes, publicRoutes} from "./routes/routes"
import {useAuthState} from "react-firebase-hooks/auth"
import Loader from "./components/Loader/Loader";

function App() {
  const {auth} = useContext(firebaseContext)
  const [user, loading] = useAuthState(auth)

  return (
    <Layout>
      <Navbar/>
      {
        loading 
          ? <Loader/>
          : <Switch>
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
      }
        
    </Layout>
  );
}

export default App;
