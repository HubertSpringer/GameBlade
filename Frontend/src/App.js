import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Redirect, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/Burger/Builder" component={BurgerBuilder} />
          <Route path="/Burger/Checkout" component={Checkout} />
          <Route path="/Orders" component={Orders} />
          <Redirect from="/" to="/Burger/Builder" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
