import React, { Component } from 'react';
import  CarForm  from './components/CarForm';
import AllCars from './components/AllCars';
import AllTasks from './components/AllTasks';
import TaskForm from './components/TaskForm'
import { Header, Button, Icon, Segment } from 'semantic-ui-react';
import axios from 'axios';
// import Router from './Router';
import {
  withRouter,
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'http://localhost:3000/api';
  }
  render() {
      return (
        <div className="App" >
          <Router>
            <Segment>
              <Header as='h1' textAlign='left' content='My Cars' color='teal' attached='top'/>
            </Segment>
                <Switch>
                    <Route exact path='/' component={AllCars} />
                    <Route path='/new' component={CarForm} />
                    <Route exact path='/:carId/tasks/new' component={TaskForm} />
                    <Route path='/:carId/tasks' component={AllTasks} />
                </Switch>
          </Router>
        </div>
      )
  }
}
export default App;