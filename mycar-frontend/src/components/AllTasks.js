import React, { Component } from 'react';
import { Message, Segment, Dropdown, Loader, Button, Icon, Container, Table } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { LOADING, ERROR } from '../componentStatus';
import {
  tasksListSuccess,
  tasksListRequest,
  tasksListError,
  updateTaskRequest,
  updateTaskSuccess,
  deleteTaskSuccess,
  deleteTaskRequest
  } from '../actions/TasksListActions';
import AddNoteModal from './addNoteModal';



const options = [
  {key:'notDone', text: 'Not Done', value:'Not Done'},
  {key:'doing', text: 'Doing', value:'Doing'},
  {key:'done', text: 'Done', value:'Done'}

]

class AllTask extends Component {
	state = {
    carId: null,
    open: false,
    taskID: null,
    note: null
  }

  close = () => {this.setState({ open: !this.state.open })}

  componentDidMount() {
    this.setState({carId: this.props.location.state.carId})
    const carId = this.props.location.state.carId;
    this.props.requestTaskList(carId);
    axios.get(`/cars/${carId}/tasks`)
      .then(res => {
        const tasks = res.data.data;
        this.props.taskListSuccessed(tasks);
        this.setState({ tasks:tasks });
      })
      .catch(
        err => {
        console.log(err);
        this.props.taskListError(err)
        }
      )
      
  }


  goToAddTask(path){
    const { history } = this.props;
    if(history) this.props.history.push({
      pathname: path,
      state: this.state.carId
      });
  }

  updateTask(value, taskId){
    const note = this.state.note;
    this.props.taskUpdateRequest(taskId,note,value)
     const task = {
      status : value
     }
    const url = `/cars/${this.state.carId}/tasks/${taskId}` ; 
     axios.put(url,task)
      .then(res => {
        const newStatus = res.data.data.status;
        this.props.taskUpdateSucceded(taskId, note, newStatus);
      })
      .catch(
        err => {
        console.log(err);
        this.props.taskListError(err)
        }
      )

  }
 
  deleteTask(taskId){
    this.props.deleteTaskRequest(taskId);
    const url = `/cars/${this.state.carId}/tasks/${taskId}` ; 
     axios.delete(url)
      .then(res => {
        this.props.deleteTaskSuccess(taskId);
      })
      .catch(
        err => {
        console.log(err);
        }
      )
  }
	renderTasksList(tasks){
    if ( tasks.length == 0) {
      return (
          <Table.Row>
              <Table.Cell colSpan='4'>
                  <div className='no-challenge-msg'> There are no tasks in the list </div>
              </Table.Cell>
          </Table.Row>
      );
  }
  return (
      tasks.map((task) => {
          return (
              <Table.Row key={task.id}>
                  <Table.Cell >
                      {task.issue}
                  </Table.Cell>
                  <Table.Cell>
                      {task.created_at.slice(0, 10)}
                  </Table.Cell>
                  <Table.Cell negative={task.status==='Not Done'} positive={task.status==='Done'} warning={task.status==='Doing'}>
                    <Dropdown 
                      selection
                      options={options}
                      defaultValue={task.status}
                      onChange={(e, {value}) => this.updateTask(value,task.id)}
                      loading={this.props.status == true}
                    />
                  </Table.Cell>
                  <Table.Cell active={ task.notes && task.notes.length !== 0}>
                    <ul>
                      {
                        task.notes &&
                          task.notes.map((note)=>{
                          return  <li>{note.requirement}</li>
                      })}
                    </ul>
                  </Table.Cell>
                  <Table.Cell>
                      <Button icon  onClick={() => this.deleteTask(task.id)}>
                          <Icon name='trash' />
                      </Button>
                      <Button  value={task.id} icon onClick={ (e, data) => this.setState({open:true, taskID: data.value})}>
                          <Icon name='add' />
                          Add Note
                          
                      </Button>
                        { this.state.open &&
                              <AddNoteModal 
                                  carId = {this.state.carId}
                                  show={this.state.open}
                                  close={this.close} 
                                  taskId ={this.state.taskID}  
                              />
                        }
                  </Table.Cell>
              </Table.Row>
          );
      })
  );

  }
	render(){
    
      if(this.props.status === LOADING) {
        return <Loader active inline="centered" size="massive"/>

      } 
		return(
			<Container fluid>
          <Segment >
            <Icon name='arrow left' size='big' onClick = {() => this.props.history.goBack()} />
            <Button
                color='teal'
                icon
                labelPosition='right'
                default
                size='small'
                onClick={() => this.goToAddTask(`/${this.state.carId}/tasks/new`)}
                > 
                <Icon name='add' />
                  Add Task
            </Button>
          </Segment>
           <h2>Car Model : {this.props.location.state.carModel}</h2>
         <Table celled compact definition>
            {
              this.props.status === ERROR &&
              <Message size='big' color='red' >{this.props.error}</Message>
            }
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Task issue</Table.HeaderCell>
                    <Table.HeaderCell>Creation date</Table.HeaderCell>
                    <Table.HeaderCell>Task Status</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderTasksList(this.props.tasks)}
            </Table.Body>
        </Table>
      </Container>
		)

	}
}
const mapStateToProps = (state) => {
  const { tasks, status, error} = state.tasksList
  return {
      tasks,
      status,
      error
  }
}
const mapDispatchToProps = dispatch => {
  return {
      taskListSuccessed : (tasks) => dispatch(tasksListSuccess(tasks)),
      requestTaskList: (carId) => dispatch(tasksListRequest(carId)),
      taskListError: (error) => dispatch(tasksListError(error)),
      taskUpdateRequest : (taskId) => dispatch(updateTaskRequest(taskId, null)),
      taskUpdateSucceded: (taskId, note, taskStatus) => dispatch(updateTaskSuccess(taskId, note, taskStatus)),
      deleteTaskRequest: (taskId)=> dispatch(deleteTaskRequest(taskId)),
      deleteTaskSuccess : (taskId) => dispatch(deleteTaskSuccess(taskId))
  };
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllTask));
