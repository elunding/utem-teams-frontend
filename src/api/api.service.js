import httpClient from './httpClient'

const PROJECTS_ENDPOINT = '/projects/';
// const TASKS_ENDPONT = `${PROJECTS_ENDPOINT}/${}`

const getProjects = () => httpClient.get(PROJECTS_ENDPOINT);
const getProjectDetails = (project_id) => httpClient.get(`${PROJECTS_ENDPOINT}${project_id}/`);
const createProject = (projectData) => httpClient.post(`${PROJECTS_ENDPOINT}new/`, projectData);
const getTasks = (project_id) => httpClient.get(`${PROJECTS_ENDPOINT}${project_id}/tasks/`);
const createTask = (taskData, project_id) => httpClient.post(`${PROJECTS_ENDPOINT}${project_id}/tasks/new/`, taskData);
const getMembersList = (project_id) => httpClient.get(`${PROJECTS_ENDPOINT}${project_id}/members/`);

export {
    getProjects,
    getProjectDetails,
    createProject,
    getTasks,
    createTask,
    getMembersList,
}
