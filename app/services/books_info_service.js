import { doGet, doMethod } from "./api_service.js"

export async function getBooks(){
    return await doGet("/libros")
}


export async function deleteBook(title){
    return await doMethod(`/borrarLibro/${title}`, "DELETE", {})
}

export function changeStatus(){

}

export function searchBookBytitle(){

}

export function addBook(){

}

