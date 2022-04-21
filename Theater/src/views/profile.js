import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyTheatres } from "../api/data.js"

const myProfileTemplate = (theatres, { email }) => html `
<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${email}</h2>
</div>
<div class="board">${theatres.length!=0 ? theatres.map(theatreTemplate) : html`<p>This user has no events yet!</p>`}</div>
        </section>`;

const theatreTemplate = (theatre) => html`
<div class="eventBoard">
<div class="event-info">
    <img src="${theatre.imageUrl}">
    <h2>Moulin Rouge! - The Musical</h2>
    <h6>${theatre.date}</h6>
    <a href="/details/${theatre._id}" class="details-button">Details</a>
</div>
</div>`;

export async function myProfilePage(context) {
    const myOwnTheatres = await getMyTheatres();
    const email = sessionStorage.getItem('email');
    context.render(myProfileTemplate(myOwnTheatres, { email}));
}