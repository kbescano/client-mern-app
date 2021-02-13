import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles/main.css'
import HomeScreen from "./pages/HomeScreen";
import ProductsScreen from './pages/ProductsScreen';
import ProductScreen from './pages/ProductScreen';
import LoginScreen from './pages/LoginScreen';
import CartScreen from './pages/CartScreen';
import UserlistScreen from './pages/UserlistScreen';
import ProductlistScreen from './pages/ProductlistScreen';
import ProductEditScreen from './pages/ProductEditScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import Footer from './components/Footer';
import OrderScreen from './pages/OrderScreen';
import CategoryScreen from './pages/CategoryScreen';
import GenderScreen from './pages/GenderScreen';
import CreateProductScreen from './pages/CreateProductScreen';
import UserEditScreen from './pages/UserEditScreen';
import Error from './pages/Error';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  toast.configure()

  return (
    <Router>
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/products' component={ProductsScreen} exact/>
        <Route path='/products/search/:keyword' component={ProductsScreen} exact/>
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userlist' component={UserlistScreen} />
        <Route path='/admin/productlist' component={ProductlistScreen} exact />
        <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/orders/:id' component={OrderScreen} />
        <Route path='/category/:id' component={CategoryScreen} exact/>
        <Route path='/category/:id/search/:keyword' component={CategoryScreen} exact/>
        <Route path='/gender/:id' component={GenderScreen} />
        <Route path='/admin/create' component={CreateProductScreen} />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
