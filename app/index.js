import { getBooks, deleteBook } from "./services/books_info_service.js";

async function displayBooks() {
    document.getElementById("container").innerHTML = ""

    const htmlComponent = await fetch("./components/BookCard.html")
    const html = await htmlComponent.text()
    let data = await getBooks()
    data.result.forEach((book, index) => {
        const htmlTemplate = html
        .replace("title_content", book.titulo)
        .replace("status_content", book.estado)
        .replace("index", index)

        document.getElementById("container").innerHTML += htmlTemplate
    });

    data.result.forEach((book, index) => {
        document.getElementById(`delete-btn-${index}`).addEventListener("click", async () => {
            await deleteBook(book.titulo)
            await displayBooks()
        })
    })
}


displayBooks()
