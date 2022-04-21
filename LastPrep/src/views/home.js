import { html } from '../../node_modules/lit-html/lit-html.js';
import * as booksService from '../api/books.js'

const homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
            ${books.length>0 
                ? books.map(previewTemplate) 
                : html`<p class="no-books">No books in database!</p>`}

            </ul>
        </section>`;

const previewTemplate = (book) => html`
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function homePage(ctx) {
    const books = await booksService.getAll();
    ctx.render(homeTemplate(books));
}