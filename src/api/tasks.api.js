import httpClient from './httpClient'


const getTasks = (project_id) => httpClient.get(`/projects/${project_id}/tasks/`);
const getTaskDetails = (project_id, task_id) => httpClient.get(`/projects/${project_id}/tasks/${task_id}/`);
const createTask = (project_id, name, description) => httpClient.post(`/projects/${project_id}/tasks/new/`, { name, description });


export {
    getTasks,
    getTaskDetails,
    createTask,
}
