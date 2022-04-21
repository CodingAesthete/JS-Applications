import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js"

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
<form @submit=${onSubmit} class="registerForm">
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
    </p>
</form>
</section>`;


export function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const email = form.get('email');
        const password = form.get('password');
        const repeatPass = form.get('repeatPassword');

        if ([email, password, repeatPass].map(Boolean).includes(false)) {
            throw new Error('All fields are required!');
        }

        if (password !== repeatPass) {
            throw new Error("Passwords don't match!");
        }
        await register( email, password);
        event.target.reset();
        context.page.redirect('/');
    }
}
