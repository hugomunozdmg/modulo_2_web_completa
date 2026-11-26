import e from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./db.js"

dotenv.config()

const app = e()

app.use(cors())
app.use(e.urlencoded({ extended: false }))
app.use(e.json())
app.listen(process.env.PORT)

let db = await connectDb()


app.get("/", (req, res) => {
    res.send({ result: "api running" })
})


app.get("/libros", async (req, res) => {
    const result = await db.collection("libros").find().toArray()
    res.send({ result: result })
})


app.get("/libros/:title", async (req, res) => {
    const result = await db.collection("libros").find({ titulo: { $regex: req.params.title, $options: "i" } }).toArray()
    res.send({ result: result })
})


app.post("/nuevoLibro/:title", async (req, res) => {
    const result = await db.collection("libros").insertOne({ titulo: req.params.title, estado: "no leído" })
    res.send({ result: result })
})


app.put("/editarLibro/:title", async (req, res) => {
    const bookTitle = req.params.title
    let registeredBook = await db.collection("libros").findOne({ titulo: bookTitle })
    let result
    if (registeredBook) {
        let newStatus = registeredBook.estado == "no leído" ? "leído" : "no leído"
        result = await db.collection("libros").updateOne({ titulo: req.params.title }, { $set: { estado: newStatus } })
    }

    res.send({ result: result })
})


app.delete("/borrarLibro/:title", async (req, res) => {
    console.log(req.params, req.body)
    const result = await db.collection("libros").deleteOne({ titulo: req.params.title })
    res.send({ result: result })
})



