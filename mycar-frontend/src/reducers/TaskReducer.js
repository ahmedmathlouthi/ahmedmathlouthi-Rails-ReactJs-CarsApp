import {
  TASKS_LIST_LOADING,
  ADD_TASK_REQUEST,
  TASKS_LIST_ERROR,
  TASKS_LIST_SUCCESS,
  TASKS_LIST_REQUEST,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS
} from "../actions/TasksListActions";
import { LOADING, LOADED, ERROR } from "../componentStatus";

const initialState = {
  tasks: [],
  status: LOADING,
  error: ''
}

function deletetask(state, taskId) {
  const duplicatetasks = state.tasks.slice();
  const index = duplicatetasks.findIndex(task => task.id === taskId);
  if (index >= 0) {
    duplicatetasks.splice(index, 1);
    return { ...state, tasks: duplicatetasks, status: LOADED, error: '' };
  }
  return { ...state, status: LOADED, error: '' };
}


export default function TaskReducer(state = initialState, action) {
  const {
    task,
    tasks,
    note,
    taskStatus,
    taskId,
    error
  } = action.payload || {};
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { ...state, tasks: [...state.tasks, task], status: LOADED, error: '' };
    case TASKS_LIST_REQUEST:
      return { ...state, status: LOADING, error: '' }
    case TASKS_LIST_LOADING:
      return { ...state, status: LOADING, error: '' }
    case TASKS_LIST_SUCCESS:
      return { ...state, tasks: tasks, status: LOADED, error: '' }
    case TASKS_LIST_ERROR:
      return { ...state, tasks: [], status: ERROR, error };
    case UPDATE_TASK_REQUEST:
      return { ...state, status: LOADING, error: '' };
    case UPDATE_TASK_SUCCESS:
      state.tasks.map(task => {
        if (task.id === taskId) {
          if (note) {
            task.notes.push({ requirement: note.requirement });
          }
          else {
            task.status = taskStatus
          }
        }
        return task
      })
      return { ...state, tasks: [...state.tasks], status: LOADED, error: '' };
    case DELETE_TASK_REQUEST:
      return { ...state, status: LOADING, error };
    case DELETE_TASK_SUCCESS:
      return deletetask(state, taskId);
    default:
      return state;
  }
}