import React from 'react';
import {
    withRouter,
    Switch,
    Route,
    BrowserRouter as Router
} from 'react-router-dom';
import CarForm from "./CarForm";
import AllCars from './AllCars';

const Routes = () => (
        <Switch>
            <Route path='/' component={AllCars} />
            <Route path='/addCar/' component={CarForm} />
        </Switch>
)

export default Routes ;