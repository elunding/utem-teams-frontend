import httpClient from './httpClient'

const PROJECTS_ENDPOINT = '/projects/';
// const TASKS_ENDPONT = `${PROJECTS_ENDPOINT}/${}`

const getProjects = () => httpClient.get(PROJECTS_ENDPOINT);
const getProjectDetails = (projectId) => httpClient.get(`${PROJECTS_ENDPOINT}${projectId}/`);
const createProject = (projectData) => httpClient.post(`${PROJECTS_ENDPOINT}new/`, projectData);
const getTasks = (projectId) => httpClient.get(`${PROJECTS_ENDPOINT}${projectId}/tasks/`);
const createTask = (taskData, projectId) => httpClient.post(`${PROJECTS_ENDPOINT}${projectId}/tasks/new/`, taskData);
const getMembersList = (projectId) => httpClient.get(`${PROJECTS_ENDPOINT}${projectId}/members/`);
const getUserList = () => httpClient.get(`/users/`);
const changeTaskStatus = (projectId, taskId, status) => httpClient.patch(`${PROJECTS_ENDPOINT}${projectId}/tasks/${taskId}/`, status);
const changeTaskPriority = (projectId, taskId, priority) => httpClient.patch(`${PROJECTS_ENDPOINT}${projectId}/tasks/${taskId}/`, priority);
const updateTask = (projectId, taskId, data) => httpClient.patch(`${PROJECTS_ENDPOINT}${projectId}/tasks/${taskId}/`, data);
const deleteTask = (projectId, taskId) => httpClient.delete(`${PROJECTS_ENDPOINT}${projectId}/tasks/${taskId}/`);
const updateProject = (projectId, data) => httpClient.patch(`${PROJECTS_ENDPOINT}${projectId}/`, data);
const deleteProject = (projectId) => httpClient.delete(`${PROJECTS_ENDPOINT}${projectId}/`);


export {
    getProjects,
    getProjectDetails,
    createProject,
    getTasks,
    createTask,
    getMembersList,
    getUserList,
    changeTaskStatus,
    changeTaskPriority,
    updateTask,
    deleteTask,
    updateProject,
    deleteProject
}
