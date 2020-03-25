import React, { Component } from 'react';
import { Segment, Form, Dropdown, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { addTaskRequest } from '../actions/TasksListActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



const options = [
  { key: 'notDone', text: 'Not Done', value: 'Not Done' },
  { key: 'doing', text: 'Doing', value: 'Doing' },
  { key: 'done', text: 'Done', value: 'Done' }

]

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }
  state = {
    issue: '',
    status: 'Not Done'
  }
  goBack() {
    this.props.history.goBack();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const carId = this.props.location.state;
    const issue = this.state.issue;
    const status = this.state.status;
    var data = {
      issue,
      status,

    }
    axios.post(`/cars/${carId}/tasks`, data)
      .then(res => {
        this.props.taskAddRequest(res.data.data);
        this.goBack();
      })
      .catch(err => console.log(err));

  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }
  render() {
    return (
      <Container stacked style={{ width: '400px' }} centered>
        <Segment>
          <h1> Add Task </h1>
          <Form onSubmit={this.handleSubmit} width='equal' >
            <Form.Input
              label='Task'
              type='text'
              name='issue'
              value={this.state.issue}
              placeholder='Enter Issue'
              onChange={this.handleChange}
            />
            <Form.Field>
              <Dropdown
                name='status'
                compact
                selection
                options={options}
                defaultValue={this.state.status}
                onChange={this.handleChange}
                value={this.state.status}
              />
            </Form.Field>

            <Button color='teal' >Submit</Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  const { tasks, status, error } = state.tasksList
  return {
    tasks,
    status,
    error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    taskAddRequest: (task) => dispatch(addTaskRequest(task)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));