import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddTodo from './components/AddTodo';
import ListTodo from './components/ListTodo';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/addTodo" component={AddTodo}/>
      <Route exact path="/listTodo" component={ListTodo} />
      <Route exact path="/listTodo/:id/edit" component={AddTodo}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
