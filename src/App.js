import './App.css';
import Home from './pages/home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"/>
        </Route>
        <Route path="/home" component={Home}/>
      </Switch>
    </main>
  );
}

export default App;
