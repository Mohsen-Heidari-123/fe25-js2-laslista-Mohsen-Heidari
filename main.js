import { getAll, postBook } from "./modules/firebase.js";
import { Book } from "./modules/Book.js";
import { filterFavorite, sortBooks } from "./modules/filtering.js";

const wrapper = document.querySelector("#books");
const form = document.querySelector("#Bookform");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");

let booksData = {}; 

// this function will clear the wrapper and re-render the books based on the current filter and sort selections
const renderBooks = () => {
    wrapper.innerHTML = "";
    const filteredBooks = filterFavorite(booksData, filterSelect.value);
    const sortedBooks = sortBooks(filteredBooks, sortSelect.value);

    for (const key in sortedBooks) {
        const b = sortedBooks[key];
        if (b.title && b.author) {
            const book = new Book(
                key,
                b.title,
                b.author,
                b.favorite || false,
                (id, newFav) => { booksData[id].favorite = newFav; } 
            );
            book.render(wrapper);
        }
    }
};


getAll()
    .then(data => {
        if (!data) {
            console.log("Ingen data hittades!");
            return;
        }

        booksData = data;
        renderBooks();
    })
    .catch(err => console.error("Fel vid hämtning:", err));

filterSelect.addEventListener("change", renderBooks);
sortSelect.addEventListener("change", renderBooks);


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = form.querySelector("#title").value.trim();
    const author = form.querySelector("#author").value.trim();
    if (!title || !author) return;

    const newBook = { title, author, favorite: false };
    const addedBook = await postBook(newBook);

    booksData[addedBook.id] = newBook;
    renderBooks();

    form.reset();
});
