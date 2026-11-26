import { getBooks, deleteBook } from "./services/books_info_service.js";

async function displayBooks() {
    document.getElementById("container").innerHTML = ""
    let data = await getBooks()
    data.result.forEach((book, index) => {
        document.getElementById("container").innerHTML += `
        <div>
            <h2 id="book-title-${index}">${book.titulo}</h2>
            <p id="book-status-${index}">${book.estado}</p>
            <button id="book-btn-delete-${index}" class="delete-book-btn">Borrar libro</button>
            <button id="book-btn-status-${index}" class="edit-book-btn">Marcar como leído</button>
        </div>
        `
    });

    data.result.forEach((book, index) => {
        document.getElementById(`book-btn-delete-${index}`).addEventListener("click", async () => {
            await deleteBook(book.titulo)
            await displayBooks()
        })
    })
}


displayBooks()
