import * as api from "../src/api/data.js"
import page from './node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html';


window.api = api;
const container = document.querySelector('main');
 
//applications Start
setUserNav();
page.start();
 
function renderMiddleware(context, next) {
    context.setUserNav = setUserNav;
    context.render = (context) => render(context, container);
    next();
}
 
export function setUserNav() {
    const email = sessionStorage.getItem('email');
    if (email) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'block';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}