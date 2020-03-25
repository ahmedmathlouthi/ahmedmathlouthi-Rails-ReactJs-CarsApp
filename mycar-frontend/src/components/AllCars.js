import React, { Component } from 'react';
import { Segment, Grid, Card, Dimmer, Loader, Button, Icon, Header, Container, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Car from './Car';
import { carsListRequest, carsListError, carsListSuccess } from '../actions/CarsListActions';
import axios from 'axios';
import { LOADING, ERROR } from '../componentStatus';
import CarForm from './CarForm';
import { Route, Redirect, Link, Switch, withRouter } from 'react-router-dom';
class AllCar extends Component {

  componentDidMount() {
    this.props.requestCarsList();
    axios.get(`/cars`)
      .then(res => {
        const cars = res.data.data;
        this.props.carListSuccess(cars);
      })
      .catch(err => this.props.carListError(err.message))

  }
  render() {
    if (this.props.status === LOADING) {
      return <Loader active inline="centered" size="massive" />
    }
    return (
      <Container fluid>
        <Segment fluid>
          <Button
            color='teal'
            icon
            labelPosition='right'
            default
            size='small'
            onClick={() => this.props.history.push('/new')}
          >
            <Icon name='add' />
            Add Car
      </Button>
        </Segment>
        {
          this.props.status === ERROR &&
          <Message size='big' color='red' >{this.props.error}</Message>
        }
        <Card.Group>
          {this.props.cars.map((car) =>
            <Car
              key={car.id}
              car={car}
              onClick={carID => this.goToCarDetails(carID)}
            />
          )}
        </Card.Group>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const { cars, status, error } = state.carsList
  return {
    cars,
    status,
    error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    carListSuccess: (cars) => dispatch(carsListSuccess(cars)),
    requestCarsList: () => dispatch(carsListRequest()),
    carListError: (err) => dispatch(carsListError(err))
  };
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCar));