import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import OrderDetails from './Components/OrderDetails/OrderDetails';
import Register from './Components/Register/Register';
import Home from './Components/Pages/Home/Home/Home';
import Explore from './Components/Pages/Explore/Explore/Explore';
import NavBar from './Components/Shared/Navbar/NavBar';
import Footer from './Components/Shared/Footer/Footer';
import Dashboard from './Components/Pages/Dashboard/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/orderDetails/:productId">
              <NavBar></NavBar>
              <OrderDetails></OrderDetails>
              <Footer></Footer>
            </PrivateRoute>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <PrivateRoute path="/dashBoard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          {/* <Footer></Footer> */}
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
