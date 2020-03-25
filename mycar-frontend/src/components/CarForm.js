import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react-form-validator';
import { Button, Segment, Container, Icon, Header } from 'semantic-ui-react'
import {
  DateInput,
} from 'semantic-ui-calendar-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addCarRequest } from '../actions/CarsListActions';
import { withRouter } from 'react-router-dom';

class CarForm extends Component {

  state = {
    mileageError: false,
    formError: false,
    vin: '',
    model: '',
    color: '',
    mileage: 0,
    purchased_date: '',
    errorMessage: 'Please complete all required fields.',
    complete: false,
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const vin = this.state.vin;
    const model = this.state.model;
    const color = this.state.color;
    const mileage = this.state.mileage;
    const purchased_date = this.state.purchased_date;
    var data = {
      vin,
      model,
      color,
      mileage,
      purchased_date
    }
    axios.post(`/cars`, data)
      .then(res => {
        this.props.carAddRequest(res.data.data);
        this.props.history.goBack();
      })
      .catch(err => alert('VIN already exists !'));

  }
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Container style={{ width: '600px' }} >
        <Segment fluid>
          <Header as='h2'>
            <Icon name='arrow left' size='big' onClick={() => this.props.history.goBack()} />
            Car Form
          </Header>
        </Segment>
        <Segment stacked >
          <Form
            onSubmit={this.handleSubmit}
          >
            <label>Vin :</label>
            <Input
              name="vin"
              id='vin'
              type="text"
              value={this.state.vin}
              validators={['required']}
              errorMessages={['this field is required']}
              placeholder="Enter Car Vin"
              onChange={this.handleChange}

            />
            <label>Model :</label>
            <Input
              name="model"
              value={this.state.model}
              validators={['required']}
              errorMessages={['this field is required']}
              placeholder="Enter Car Model"
              onChange={this.handleChange}

            />
            <label>Color :</label>
            <Input
              name="color"
              value={this.state.color}
              validators={['required']}
              errorMessages={['this field is required']}
              placeholder="Enter Car Color"
              onChange={this.handleChange}

            />
            <label>Mileage :</label>
            <Input
              name="mileage"
              value={this.state.mileage}
              validators={['minNumber:0', 'maxNumber:1000000']}
              errorMessages={['this field is required and must be a number']}
              placeholder="Enter Car Mileage"
              onChange={this.handleChange}
            />
            <label>Purchase Date :</label>
            <DateInput
              name="purchased_date"
              placeholder="Purchased Date"
              value={this.state.purchased_date}
              iconPosition="left"
              onChange={this.handleChange}
              style={{ width: '430px' }}
            />
            <Button color='teal'>Submit</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const { car, status, error } = state
  return {
    car,
    status,
    error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    carAddRequest: (car) => dispatch(addCarRequest(car)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarForm));