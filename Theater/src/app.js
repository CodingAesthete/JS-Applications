import * as api from "../src/api/data.js"
import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { theatersPage } from "./views/homePage.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "../src/api/data.js"
import { myProfilePage } from "./views/profile.js";
//import { createPage } from "./views/create.js";
window.api = api;
const container = document.getElementById('content');

page('/', renderMiddleware, theatersPage)
page('/login', renderMiddleware, loginPage)
page('/register', renderMiddleware, registerPage)
//page('/create',renderMiddleware, createPage) 
page('/myProfile', renderMiddleware, myProfilePage);

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

document.getElementById('logoutBtn').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav();
});