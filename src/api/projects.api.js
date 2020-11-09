import httpClient from './httpClient'

const PROJECTS_ENDPOINT = '/projects/';

const getProjects = () => httpClient.get(PROJECTS_ENDPOINT);
const getProjectDetails = (project_id) => httpClient.get(`${PROJECTS_ENDPOINT}${project_id}/`);
const createProject = (projectData) => httpClient.post(`${PROJECTS_ENDPOINT}new/`, projectData);


export {
    getProjects,
    getProjectDetails,
    createProject,
}
