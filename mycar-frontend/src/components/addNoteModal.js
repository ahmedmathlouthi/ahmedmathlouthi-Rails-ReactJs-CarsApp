import React, { Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  updateTaskSuccess,
  updateTaskRequest
} from '../actions/TasksListActions';

class AddNoteModal extends Component {

  constructor(props){
    super(props)
  }
  state = {
    requirement: '',
    open: this.props.show
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const carId = this.props.carId;
    const taskId = this.props.taskId;
    const requirement = this.state.requirement;
    var data = {
      requirement,
    }
    this.props.taskUpdateRequest(taskId, data);

    axios.post(`/cars/${carId}/tasks/${taskId}/notes`, data)
      .then(res => {
        this.props.taskUpdateSucceded(taskId, res.data.data);
      })
      .catch(err => console.log(err));
      this.setState({open: false})
  }

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <Modal open={this.state.open} size='small' onClose={this.props.close} >
        <Modal.Header>Add Note</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              required
              label='Requirement'
              name='requirement'
              value={this.state.requirement}
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={this.handleSubmit}
            type='submit'
            positive
            icon='checkmark'
            labelPosition='right'
            content='Confirm'
            disabled={this.state.requirement === ''}
          />
        </Modal.Actions>
      </Modal>
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
    taskUpdateRequest: (taskId, note) => dispatch(updateTaskRequest(taskId, note)),
    taskUpdateSucceded: (taskId, note) => dispatch(updateTaskSuccess(taskId, note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNoteModal);
