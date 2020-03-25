export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const TASKS_LIST_REQUEST = 'TASKS_LIST_REQUEST';
export const TASKS_LIST_LOADING = 'TASKS_LIST_LOADING';
export const TASKS_LIST_SUCCESS = 'TASKS_LIST_SUCCESS';
export const TASKS_LIST_ERROR = 'TASKS_LIST_ERROR';
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_LOADING = 'UPDATE_TASK_LOADING';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';
export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_LOADING = 'DELETE_TASK_LOADING';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_ERROR = 'DELETE_TASK_ERROR';

// Action creators

export function addTaskRequest(task){
    const payload = {
        task
    }
    return { type : ADD_TASK_REQUEST, payload }
}

export function tasksListRequest(carId) {
    const payload = {
        carId
    };
    return { type: TASKS_LIST_REQUEST, payload };
}

export function tasksListLoading() {
    const payload = {};
    return { type: TASKS_LIST_LOADING, payload };
}

export function tasksListSuccess(tasks) {
    const payload = {
        tasks
    };
    return { type: TASKS_LIST_SUCCESS, payload };
}

export function tasksListError(error) {
    const payload = {
        error
    };
    return { type: TASKS_LIST_ERROR, payload };
}

export function updateTaskRequest(taskId, note, taskStatus) {
    const payload = {
        taskId,
        note,
        taskStatus
    };
    return { type: UPDATE_TASK_REQUEST, payload };
}

export function updateTaskLoading() {
    const payload = {};
    return { type: UPDATE_TASK_LOADING, payload };
}

export function updateTaskSuccess(taskId, note, taskStatus) {
    const payload = {
        taskId,
        note,
        taskStatus
    };
    return { type: UPDATE_TASK_SUCCESS, payload };
}

export function updateTaskError(error) {
    const payload = {
        error
    };
    return { type: UPDATE_TASK_ERROR, payload };
}

export function deleteTaskRequest(taskId) {
    const payload = {
        taskId
    };
    return { type: DELETE_TASK_REQUEST, payload };
}


export function deleteTaskSuccess(taskId) {
    const payload = {
        taskId
    };
    return { type: DELETE_TASK_SUCCESS, payload };
}

export function deleteTaskError(error) {
    const payload = {
        error
    };
    return { type: DELETE_TASK_ERROR, payload };
}