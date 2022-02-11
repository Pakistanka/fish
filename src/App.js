import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './pages/signup/Signup'
import Login from './pages/login/Login'
import Notifications from './pages/dashboard/Notifications'
import AddItem from './pages/dashboard/additem/AddItem'
import EditItem from './pages/dashboard/editItem/EditItem'
import Main from './pages/main/Main'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword'
import UpdateProfile from './pages/dashboard/update-profile/UpdateProfile'
import Navigation from './components/navigation/Navigation'
import Idea from './pages/social'
import Cart from './pages/cart/Cart'
import CatalogueItemDetails from './pages/main/Catalogue/CatalogueItemDetails/CatalogueItemDetails'

import './style.scss'
import Orders from './pages/dashboard/orders/Orders'
import ConfirmOrder from './pages/cart/confirm-order/ConfirmOrder'
import DeliveryInfo from './pages/cart/delivery-info/DeliveryInfo'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/goodi/:id" component={CatalogueItemDetails} />
          <Route exact path="/socialmedia" component={Idea} />
          <Route path="/cart" component={Cart} />
          <Route path="/delivery-info" component={DeliveryInfo} />
          <Route path="/confirm-order" component={ConfirmOrder} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/profile" component={UpdateProfile} />
          <PrivateRoute exact path="/additem" component={AddItem} />
          <PrivateRoute exact path="/edit/:id" component={EditItem} />

        </Switch>
      </AuthProvider>
    </Router>
  );
}
export default App;
