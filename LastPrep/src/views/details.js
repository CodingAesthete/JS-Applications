import { html } from '../../node_modules/lit-html/lit-html.js';
import * as booksService  from '../api/books.js'
 
const detailsTemplate = (book, onDelete) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <div class="actions">
                ${book.isOwner 
                    ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>` 
                    : html `
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: 0</span>
                    </div>`}
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold,
                    bleak place in the long winter months. So when she spots a deer in the forest being pursued by a
                    wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and
                    killing something so precious comes at a price ...</p>
            </div>
        </section>`;
 
export async function detailsPage(ctx){
    const bookId= ctx.params.id;
    const book= await booksService.getById(bookId)
    if(ctx.user){
        book.isOwner=ctx.user._id==book._ownerId
    }
    ctx.render(detailsTemplate(book,onDelete));

    async function onDelete(){
        const choice= confirm('Are you sure you want to delete this game?');
        if(choice){
            await booksService.deleteById(bookId);
            ctx.page.redirect('/')
        }
    }
}