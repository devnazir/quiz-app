import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes/routes.js";
import MainLayout from "./layout/MainLayout";
import { useAuth } from './hook/useAuth'
import Private from "./utils/private";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Router>
      <MainLayout>
        <Navigation />
        <Switch>
          {routes.map((route) => {
            return (
              <Route exact path={route.path } key={route.id}>
                {route.private ? (
                  <Private userLogged={auth}>
                    <route.component />
                  </Private>
                ) : (
                  <route.component />
                )}
              </Route>
            );
          })}
          <Route>Not Found</Route>
        </Switch>
      </MainLayout>
    </Router >
  );
}

export default App;
