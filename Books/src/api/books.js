import * as api from './api.js';

const endpoints={
    books: '/data/books?sortBy=_createdOn%20desc',
    create:'/data/books',
    byId: '/data/books/',
    update: '/data/books/',
    deleteById: '/data/games/',
    catalog: '/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc'
}

export async function getAll(){
    return api.get(endpoints.books);
}

export async function create(data){
    return api.post(endpoints.create, data)
}

export async function getById(id){
    return api.get(endpoints.byId + id)
}

export async function update(id,data){
    return api.put(endpoints.update+id,data);
}

export async function deleteById(id){
    return api.del(endpoints.deleteById + id);
}

export async function getMy(){
    const userId = sessionStorage.getItem('userId');
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}