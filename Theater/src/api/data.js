import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

// Implement application-specifics requests

export async function getAllTheatres() {
    return await api.get(host + '/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function createPage(data) {
    return await api.post(host + '/data/theaters', data);
}

export async function getTheatreById(id) {
    return await api.get(host + '/data/theaters/' + id);
}
 
export async function editTheatre(id, data) {
    return await api.put(host + '/data/theatres/' + id, data);
}
 
export async function deleteTheatre(id) {
    return await api.del(host + '/data/theatres/' + id);
}
 
export async function getMyTheatres() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}